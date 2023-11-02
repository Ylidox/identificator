// import os from 'os';
// import si from 'systeminformation';
// import sn from 'serial-number';
// import { machineId } from 'node-machine-id';
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
    system: {
      serial: '', 
      model: '',  
      manufacturer: '',
      uuid: '',   
      sku: '',
    }
  }
};

const getSystemInformation = async () => {
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
}

module.exports = {
  getSystemInformation,
  sn,
  os,
  defaultComputer,
}