const {BrowserWindow, app} = require('electron');
const path = require('path');
const autoload = require('./js/autoload');

const {sn, getSystemInformation, defaultComputer} = require('./js/getinfo');

let computer = defaultComputer();

const initComputer = () => {
  sn(async (err, data) => {
    computer.serialNumber = data;
    const out = await getSystemInformation();
    computer = {...out, serialNumber: computer.serialNumber}
    console.log(computer);
  });
}

initComputer();

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
  win.removeMenu();
}

// require('electron-reload')(__dirname, {
//   electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
// })

const period = 10000;
const tick = async () => {
  if(!computer.uniqueId) return;
  try{
    let time = new Date();
    let res = await fetch(`http://localhost:3000?id=${computer.uniqueId}&time=${time}`);
  }catch(e){
    console.error(e)
  }
}

// tick();
let timer;

app.on('ready', async () => {
  const argv = process.argv;
  console.log('argv ', argv);

  let isEnabledAutoload = await autoload.isEnabledAutoload();
  if(!isEnabledAutoload) autoload.enableAutoload();

  if(!argv.includes('hidden'))
    createWindow();
  else timer = setInterval(tick, period);
})

app.on('window-all-closed', (event) => {
  event.preventDefault();
  // app.quit();
  // clearInterval(timer);
});

// /usr/lib/identificator/identificator