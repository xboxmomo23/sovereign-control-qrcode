import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FFMPEG = Path(
    r"C:\Users\DIDIR\AppData\Local\Microsoft\WinGet\Packages"
    r"\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe"
    r"\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe"
)
FFPROBE = FFMPEG.with_name("ffprobe.exe")
marks = json.loads((ROOT / "marks.json").read_text(encoding="utf-8"))
lines = json.loads((ROOT / "voice_lines.json").read_text(encoding="utf-8"))["lines"]
durations = json.loads((ROOT / "durations.json").read_text(encoding="utf-8"))
lead = float(marks["lead"])
by_id = {item["id"]: item["t"] for item in marks["marks"]}


def srt_time(seconds: float) -> str:
    seconds = max(0, seconds)
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int(round((seconds - int(seconds)) * 1000))
    if millis == 1000:
        secs += 1
        millis = 0
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"


cues = []
for index, line in enumerate(lines, start=1):
    start = lead + by_id[line["id"]]
    end = start + durations[line["id"]]
    text = line["caption"].replace("\\N", "\n")
    cues.append(f"{index}\n{srt_time(start)} --> {srt_time(end)}\n{text}\n")

(ROOT / "subs.srt").write_text("\n".join(cues), encoding="utf-8")

filters = []
labels = []
filters.append(f"aevalsrc=0:d={lead:.3f}:s=48000:c=stereo[lead]")
labels.append("[lead]")
for index, line in enumerate(lines):
    scene_id = line["id"]
    filters.append(
        f"[{index + 1}:a]aformat=sample_rates=48000:channel_layouts=stereo[v{index}]"
    )
    labels.append(f"[v{index}]")
    if index < len(lines) - 1:
        gap = (by_id[lines[index + 1]["id"]] - by_id[scene_id]) - durations[scene_id]
        gap = max(0.05, gap)
        filters.append(f"aevalsrc=0:d={gap:.3f}:s=48000:c=stereo[g{index}]")
        labels.append(f"[g{index}]")
    else:
        filters.append("aevalsrc=0:d=0.45:s=48000:c=stereo[tail]")
        labels.append("[tail]")

filters.append("".join(labels) + f"concat=n={len(labels)}:v=0:a=1[a]")
style = (
    "FontName=Segoe UI,FontSize=20,PrimaryColour=&H00FFFFFF,"
    "OutlineColour=&H00101820,BackColour=&H00101820,BorderStyle=3,"
    "Outline=5,Shadow=0,Alignment=2,MarginV=30"
)
filters.append(
    "[0:v]subtitles=subs.srt:fontsdir=C\\\\:/Windows/Fonts:"
    f"force_style='{style}'[v]"
)
output = ROOT / "sovereign-control-demo.mp4"
command = [
    str(FFMPEG),
    "-y",
    "-i",
    str(ROOT / "raw" / "demo.webm"),
    *[arg for line in lines for arg in ("-i", str(ROOT / "audio" / f"{line['id']}.mp3"))],
    "-filter_complex",
    ";".join(filters),
    "-map",
    "[v]",
    "-map",
    "[a]",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "20",
    "-c:a",
    "aac",
    "-b:a",
    "160k",
    "-movflags",
    "+faststart",
    "-shortest",
    str(output),
]
print(" ".join(command[:6]))
subprocess.run(command, cwd=ROOT, check=True)
probe = subprocess.run(
    [
        str(FFPROBE),
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "csv=p=0",
        str(output),
    ],
    check=True,
    capture_output=True,
    text=True,
)
print(f"duration={probe.stdout.strip()}")
