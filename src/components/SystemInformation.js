import React, {useEffect, useState} from 'react';
import { defaultComputer } from '../../js/getinfo';


export const SystemInformation = () => {
  let [serialNumber, setSerialNumber] = useState('');
  let [system, setSystem] = useState(defaultComputer());
  useEffect(() => {
    async function getComputerData(){
      let newSystem = await electron.getSystemInformation();
      setSystem({...system, ...newSystem});
    }
    getComputerData();


    electron.sn((e, d) => {
      setSerialNumber(d)
    })
  }, []);

  useEffect(() => {
    if(!system.uniqueId) return;
    let period = 5000;
    let timer = setInterval(async function tick() {
      try{
        let time = new Date();
        let res = await fetch(`http://localhost:3000?id=${system.uniqueId}&time=${time}`);
      }catch(e){
        console.error(e)
      }
    }, period);
    
    return () => clearInterval(timer);
  }, [system]);

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
 