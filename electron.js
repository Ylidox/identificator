const {BrowserWindow, app} = require('electron');
const path = require('path');

function createWindow(){
  const win = new BrowserWindow({
    width: 1200,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'js', 'preload.js'),
    },
  });

  win.loadFile('index.html');
}

app.on('ready', () => {
  createWindow();
})

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

// require('electron-reloader')(module)