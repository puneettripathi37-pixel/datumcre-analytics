"""Recalculate a workbook with LibreOffice UNO and save a copy.

Usage:
    python recalc.py <input.xlsx> <output.xlsx>

Starts a headless LibreOffice listener, loads the workbook, forces a full
recalculation, saves it and exports a JSON error report next to the output.
"""
from __future__ import annotations

import json
import os
import uuid
import subprocess
import sys
import time

import uno
from com.sun.star.beans import PropertyValue

SOFFICE = r"C:\Program Files\LibreOffice\program\soffice.exe"
PROFILE = os.path.join(os.environ.get("TEMP", r"C:\Users\91829\AppData\Local\Temp"), "lo_" + uuid.uuid4().hex[:8])
PIPE = "oc_" + uuid.uuid4().hex


def prop(name, value):
    p = PropertyValue()
    p.Name = name
    p.Value = value
    return p


def connect():
    local = uno.getComponentContext()
    resolver = local.ServiceManager.createInstanceWithContext(
        "com.sun.star.bridge.UnoUrlResolver", local)
    for _ in range(60):
        try:
            return resolver.resolve(
                f"uno:pipe,name={PIPE};urp;StarOffice.ComponentContext")
        except Exception:
            time.sleep(1)
    raise RuntimeError("cannot connect to LibreOffice")


def main():
    src = os.path.abspath(sys.argv[1])
    dst = os.path.abspath(sys.argv[2])
    os.makedirs(PROFILE, exist_ok=True)
    proc = subprocess.Popen([
        SOFFICE, "--headless", "--norestore", "--invisible", "--nologo",
        f"-env:UserInstallation=file:///{PROFILE.replace(os.sep, '/')}",
        f"--accept=pipe,name={PIPE};urp;",
    ])
    try:
        ctx = connect()
        desktop = ctx.ServiceManager.createInstanceWithContext(
            "com.sun.star.frame.Desktop", ctx)
        doc = desktop.loadComponentFromURL(
            uno.systemPathToFileUrl(src), "_blank", 0,
            (prop("Hidden", True), prop("UpdateDocMode", 3)))
        doc.calculateAll()
        time.sleep(1)
        doc.calculateAll()
        doc.storeToURL(uno.systemPathToFileUrl(dst),
                       (prop("FilterName", "Calc MS Excel 2007 XML"),))
        # Collect error cells
        errors = []
        sheets = doc.Sheets
        for i in range(sheets.Count):
            sh = sheets.getByIndex(i)
            cur = sh.createCursor()
            cur.gotoEndOfUsedArea(False)
            addr = cur.RangeAddress
            for r in range(addr.StartRow, addr.EndRow + 1):
                for c in range(addr.StartColumn, addr.EndColumn + 1):
                    cell = sh.getCellByPosition(c, r)
                    if cell.getError() != 0:
                        errors.append({
                            "sheet": sh.Name,
                            "cell": cell.AbsoluteName,
                            "error": int(cell.getError()),
                        })
        with open(dst + ".errors.json", "w", encoding="utf-8") as fh:
            json.dump(errors, fh, indent=1)
        print(f"recalculated {src} -> {dst}; error cells: {len(errors)}")
        for e in errors[:40]:
            print(e)
        doc.close(True)
    finally:
        proc.terminate()
        proc.wait(timeout=30)


if __name__ == "__main__":
    main()
