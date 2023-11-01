import React, {useEffect, useState} from 'react';

export const SystemInformation = () => {
  let [system, setSystem] = useState('');
  useEffect(() => {
    async function getElectronData(){
      let system = await electron.getSysteminformation();
      setSystem(system);
      log(system)
      log(electron.getHostName())
    }
    

    return;
  }, []);
  return (
    <>
      <h1>Информация о компьютере</h1>
    </>
  );
}
 