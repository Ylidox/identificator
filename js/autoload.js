const os = require('os');

const currentOs = os.platform();

let linuxEnable = () => {
  const AutoLaunch = require('auto-launch');

  const appLauncher = new AutoLaunch({
    name: 'identificator', // Название вашего приложения
    path: process.execPath // Путь к исполняемому файлу вашего приложения
  });

  appLauncher.enable(); 
}

module.exports = linuxEnable;

// switch(currentOs){

// }
