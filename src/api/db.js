var AppConstants = require('../constants/appConstants');

var db = new PouchDB(AppConstants.DATABASE.NAME, {adapter: 'websql'});

module.exports = db;