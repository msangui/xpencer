'use strict';

var AppDispatcher = require('../dispatchers/appDispatcher');
var AppConstants = require('../constants/appConstants');
var ObjectAssign = require('object-assign');
var ExpenseAPI = require('../api/expenseApi');
var EventEmitter = require('events').EventEmitter;

var _expenses = [];
var _expensesDetails = {};
var _initialized = false;

function _addExpense(expenseData) {
  _expenses.push(expenseData);
  _expensesDetails[expenseData.id] = expenseData;
}

function _removeExpense(expenseId) {
  expenseId = parseInt(expenseId, 10);

  var expenseToRemoveIndex = -1;
  _expenses.forEach(function(expense, index) {
    if (expense.id === expenseId) {
      expenseToRemoveIndex = index;
    }
  });

  if (expenseToRemoveIndex !== -1) {
    _expenses.splice(expenseToRemoveIndex, 1);
  }

  delete _expensesDetails[expenseId];

}

function _updateExpense(expenseId, expenseData) {
  expenseId = parseInt(expenseId, 10);

  var expenseToUpdateIndex = -1;
  _expenses.forEach(function(expense, index) {
    if (expense.id === expenseId) {
      expenseToUpdateIndex = index;
    }
  });

  if (expenseToUpdateIndex !== -1) {
    _expenses[expenseToUpdateIndex] = expenseData;
  }

  _expensesDetails[expenseData.id] = expenseData;

}

var ExpenseStore = ObjectAssign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(AppConstants.EXPENSES.CHANGE);
  },

  addChangeListener(callback) {
    this.on(AppConstants.EXPENSES.CHANGE, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(AppConstants.EXPENSES.CHANGE, callback);
  },

  getAllExpenses() {
    if (!_initialized) {
      _initialized = true;
      ExpenseAPI.getAllExpenses().then(function (expenses) {
        _expenses = expenses;
        ExpenseStore.emitChange();
      });
    }

    return _expenses;
  },

  getExpense(expenseId) {

    expenseId = parseInt(expenseId, 10);

    if (!_expensesDetails[expenseId]) {
      ExpenseAPI.getExpense(expenseId).then(function (expense) {
        _expensesDetails[expenseId] = expense;
        ExpenseStore.emitChange();
      });
    }

    return _expensesDetails[expenseId] || {id: '0'};
  }

});


AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case AppConstants.EXPENSES.ADD:
      _addExpense(action.expenseData);
      ExpenseStore.emitChange();
      break;
    case AppConstants.EXPENSES.REMOVE:
      _removeExpense(action.expenseId);
      ExpenseStore.emitChange();
      break;
    case AppConstants.EXPENSES.UPDATE:
      _updateExpense(action.expenseData.id, action.expenseData);
      ExpenseStore.emitChange();
      break;
    default:
    // no op
  }
});

module.exports = ExpenseStore;