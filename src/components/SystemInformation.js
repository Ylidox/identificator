import React, {useEffect, useState} from 'react';

export const SystemInformation = () => {
  let [serialNumber, setSerialNumber] = useState('');
  let [system, setSystem] = useState({
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
    },
  });
  useEffect(() => {
    async function getComputerData(){
      let newSystem = await electron.getSystemInformation();
      setSystem({...system, ...newSystem});
    }
    getComputerData();


    electron.sn((e, d) => {
      setSerialNumber(d)
    })
    return;
  }, []);

  return (
    <>
      <h1>Информация о компьютере</h1>
      <ul>
        <li>Модель компьютера: {system.system.model}</li>
        <li>Модель процессора: {system.modelProc}</li>
        <li>Производитель: {system.system.manufacturer}</li>
        <li>Архитектура: {system.arch}</li>
        <li>Операционная система: {system.platform}</li>
        {system.platform == 'linux' && 
          <li>Дистрибутив: {system.distro}</li>
        }
        <li>Уникальный id: {system.uniqueId}</li>
        <li>Серийный номер: {serialNumber}</li>
        <li>UUID: {system.uuid}</li>
        <li>SKU: {system.sku}</li>        
      </ul>
    </>
  );
}
 