var Rcon = require('rcon');

module.exports = {

    getConnection: function(server, command) {
        var rcon = new Rcon(server.host, server.port, String(server.password));

        rcon.on('auth', function () {
            rcon.send(command);
        });
        rcon.on('error', console.log.bind(console.log, 'Error'));
        rcon.on('response', function (response) {
            var lines = response.split('\n'),
            lastLine = lines[lines.length - 1],
            matches = lastLine.match(/rcon from "(.*)": command "(.*)"([\n\r\0 ]+)?$/);
            sails.sockets.broadcast('rcon', 'rcon', {from: server.id, msg: response});
            if (!matches) {
                return;
            }
            rcon.disconnect();
        });
        rcon.connect();
        return rcon;
    }
};