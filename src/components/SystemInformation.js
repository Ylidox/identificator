import React, {useEffect, useState} from 'react';


export const SystemInformation = () => {
  let [serialNumber, setSerialNumber] = useState('');
  let [system, setSystem] = useState(electron.defaultComputer());
  useEffect(() => {
    async function getComputerData(){
      let newSystem = await electron.getSystemInformation();
      setSystem(newSystem);
    }
    getComputerData();


    electron.sn((e, d) => {
      setSerialNumber(d)
    })
  }, []);

  return (
    <>
      <h1>Информация о компьютере</h1>
      <ul>
        <li>Модель компьютера: {system.model}</li>
        <li>Модель процессора: {system.modelProc}</li>
        <li>Производитель: {system.manufacturer}</li>
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
 