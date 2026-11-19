import os, subprocess, sys, time, json
import uno
from com.sun.star.beans import PropertyValue

SOFFICE = r"C:\Program Files\LibreOffice\program\soffice.exe"
PROFILE = r"C:\Users\91829\AppData\Local\Temp\opencode\lo_profile2"
PORT = 2003

def prop(n, v):
    p = PropertyValue(); p.Name = n; p.Value = v; return p

src = os.path.abspath(sys.argv[1])
print("starting", flush=True)
proc = subprocess.Popen([SOFFICE, "--headless", "--norestore", "--invisible",
    f"-env:UserInstallation=file:///{PROFILE.replace(os.sep,'/')}",
    f"--accept=socket,host=127.0.0.1,port={PORT};urp;"])
try:
    local = uno.getComponentContext()
    resolver = local.ServiceManager.createInstanceWithContext("com.sun.star.bridge.UnoUrlResolver", local)
    ctx = None
    for i in range(40):
        try:
            ctx = resolver.resolve(f"uno:socket,host=127.0.0.1,port={PORT};urp;StarOffice.ComponentContext")
            print("connected", flush=True); break
        except Exception:
            time.sleep(1)
    desktop = ctx.ServiceManager.createInstanceWithContext("com.sun.star.frame.Desktop", ctx)
    print("loading", flush=True)
    t = time.time()
    doc = desktop.loadComponentFromURL(uno.systemPathToFileUrl(src), "_blank", 0,
        (prop("Hidden", True), prop("UpdateDocMode", 0)))
    print("loaded in", time.time()-t, flush=True)
    doc.close(True)
finally:
    proc.terminate(); proc.wait(timeout=20)
print("done", flush=True)
