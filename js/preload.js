const {contextBridge, ipcRenderer} = require('electron');
const os = require('os');
const si = require('systeminformation');
const machineId = require('node-machine-id');

contextBridge.exposeInMainWorld('electron', {
  log(message){
    console.log(message)
  },
  os,
  si,
  machineId,
  getHostName(){
    const os = require('os');
    return this.os.hostname();
  },
  getSysteminformation: async () => {
    let data = await si.system();
    return data;
  },
  getSerialNumber(){
    const { execSync } = require('child_process');

    // Получение серийного номера
    const serialNumber = execSync('sudo dmidecode -s system-serial-number').toString().trim();
    console.log('Серийный номер:', serialNumber);

    // Получение UUID (универсального уникального идентификатора)
    const uuid = execSync('sudo dmidecode -s system-uuid').toString().trim();
    console.log('UUID:', uuid);
  }
});