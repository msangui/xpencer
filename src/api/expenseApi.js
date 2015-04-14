var AppConstants = require('../constants/appConstants');
var Q = require('q');

var db;
var ready = Q.defer();
var request = window.indexedDB.open(AppConstants.DATABASE.NAME);

request.onerror = function() {
  ready.reject();
};

request.onsuccess = function() {
  db = request.result;
  ready.resolve();
};

request.onupgradeneeded = function (event) {
  var db = event.target.result;
  var os = db.createObjectStore('expenses', {keyPath: 'id'});
  // create indexes
  os.createIndex("createdAt", "createdAt", {unique:false});
  os.createIndex("updatedAt", "updatedAt", {unique:false});
};

var ExpenseAPI = {
  addExpense(expenseData) {
    var deferred = Q.defer();

    ready.promise.then(function () {
      expenseData.id = Date.now();
      expenseData.createdAt = Date.now();
      expenseData.updatedAt = Date.now();

      var request = db.transaction(['expenses'], 'readwrite')
        .objectStore('expenses')
        .add(expenseData);

      request.onerror = function() {
        deferred.reject('failed to add expense to database');
      };

      request.onsuccess = function() {
        deferred.resolve();
      };
    });

    return deferred.promise;
  },

  updateExpense(expenseData) {
    var deferred = Q.defer();

    ready.promise.then(function () {

      expenseData.updatedAt = Date.now();

      var request = db.transaction(['expenses'], 'readwrite')
        .objectStore('expenses')
        .put(expenseData);

      request.onerror = function () {
        deferred.reject('failed to edit expense from database');
      };

      request.onsuccess = function () {
        deferred.resolve();
      };

    });

    return deferred.promise;
  },

  removeExpense(expenseId) {
    var deferred = Q.defer();
    ready.promise.then(function () {

      var request = db.transaction(['expenses'], 'readwrite')
        .objectStore('expenses')
        .delete(expenseId);

      request.onerror = function () {
        deferred.reject('failed to remove expense ' + expenseId + ' from database');
      };

      request.onsuccess = function () {
        deferred.resolve();
      };
    });

    return deferred.promise;
  },

  getExpense(expenseId) {
    var deferred = Q.defer();
    ready.promise.then(function () {

      var request = db.transaction(['expenses'])
        .objectStore('expenses')
        .get(expenseId);

      request.onerror = function () {
        deferred.reject('failed to get expense ' + expenseId + 'from database');
      };

      request.onsuccess = function () {
        deferred.resolve(request.result);
      };
    });

    return deferred.promise;
  },

  getAllExpenses() {
    var deferred = Q.defer();
    ready.promise.then(function () {

      var request = db.transaction(['expenses'])
        .objectStore('expenses')
        .openCursor();

      var expenses = [];

      request.onerror = function () {
        deferred.reject('failed to get all expenses from database');
      };

      request.onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
          expenses.push(cursor.value);
          cursor.continue();
        } else {
          deferred.resolve(expenses);
        }
      };
    });

    return deferred.promise;
  }
};

module.exports = ExpenseAPI;