// const { ipcMain } = require('electron')
// const { execFile } = require('child_process');
//
// ipcMain.on('tst', (event, data) => {
//     const child = execFile('./backend/test2.exe', [], (error, stdout, stderr) => {
//         if (error) {
//             throw error;
//         }
//         console.log(stdout);
//     });
// })

// const { ipcMain } = require('electron')
// const { execFile } = require('child_process');
//
// ipcMain.on('tst', (event, data) => {
//     const child = execFile('./backend/test2.exe', [], (error, stdout, stderr) => {
//         if (error) {
//             throw error;
//         }
//         console.log(stdout);
//     });
// })

//elevate example
// const { ipcMain } = require('electron')
// const { execFile } = require('child_process');
//
// ipcMain.on('tst', (event, data) => {
//     execFile('./backend/Elevate.exe', ['./backend\\test2.exe'], (error, stdout, stderr) => {
//         if (error) {
//             console.error(`exec error: ${error}`);
//             return;
//         }
//         console.log(`stdout: ${stdout}`);
//         console.error(`stderr: ${stderr}`);
//     });
// })

//fork
// const { ipcMain } = require('electron')
// const { spawn } = require('child_process');
//
// ipcMain.on('tst', (event, data) => {
//     const s_process = spawn('./backend/Elevate.exe', ['./backend\\test2.exe']);
//     let fullData = '';
//     let dataChunks = 0;
//
//     s_process.stderr.on('data', (data) => {
//         console.log(`stderr: ${data}`);
//     });
//
//     s_process.stdout.on('data', function (data) {
//         fullData += data;
//         dataChunks += 1;
//         console.log(`stdout: ${data}`);
//     });
//
//     s_process.stdout.on('end', function () {
//         console.log(`end: ${fullData}`);
//         console.log(`chunks: ${dataChunks}`);
//     });
//
//     s_process.on('close', (code) => {
//         console.log(`child process exited with code ${code}`);
//     });
// })


//worker test
// var cp = require('child_process');
//
// var child = cp.fork(__dirname + '/sub.js');
//
// child.on('message', function(m) {
//     console.log('Parent process received:', m);
// });
//
// child.send({ hello: 'from parent process' });
//
// child.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
// });



const { ipcMain } = require('electron')
const { execFile } = require('child_process');
const { fork } = require('child_process');


ipcMain.on('tst', (event, data) => {
    execFile('./backend/Elevate.exe', ['./backend\\test2.exe'], function(error, stdout, stderr) {

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

        if (error !== null) {
            console.log(`error: ${error}`);
        } else {

            const s_process = fork(__dirname + '/back.js');

            s_process.on('message', (data) => {
                console.log('Parent process received:', data);
            });

            s_process.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
        }
    });


})

