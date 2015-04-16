var merge = require('lodash/object/merge');
var AppDispatcher = require('../dispatchers/appDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
var ExpenseDetailsStore = require('./expenseDetailsStore');

var _expenses = false;

function _loadExpenses(expenses) {
  if (!_expenses) {
    _expenses = [];
  }

  expenses.forEach(function(expense) {
    var found = false;
    _expenses.every(function(_expense, index) {
      if (_expense.id === expense.id) {
        _expenses[index] = expense;
        found = true;
        return false;
      }
    });

    if (!found) {
      _expenses.push(expense);
    }

  });
}

function _updateExpense(expense) {
  _expenses.every(function(_expense, index) {
    if (_expense.id === expense.id) {
      _expenses[index] = expense;
      return false;
    }
  });
}

function _addExpense(expense) {
  _expenses.push(expense);
}

function _removeExpense(expense) {
  _expenses.every(function(_expense, index) {
    if (_expense.id === expense.id) {
      _expenses.splice(index, 1);
      return false;
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
    var expenseMonth = new Date(_expense.updatedAt).getMonth() + 1;
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

  getStoreState(month) {
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
      _removeExpense(payload.expenseData.id);
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