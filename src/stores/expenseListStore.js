var merge = require('lodash/object/merge');
var AppDispatcher = require('../dispatchers/appDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var ExpenseDetailsStore = require('./expenseStore');

var _expenses = false;

function _loadExpenses(expenses) {
  if (!_expenses) {
    _expenses = [];
  }

  expenses.forEach(function(expense) {
    var found = false;
    _expenses.forEach(function(_expense, index) {
      if (_expense._id === expense._id) {
        _expenses[index] = expense;
        found = true;
      }
    });

    if (!found) {
      _expenses.push(expense);
    }

  });
}

function _updateExpense(expense) {
  if (!_expenses) {
    return;
  }
  _expenses.forEach(function(_expense, index) {
    if (_expense._id === expense._id) {
      _expenses[index] = expense;
    }
  });
}

function _addExpense(expense) {
  if (!_expenses) {
    return;
  }
  _expenses.push(expense);
}

function _removeExpense(expenseId) {
  _expenses.forEach(function(_expense, index) {
    if (_expense._id === expenseId) {
      _expenses.splice(index, 1);
    }
  });
}

function _getMonthExpenses(month) {
  if (!_expenses) {
    return false;
  }

  if (!month) {
    return _expenses;
  }

  return _expenses.filter(function (_expense) {
    var expenseMonth = new Date(_expense.createdAt).getMonth() + 1;
    return expenseMonth === month;
  });
}

const ExpenseListStore = merge({}, EventEmitter.prototype, {

  loading: false,

  error: false,

  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', function () {
      callback();
    });
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },

  getState(month) {
    return {
      expenses: _getMonthExpenses(month),
      loading: this.loading,
      error: this.error
    }
  }

});

ExpenseListStore.dispatchToken = AppDispatcher.register(function(actionPayload) {
  AppDispatcher.waitFor([ExpenseDetailsStore.dispatchToken]);

  var {action, payload} = actionPayload;

  switch(action) {
    case AppConstants.EXPENSES.LOAD_ALL:
    case AppConstants.EXPENSES.ADD:
    case AppConstants.EXPENSES.REMOVE:
    case AppConstants.EXPENSES.UPDATE:
      ExpenseListStore.loading = true;
      ExpenseListStore.error = false;
      ExpenseListStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.LOAD_ALL_SUCCESS:
      ExpenseListStore.loading = false;
      // add/update it on the cache object
      _loadExpenses(payload.expensesData);
      ExpenseListStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.LOAD_ALL_FAIL:
      ExpenseListStore.loading = false;
      ExpenseListStore.error = payload.error;
      ExpenseListStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.ADD_SUCCESS:
      ExpenseListStore.loading = false;
      _addExpense(payload.expenseData);
      ExpenseListStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.ADD_FAIL:
      ExpenseListStore.loading = false;
      ExpenseListStore.error = payload.error;
      ExpenseListStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.UPDATE_SUCCESS:
      ExpenseListStore.loading = false;
      _updateExpense(payload.expenseData);
      ExpenseListStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.UPDATE_FAIL:
      ExpenseListStore.loading = false;
      ExpenseListStore.error = payload.error;
      ExpenseListStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.REMOVE_SUCCESS:
      ExpenseListStore.loading = false;
      _removeExpense(payload.expenseId);
      ExpenseListStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.REMOVE_FAIL:
      ExpenseListStore.loading = false;
      ExpenseListStore.error = payload.error;
      ExpenseListStore.emitChange('change');
      break;

    default:
    // no op
  }
});

module.exports = ExpenseListStore;