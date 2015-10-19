/**
 * ServerController
 *
 * @description :: Server-side logic for managing servers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    home: function (req, res) {
        Server.find().exec(function (err, servers) {
            if (err) {
                throw err;
                return;
            }

            res.view('homepage', {
                selected: servers.length ? servers[0].id : null,
                servers: servers
            });
        });

    },
    add: function (req, res) {
        var server = {
            name: req.param('name'),
            host: req.param('host'),
            port: req.param('port'),
            password: req.param('password')
        };

        if (!server.name && req.isSocket) {
            Server.watch(req);
            return;
        }

        Server.create(server).exec(function (err, newServer) {
            if (err) {
                console.log('Error create model', err);
                return;
            }
            Server.publishCreate(newServer);
        });
    },

    del: function (req, res) {
        var id = req.param('id');
        if (!id && req.isSocket) {
            Server.find().exec(function (err, servers) {
                Server.subscribe(req.socket, servers);
            });
            return;
        }
        Server.destroy({id: id}).exec(function (err) {
            if (err) {
                throw err;
                return;
            }
            Server.publishDestroy(id);
        });
    },

    rcon: function (req, res) {
        var command = req.param('command'),
        serverId = req.param('serverId');
        sails.sockets.join(sails.sockets.id(req), 'rcon');
        Server.find({id: serverId}).exec(function (err, server) {
            rconConnection.getConnection(server[0], command);
        });
    }
};

