// main.js
const {app,BrowserWindow} = require('electron')
const path = require('path');

app.on('ready', () => { 
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
});


