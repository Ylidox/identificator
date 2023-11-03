const os = require('os');
const si = require('systeminformation');
const machineId = require('node-machine-id');
const sn = require('serial-number');
sn.preferUUID = true;

const defaultComputer = () => {
  return {
    serialNumber: '',
    modelProc: '', 
    arch: '',     
    platform: '', 
    distro: '',   
    uniqueId: '', 
    model: '',  
    manufacturer: '',
    uuid: '',   
    sku: '',
  }
};

const getSystemInformation = async () => {
  let out = {};
  let system = await si.system();
  let osInfo = await si.osInfo();
  let uuid = await si.uuid();
  out.platform = osInfo.platform;
  out.distro = osInfo.distro;
  out.arch = osInfo.arch;
  out.modelProc = os.cpus()[0].model;
  out.uniqueId = machineId.machineIdSync();
  // out.serialNumber = '';
  // sn((err, data) => out.serialNumber = data);
  out.manufacturer = system.manufacturer;
  out.model = system.model;
  // out.system.serial = system.serial;
  out.uuid = uuid.os;
  out.sku = system.sku;

  return out;
}

module.exports = {
  getSystemInformation,
  sn,
  si,
  os,
  defaultComputer,
}