#!/usr/bin/env python3

from __future__ import annotations

import json
from pathlib import Path
from typing import List


ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = ROOT / "public"
ICON_DIR = PUBLIC_DIR / "i"


icons = json.dumps(
    sorted((p.name for p in ICON_DIR.iterdir() if p.is_file()), key=str.lower)
)

(PUBLIC_DIR / "icons.js").write_text(f"const icons = {icons};\n", encoding="utf-8")
