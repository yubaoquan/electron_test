const { exec } = require('child_process');

exports.reload = function() {
    exec('./node_modules/.bin/electron .');
};
