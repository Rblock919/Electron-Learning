const electron = require('electron');

const countdown = require('./countdown');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

const windows = [];
// let mainWindow;

app.on('ready', _ =>  {
    [1, 2, 3].forEach(_ => {

        let win = new BrowserWindow({
            height: 900,
            width: 900
        });

        win.loadURL(`file://${__dirname}/countdown.html`);


        win.on('closed', _ => {
            console.log('closed!')
            mainWindow = null;
        });
        console.log('ready!');

        windows.push(win);
    })
});

ipc.on('countdown-start', _ => {
    countdown(count => {
        windows.forEach(win => {
            win.webContents.send('countdown', count);
        });
    });
    console.log('caught it!');
});

console.log('Main!');