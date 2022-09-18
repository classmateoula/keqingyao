const { app, BrowserWindow, ipcMain, screen } = require("electron");
const { join } = require("path");

app.on("ready", () => {
  const window = new BrowserWindow({
    show: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    x: 0,
    y: 0,
    width: screen.getPrimaryDisplay().workAreaSize.width,
    height: screen.getPrimaryDisplay().workAreaSize.height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  window.loadFile(join(__dirname, "./index.html"));
  window.on("ready-to-show", () => {
    // window.maximize();
    window.show();
  });

  // 获取可执行文件位置
  const ex = process.execPath;

  // 定义事件，渲染进程中直接使用

  // 开启 开机自启动
  ipcMain.on("openAutoStart", () => {
    app.setLoginItemSettings({
      openAtLogin: true,
      path: ex,
      args: [],
    });
  });

  let isFull = true;

  ipcMain.handle("setWindowSize", () => {
    isFull = !isFull;
    if (isFull) {
      window.setBounds({
        width: screen.getPrimaryDisplay().workAreaSize.width,
        height: screen.getPrimaryDisplay().workAreaSize.height,
        x: 0,
        y: 0,
      });
    } else {
      window.setSize(200, 300);
      window.center();
    }
    return isFull;
  });
});
