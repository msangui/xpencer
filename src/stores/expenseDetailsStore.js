var merge = require('lodash/object/merge');
var AppDispatcher = require('../dispatchers/appDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;

var _expensesDetails = {};

function _addExpense(expenseData) {
  var expenseId = expenseData.id.toString();
  _expensesDetails[expenseId] = expenseData;
}

function _removeExpense(expenseId) {
  delete _expensesDetails[expenseId];
}

function _updateExpense(expenseData) {
  _expensesDetails[expenseData.id] = expenseData;
}

const ExpenseDetailsStore = merge({}, EventEmitter.prototype, {

  loading: false,

  error: false,

  transition: false,

  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },

  getStoreState(expenseId) {
    return {
      expense: expenseId ? merge({}, _expensesDetails[expenseId]) : {},
      loading: this.loading,
      error: this.error,
      transition: this.transition
    }
  }

});

ExpenseDetailsStore.dispatchToken = AppDispatcher.register(function(actionPayload) {

  var {action, payload} = actionPayload;

  switch(action) {
    case AppConstants.EXPENSES.LOAD:
    case AppConstants.EXPENSES.ADD:
    case AppConstants.EXPENSES.REMOVE:
    case AppConstants.EXPENSES.UPDATE:
      ExpenseDetailsStore.loading = true;
      ExpenseDetailsStore.error = false;
      ExpenseDetailsStore.transition = false;
      ExpenseDetailsStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.LOAD_SUCCESS:
      ExpenseDetailsStore.loading = false;
      // add/update it on the cache object
      _updateExpense(payload.expenseData);
      ExpenseDetailsStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.LOAD_FAIL:
      ExpenseDetailsStore.loading = false;
      ExpenseDetailsStore.error = payload.error;
      ExpenseDetailsStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.ADD_SUCCESS:
      ExpenseDetailsStore.loading = false;
      _addExpense(payload.expenseData);
      ExpenseDetailsStore.transition = {
        route: 'viewExpense',
        params: {
          expenseId: payload.expenseData.id
        },
        replace: true
      };
      ExpenseDetailsStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.ADD_FAIL:
      ExpenseDetailsStore.loading = false;
      ExpenseDetailsStore.error = payload.error;
      ExpenseDetailsStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.UPDATE_SUCCESS:
      ExpenseDetailsStore.loading = false;
      _updateExpense(payload.expenseData);
      ExpenseDetailsStore.transition = {
        route: 'viewExpense',
        params: {
          expenseId: payload.expenseData.id
        },
        replace: true
      };
      ExpenseDetailsStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.UPDATE_FAIL:
      ExpenseDetailsStore.loading = false;
      ExpenseDetailsStore.error = payload.error;
      ExpenseDetailsStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.REMOVE_SUCCESS:
      ExpenseDetailsStore.loading = false;
      _removeExpense(payload.expenseData.id);
      ExpenseDetailsStore.transition = {
        route: 'listExpenses',
        params: {},
        replace: true
      };
      ExpenseDetailsStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.REMOVE_FAIL:
      ExpenseDetailsStore.loading = false;
      ExpenseDetailsStore.error = payload.error;
      ExpenseDetailsStore.emitChange('change');
      break;

    case AppConstants.EXPENSES.REMOVE_CANCELLED:
      ExpenseDetailsStore.loading = false;
      ExpenseDetailsStore.error = false;
      ExpenseDetailsStore.emitChange('change');
      break;

    default:
    // no op
  }
});

module.exports = ExpenseDetailsStore;