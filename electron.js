const { BrowserWindow, app, session } = require('electron');
const path =  require('path');
const os = require('os');

// const REACT_PERFORMANCE_DEVTOOLS = {
//   id: "nmmhkkegccagdldgiimedpiccmgmieda",
//   electron: "^4.0.5"
// };

// const installExtensions = async () => {
//   const installer = require("electron-devtools-installer");
//   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//   const extensions = [
//     "REACT_DEVELOPER_TOOLS",
//     "REDUX_DEVTOOLS",
//     "REACT_PERF",
//     REACT_PERFORMANCE_DEVTOOLS
//   ];

//   return Promise.all(
//     extensions.map(name =>
//       installer.default(installer[name] || name, forceDownload)
//     )
//   ).catch(console.log);
// };

function createWindow(){
  const win = new BrowserWindow({
    width: 1200,
    height: 500,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile('index.html');

  // const {default: installExtension, REACT_DEVELOPERS_TOOLS} = require('electron-devtools-installer');
  // installExtension(REACT_DEVELOPERS_TOOLS)
  //   .then(name => console.log(`added extension: ${name}`))
  //   .catch(err => console.error(err))
  // installExtensions().then(name => console.log(`added extension: ${name}`))
  // .catch(err => console.error(err))
}

// const reactDevToolsPath = path.join(
//   os.homedir(),
//   './google-chrome/Default/Extensions/nmmhkkegccagdldgiimedpiccmgmieda/1.0.0.6_0'
// )

app.on('ready', async () => {
  createWindow();
  // await session.defaultSession.loadExtension(reactDevToolsPath)
})

require('electron-reload')(__dirname, {
  electron: join(__dirname, 'node_modules', '.bin', 'electron')
})

// require('electron-reloader')(module)