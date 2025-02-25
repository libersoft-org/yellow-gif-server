import WebServer from './webserver.js';
import Common from './Common.js';

class App {
 async run() {
  const args = process.argv.slice(2);
  switch (args.length) {
   case 0:
    await this.startServer();
    break;
   case 1:
    if (args[0] === '--create-settings') await this.createSettings();
    else this.getHelp();
    break;
   default:
    this.getHelp();
    break;
  }
 }

 async startServer() {
  await this.loadSettings();
  const header = Common.appName + ' ver. ' + Common.appVersion;
  const dashes = '='.repeat(header.length);
  Common.addLog(dashes);
  Common.addLog(header);
  Common.addLog(dashes);
  Common.addLog('');
  this.webServer = new WebServer();
  await this.webServer.start();
 }

 getHelp() {
  Common.addLog('Command line arguments:');
  Common.addLog('');
  Common.addLog('--help - to see this help');
  Common.addLog('--create-settings - to create a default settings file named "' + Common.settingsFile + '"');
 }

 async loadSettings() {
  const file = Bun.file(Common.settingsFile);
  if (await file.exists()) {
   try {
    Common.settings = await file.json();
   } catch {
    Common.addLog('Settings file "' + Common.settingsFile + '" has an invalid format.', 2);
    process.exit(1);
   }
  } else {
   Common.addLog('Settings file "' + Common.settingsFile + '" not found. Please run this application again using: "./start.sh --create-settings"', 2);
   process.exit(1);
  }
 }

 async createSettings() {
  const file = Bun.file(Common.settingsFile);
  if (await file.exists()) {
   Common.addLog('Settings file "' + Common.settingsFile + '" already exists. If you need to replace it with default one, delete the old one first.', 2);
   process.exit(1);
  } else {
   var settings = {
    web: {
     standalone: true,
     http_port: 80,
     https_port: 443,
     root: 'www',
     certificates: [
      {
       domain: '{DOMAIN}',
       private: '/etc/letsencrypt/live/{DOMAIN}/privkey.pem',
       public: '/etc/letsencrypt/live/{DOMAIN}/cert.pem',
      },
     ],
     socket_path: 'server.sock',
    },
    log: {
     enabled: true,
     file: 'server.log',
    },
    tenor: {
     api_key: '<API_KEY>',
     client_key: "<CLIENT_KEY>",
    },
   };
   await Bun.write(Common.settingsFile, JSON.stringify(settings, null, 1));
   Common.addLog('Settings file was created sucessfully.');
  }
 }
}

export default App;
