const {contextBridge, ipcRenderer} = require('electron');
const os = require('os');
const si = require('systeminformation');
const machineId = require('node-machine-id');
const sn = require('serial-number');
sn.preferUUID = true;

contextBridge.exposeInMainWorld('electron', {
  log(message){
    console.log(message)
  },
  sn,
  getSystemInformation: async () => {
    let out = {system:{}};
    let system = await si.system();
    let osInfo = await si.osInfo();
    out.platform = osInfo.platform;
    out.distro = osInfo.distro;
    out.arch = osInfo.arch;
    out.modelProc = os.cpus()[0].model;
    out.uniqueId = machineId.machineIdSync();
    // out.serialNumber = '';
    // sn((err, data) => out.serialNumber = data);
    out.system.manufacturer = system.manufacturer;
    out.system.model = system.model;
    out.system.serial = system.serial;
    out.system.uuid = system.uuid;
    out.system.sku = system.sku;

    return out;
  },
  getSerialNumber(cb){
    sn(cb);
  }
});