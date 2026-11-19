"""Create a LibreOffice-friendly copy: data-table formulas become cached constants."""
import re, shutil, sys, zipfile

src, dst = sys.argv[1], sys.argv[2]
tmp = dst + ".tmp"
removed = 0
with zipfile.ZipFile(src, "r") as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename.startswith("xl/worksheets/sheet") and item.filename.endswith(".xml"):
            text = data.decode("utf-8")
            text, n = re.subn(r'<f t="dataTable"[^>]*/>', "", text)
            removed += n
            data = text.encode("utf-8")
        zout.writestr(item, data)
shutil.move(tmp, dst)
print("removed dataTable formulas:", removed)
