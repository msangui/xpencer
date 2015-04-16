var AppConstants = require('../constants/appConstants');
var Q = require('q');
var db = require('./db');

var ExpenseAPI = {
  addExpense(expenseData) {
    var deferred = Q.defer();

    db.ready().then(function (db) {
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

        setTimeout(function () {
          deferred.resolve(expenseData);
        }, 1500);
      };
    });

    return deferred.promise;
  },

  updateExpense(expenseData) {
    var deferred = Q.defer();

    db.ready().then(function (db) {

      expenseData.updatedAt = Date.now();

      var request = db.transaction(['expenses'], 'readwrite')
        .objectStore('expenses')
        .put(expenseData);

      request.onerror = function () {
        deferred.reject('failed to edit expense from database');
      };

      request.onsuccess = function () {
        setTimeout(function (){
          deferred.resolve(expenseData);
        }, 1500);
      };

    });

    return deferred.promise;
  },

  removeExpense(expenseId) {
    var deferred = Q.defer();
    db.ready().then(function (db) {
      expenseId = parseInt(expenseId, 10);
      var request = db.transaction(['expenses'], 'readwrite')
        .objectStore('expenses')
        .delete(expenseId);

      request.onerror = function () {
        deferred.reject('failed to remove expense ' + expenseId + ' from database');
      };

      request.onsuccess = function () {
        setTimeout(function (){
          deferred.resolve();
        }, 1500);
      };
    });

    return deferred.promise;
  },

  getExpense(expenseId) {
    var deferred = Q.defer();
    db.ready().then(function (db) {
      expenseId = parseInt(expenseId, 10);
      var request = db.transaction(['expenses'])
        .objectStore('expenses')
        .get(expenseId);

      request.onerror = function () {
        deferred.reject('failed to get expense ' + expenseId + 'from database');
      };

      request.onsuccess = function () {
        setTimeout(function (){
          deferred.resolve(request.result);
        }, 1500);
      };
    });

    return deferred.promise;
  },

  getAllExpenses() {
    var deferred = Q.defer();
    db.ready().then(function (db) {

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
          setTimeout(function (){
            deferred.resolve(expenses);
          }, 1500);
        }
      };
    });

    return deferred.promise;
  }
};

module.exports = ExpenseAPI;