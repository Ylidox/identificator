const {contextBridge, ipcRenderer} = require('electron');
const getInfo = require('./getinfo.js');


contextBridge.exposeInMainWorld('electron', {
  log(message){
    console.log(message)
  },
  sn: getInfo.sn,
  getSystemInformation: getInfo.getSystemInformation,
});