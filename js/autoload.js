const os = require('os');
const fs = require('fs');

const currentOs = os.platform();
const programName = 'identificator';


const ubuntuStartup = () => {
  const desktopFilePath = `${os.homedir()}/.config/autostart/${programName}.desktop`;
  const desktopFileContent = `
    [Desktop Entry]
    Type=Application
    Exec=/usr/lib/${programName}/${programName} hidden
    Hidden=false
    NoDisplay=false
    X-GNOME-Autostart-enabled=true
    Name[ru]=${programName}
    Name=${programName}
    Comment[ru]=
    Comment=
  `;
  try {
    fs.writeFileSync(desktopFilePath, desktopFileContent);
    console.log('Команда успешно добавлена в автозапуск.');
  } catch (error) {
    console.error('Ошибка при добавлении команды в автозапуск:', error);
  }
}

const isEnabledAutoloadUbuntu = async () => {
  const desktopFilePath = `${os.homedir()}/.config/autostart/${programName}.desktop`;
  try {
    await fs.access(desktopFilePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

const autoload = () => {
  switch(currentOs){
    case 'linux':
      return {
        enableAutoload: ubuntuStartup,
        isEnabledAutoload: isEnabledAutoloadUbuntu,
      }
    default:
      return {
        enableAutoload:  () => console.log(`неопознанная ОС: ${currentOs}`),
        isEnabledAutoload: async () => false,
      }
  }
}

module.exports = autoload();