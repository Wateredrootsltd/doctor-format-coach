const { app, BrowserWindow, globalShortcut, Menu, Tray, nativeImage } = require('electron');
const path = require('path');

let win;
let tray;

function createWindow () {
  win = new BrowserWindow({
    width: 420,
    height: 740,
    minWidth: 380,
    minHeight: 600,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#0f0f0f',
    alwaysOnTop: false,
    webPreferences: { contextIsolation: true }
  });
  win.loadFile('index.html');
}

function createTray() {
  const iconPath = path.join(__dirname, 'build', 'trayTemplate.png');
  const image = nativeImage.createFromPath(iconPath);
  image.setTemplateImage(true);
  tray = new Tray(image);
  tray.setToolTip('Doctor Format Coach');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show/Hide', click: () => { if (win.isVisible()) win.hide(); else win.show(); } },
    { label: 'Always on Top', type: 'checkbox', checked: win.isAlwaysOnTop(), click: (menuItem) => win.setAlwaysOnTop(menuItem.checked) },
    { type: 'separator' },
    { role: 'quit' }
  ]);
  tray.setContextMenu(contextMenu);
  tray.on('click', () => { if (win.isVisible()) win.hide(); else win.show(); });
}

function setMenu() {
  const template = [
    {
      label: 'Doctor Format',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { label: 'Show/Hide (Cmd+Shift+D)', accelerator: 'CmdOrCtrl+Shift+D', click: () => { if (win.isVisible()) win.hide(); else win.show(); } },
        { label: 'Toggle Always On Top (Cmd+Shift+T)', accelerator: 'CmdOrCtrl+Shift+T', click: () => win.setAlwaysOnTop(!win.isAlwaysOnTop()) },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();
  createTray();
  setMenu();
  globalShortcut.register('CmdOrCtrl+Shift+D', () => { if (win.isVisible()) win.hide(); else win.show(); });
  globalShortcut.register('CmdOrCtrl+Shift+T', () => { win.setAlwaysOnTop(!win.isAlwaysOnTop()); });
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('will-quit', () => { globalShortcut.unregisterAll(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
