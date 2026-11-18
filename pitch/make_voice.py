import asyncio
import json
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent
spec = json.loads((ROOT / "voice_lines.json").read_text(encoding="utf-8"))
audio_dir = ROOT / "audio"
audio_dir.mkdir(exist_ok=True)


async def main() -> None:
    for line in spec["lines"]:
        target = audio_dir / f"{line['id']}.mp3"
        communicate = edge_tts.Communicate(line["say"], spec["voice"], rate=spec["rate"])
        await communicate.save(str(target))
        print(target.name)


if __name__ == "__main__":
    asyncio.run(main())
