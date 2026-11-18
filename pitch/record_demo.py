import asyncio
import json
import time
from pathlib import Path

from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent
RAW = ROOT / "raw"
FRAMES = ROOT / "frames"
BASE = "http://localhost:3000"

CURSOR = """
(() => {
  const style = document.createElement("style");
  style.textContent = "nextjs-portal{display:none!important}";
  document.documentElement.appendChild(style);
  const cursor = document.createElement("div");
  cursor.id = "demo-cursor";
  cursor.style.cssText = [
    "position:fixed",
    "z-index:2147483647",
    "width:22px",
    "height:22px",
    "margin:-4px 0 0 -4px",
    "border:2px solid #10243a",
    "border-radius:999px",
    "background:rgba(20,140,136,.5)",
    "box-shadow:0 1px 4px rgba(12,27,42,.28)",
    "pointer-events:none",
    "left:72px",
    "top:88px"
  ].join(";");
  document.documentElement.appendChild(cursor);
  localStorage.removeItem("sovereign-control-demo-v1");
  window.addEventListener("mousemove", (event) => {
    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";
  }, true);
})();
"""


async def move_to(page, locator):
    await locator.scroll_into_view_if_needed()
    box = await locator.bounding_box()
    if not box:
        return
    await page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2, steps=18)


async def main():
    durations = json.loads((ROOT / "durations.json").read_text(encoding="utf-8"))
    RAW.mkdir(exist_ok=True)
    FRAMES.mkdir(exist_ok=True)
    for old in RAW.glob("*.webm"):
        old.unlink()

    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1280, "height": 720},
            record_video_dir=str(RAW),
            record_video_size={"width": 1280, "height": 720},
            locale="fr-FR",
            device_scale_factor=1,
        )
        page = await context.new_page()
        await page.add_init_script(CURSOR)
        created = time.perf_counter()
        await page.goto(BASE, wait_until="networkidle")
        await page.get_by_role("heading", name="TechIndustrie", exact=True).wait_for()
        await page.wait_for_timeout(250)
        origin = time.perf_counter()
        marks = []

        def mark(name: str) -> float:
            stamp = time.perf_counter() - origin
            marks.append({"id": name, "t": round(stamp, 3)})
            return stamp

        async def hold(started: float, duration: float) -> None:
            remain = duration - (time.perf_counter() - origin - started)
            if remain > 0:
                await page.wait_for_timeout(int(remain * 1000))

        started = mark("s1")
        await page.screenshot(path=str(FRAMES / "s1.png"))
        await page.mouse.move(760, 180, steps=22)
        await hold(started, durations["s1"])

        started = mark("s2")
        nordstack = page.get_by_role("row", name="NordStack")
        await move_to(page, nordstack)
        await page.screenshot(path=str(FRAMES / "s2.png"))
        await page.wait_for_timeout(int(max(0, durations["s2"] - 1.3) * 1000))
        button = page.get_by_role("button", name="Lancer une analyse").first
        await move_to(page, button)
        await button.click()
        await page.wait_for_url("**/nouvelle")
        await hold(started, durations["s2"])

        await page.get_by_text("n’est pas disponible").wait_for()
        started = mark("s3")
        import_zone = page.get_by_text("Importer un PDF")
        await move_to(page, import_zone)
        await page.screenshot(path=str(FRAMES / "s3.png"))
        await hold(started, durations["s3"])

        launch = page.get_by_role("button", name="Lancer l’analyse de démonstration")
        await move_to(page, launch)
        await page.wait_for_timeout(160)
        started = mark("s4")
        await launch.click()
        await page.wait_for_url("**/analyse")
        await page.get_by_role("heading", name="En bref").wait_for()
        counts = page.get_by_text("Garanties identifiées").first
        await counts.scroll_into_view_if_needed()
        await page.screenshot(path=str(FRAMES / "s4.png"))
        await hold(started, durations["s4"])

        clause = page.get_by_role("button", name="Accès hors Union")
        await move_to(page, clause)
        await clause.click()
        await page.get_by_text("Article 6.4").first.wait_for()
        started = mark("s5")
        await page.screenshot(path=str(FRAMES / "s5.png"))
        await page.wait_for_timeout(int(max(0, durations["s5"] - 2.0) * 1000))
        report = page.get_by_role("link", name="Consulter le rapport").first
        await move_to(page, report)
        await report.click()
        await page.wait_for_url("**/rapport/**")
        await hold(started, durations["s5"])

        await page.get_by_role("heading", name="Synthèse exécutive").wait_for()
        started = mark("s6")
        await page.screenshot(path=str(FRAMES / "s6.png"))
        await hold(started, durations["s6"])
        await page.wait_for_timeout(300)

        lead = round(origin - created, 3)
        (ROOT / "marks.json").write_text(
            json.dumps({"lead": lead, "marks": marks}, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        video = page.video
        await context.close()
        await browser.close()
        saved = await video.path()
        target = RAW / "demo.webm"
        Path(saved).replace(target)
        print(json.dumps({"lead": lead, "marks": marks, "video": str(target)}, ensure_ascii=False))


if __name__ == "__main__":
    asyncio.run(main())
