var merge = require('lodash/object/merge');
var AppDispatcher = require('../dispatchers/appDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;

var _expensesDetails = {};

function _saveExpense(expenseData) {
  _expensesDetails[expenseData._id] = expenseData;
}

function _removeExpense(expenseId) {
  delete _expensesDetails[expenseId];
}

function _getExpense(expenseId) {
  return merge({}, _expensesDetails[expenseId] || {category: {}});
}

const ExpenseStore = merge({}, EventEmitter.prototype, {

  loading: false,

  error: {error: false, validation: {category: {}}},

  cleanState(){
    this.loading = false;
    this.error = {error: false, validation: {category: {}}};
  },

  emitChange(transition) {
    this.emit('change', transition);
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },

  getInitialState(expenseId) {
    this.cleanState();
    return {
      error: this.error,
      loading: this.loading,
      expense: _getExpense(expenseId)
    }
  },

  getState(expenseId) {
    var expense = _getExpense(expenseId);
    var state = {
      error: this.error,
      loading: this.loading
    };

    if (!this.error.error && !this.loading) {
      state.expense = expense;
    }

    return state;
  }
});

ExpenseStore.dispatchToken = AppDispatcher.register(function(actionPayload) {

  var {action, payload} = actionPayload;

  switch(action) {
    case AppConstants.EXPENSES.LOAD:
    case AppConstants.EXPENSES.ADD:
    case AppConstants.EXPENSES.REMOVE:
    case AppConstants.EXPENSES.UPDATE:
      ExpenseStore.cleanState();
      ExpenseStore.loading = true;
      ExpenseStore.emitChange();
      break;

    case AppConstants.EXPENSES.LOAD_SUCCESS:
      ExpenseStore.loading = false;
      // add/update it on the cache object
      _saveExpense(payload.expenseData);

      ExpenseStore.emitChange();
      break;

    case AppConstants.EXPENSES.LOAD_FAIL:
      ExpenseStore.loading = false;
      ExpenseStore.error = payload.error;
      ExpenseStore.emitChange();
      break;

    case AppConstants.EXPENSES.ADD_SUCCESS:
      ExpenseStore.loading = false;

      _saveExpense(payload.expenseData);

      ExpenseStore.emitChange({
        route: 'viewExpense',
        params: {
          expenseId: payload.expenseData._id
        },
        replace: true
      });
      break;

    case AppConstants.EXPENSES.ADD_FAIL:
      ExpenseStore.loading = false;
      ExpenseStore.error = payload.error;
      ExpenseStore.emitChange();
      break;

    case AppConstants.EXPENSES.UPDATE_SUCCESS:
      ExpenseStore.loading = false;

      _saveExpense(payload.expenseData);

      ExpenseStore.emitChange({
        route: 'viewExpense',
        params: {
          expenseId: payload.expenseData._id
        },
        direction: 'back',
        replace: true
      });
      break;

    case AppConstants.EXPENSES.UPDATE_FAIL:
      ExpenseStore.loading = false;
      ExpenseStore.error = payload.error;
      ExpenseStore.emitChange();
      break;

    case AppConstants.EXPENSES.REMOVE_SUCCESS:
      ExpenseStore.loading = false;

      _removeExpense(payload.expenseId);

      ExpenseStore.emitChange({
        route: 'listExpenses',
        params: {},
        direction: 'back',
        replace: true
      });
      break;

    case AppConstants.EXPENSES.REMOVE_FAIL:
      ExpenseStore.loading = false;
      ExpenseStore.error = payload.error;
      ExpenseStore.emitChange();
      break;

    case AppConstants.EXPENSES.REMOVE_CANCELLED:
      ExpenseStore.loading = false;
      ExpenseStore.error = false;
      ExpenseStore.emitChange();
      break;

    default:
    // no op
  }
});

module.exports = ExpenseStore;