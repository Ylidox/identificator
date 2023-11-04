import React, {useEffect, useState} from 'react';
import styles from '../styles/components/SystemInformation.module.scss'

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
      <h1 className={styles.head}>Информация о компьютере</h1>
      <ul className={styles.list}>
        <li>
          <div className={styles.field}>Модель компьютера:</div>
          <div className={styles.content}>{system.model}</div>
        </li>
        <li>
          <div className={styles.field}>Модель процессора:</div>
          <div className={styles.content}>{system.modelProc}</div>
        </li>
        <li>
          <div className={styles.field}>Производитель: </div>
          <div className={styles.content}>{system.manufacturer}</div>
        </li>
        <li>
          <div className={styles.field}>Архитектура:</div>
          <div className={styles.content}>{system.arch}</div>
        </li>
        <li>
          <div className={styles.field}>Операционная система:</div>
          <div className={styles.content}>{system.platform}</div>
        </li>
        {system.platform == 'linux' && 
          <li>
            <div className={styles.field}>Дистрибутив:</div>
            <div className={styles.content}>{system.distro}</div>
          </li>
        }
        <li>
          <div className={styles.field}>Уникальный id:</div>
          <div className={styles.content}>{system.uniqueId}</div>
        </li>
        <li>
          <div className={styles.field}>Серийный номер:</div>
          <div className={styles.content}>{serialNumber}</div>
        </li>
        <li>
          <div className={styles.field}>UUID:</div>
          <div className={styles.content}>{system.uuid}</div>
        </li>
        <li>
          <div className={styles.field}>SKU:</div>
          <div className={styles.content}>{system.sku}</div>
        </li>        
      </ul>
    </>
  );
}
 