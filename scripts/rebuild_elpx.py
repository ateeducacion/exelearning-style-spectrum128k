#!/usr/bin/env python3
"""
Repackage the extracted ELPX workspace at the repo root into
sample/el-ciclo-del-agua-spectrum128k.elpx.

Run this after editing theme/style.css (or anything else inside the
unzipped workspace) so the sample that static.exelearning.dev downloads
stays in sync with the repo.

Usage:
    python3 scripts/rebuild_elpx.py
"""

import os
import sys
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
OUT = os.path.join(ROOT, "sample", "el-ciclo-del-agua-spectrum128k.elpx")

# Everything the eXeLearning viewer needs to render the unit.
INCLUDE = [
    "content.xml",
    "content.dtd",
    "index.html",
    "search_index.js",
    "content",
    "html",
    "idevices",
    "libs",
    "theme",
]


def main() -> int:
    if os.path.exists(OUT):
        os.remove(OUT)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    count = 0
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
        for item in INCLUDE:
            abs_item = os.path.join(ROOT, item)
            if not os.path.exists(abs_item):
                print(f"skip (missing): {item}")
                continue
            if os.path.isfile(abs_item):
                z.write(abs_item, item)
                count += 1
                continue
            for dirpath, _, filenames in os.walk(abs_item):
                for fn in filenames:
                    abs_path = os.path.join(dirpath, fn)
                    rel_path = os.path.relpath(abs_path, ROOT)
                    z.write(abs_path, rel_path)
                    count += 1
    size = os.path.getsize(OUT)
    print(f"Wrote {OUT}")
    print(f"  {count} entries, {size/1024:.1f} KiB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
