// auto reload electron after cmd-q
const forever = require('forever-monitor');
const child = new (forever.Monitor)(['./node_modules/.bin/electron', '.'], {
    max: 3,
    silent: true,
    args: []
});

child.on('exit', () => {
    console.log('your process.js has exited after 3 restarts');
});

child.start();
