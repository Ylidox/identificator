const {BrowserWindow, app} = require('electron');
const path = require('path');

function createWindow(){
  const win = new BrowserWindow({
    width: 1200,
    height: 500,
    webPreferences: {
      frame: 0,
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'js', 'preload.js'),
    },
  });

  win.loadFile('index.html');
  win.webContents.openDevTools()
  
}

app.on('ready', () => {
  createWindow();
})

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

app.on('window-all-closed', (event) => {
  event.preventDefault();
  app.quit();
});