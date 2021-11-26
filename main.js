const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {

    win = new BrowserWindow({
        width: 1000,
        height: 750,
        minWidth: 800,
        minHeight: 600,
        center: true,
        roundedCorners: true,
        webPreferences: {
            nodeIntegration: true,
            devTools: false
        },
        icon: './favicon.ico'
    });

    win.loadURL('file://' + __dirname + '/dist/unip-resort-frontend/index.html');

    win.removeMenu();

    win.on('closed', function() {
        win = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win == null)
        createWindow()
})