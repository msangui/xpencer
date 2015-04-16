var Q = require('q');
var AppConstants = require('../constants/appConstants');

var db;
var ready = Q.defer();
var request = window.indexedDB.open(AppConstants.DATABASE.NAME);

request.onerror = function(error) {
  ready.reject(error);
};

request.onsuccess = function() {
  db = request.result;
  ready.resolve(db);
};

request.onupgradeneeded = function (event) {
  var db = event.target.result;
  var os = db.createObjectStore('expenses', {keyPath: 'id'});
  // create indexes
  os.createIndex("createdAt", "createdAt", {unique:false});
  os.createIndex("updatedAt", "updatedAt", {unique:false});
};

var DB = {
  ready() {
    return ready.promise;
  }
};


module.exports = DB;