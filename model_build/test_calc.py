import os, subprocess, sys, time, uuid
import uno
from com.sun.star.beans import PropertyValue

SOFFICE = r"C:\Program Files\LibreOffice\program\soffice.exe"
PROFILE = os.path.join(os.environ.get("TEMP", r"C:\Users\91829\AppData\Local\Temp"), "lo_" + uuid.uuid4().hex[:8])
PORT = 2600 + (os.getpid() % 300)

def prop(n, v):
    p = PropertyValue(); p.Name = n; p.Value = v; return p

src = os.path.abspath(sys.argv[1])
print("start", flush=True)
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
    t=time.time(); print("loading", flush=True)
    doc = desktop.loadComponentFromURL(uno.systemPathToFileUrl(src), "_blank", 0, (prop("Hidden", True), prop("UpdateDocMode", 0)))
    print("loaded", round(time.time()-t,1), flush=True)
    t=time.time(); print("calculating", flush=True)
    doc.calculateAll()
    print("calculated", round(time.time()-t,1), flush=True)
    doc.close(True)
finally:
    proc.terminate(); proc.wait(timeout=20)
print("done", flush=True)
