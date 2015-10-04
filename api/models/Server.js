/**
* Server.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'server',
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true,
      index: true
    },
    host: {
      type: 'string',
      required: true
    },
    port: {
      type: 'integer',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  }
};

