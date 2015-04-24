var AppConstants = require('../constants/appConstants');
var FluxStore = require('./fluxStore');
var merge = require('lodash/object/merge');

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

const ExpenseStore = new FluxStore({

  loading: false,

  error: {error: false, validation: {category: {}}},

  listensTo: [
    {
      action: [
        AppConstants.EXPENSES.LOAD,
        AppConstants.EXPENSES.ADD,
        AppConstants.EXPENSES.REMOVE,
        AppConstants.EXPENSES.UPDATE
      ],
      handler: 'start'
    },
    {
      action: [
        AppConstants.EXPENSES.LOAD_SUCCESS,
        AppConstants.EXPENSES.ADD_SUCCESS,
        AppConstants.EXPENSES.UPDATE_SUCCESS
      ],
      handler: 'save'
    },
    {
      action: [
        AppConstants.EXPENSES.LOAD_FAIL,
        AppConstants.EXPENSES.ADD_FAIL,
        AppConstants.EXPENSES.REMOVE_FAIL,
        AppConstants.EXPENSES.UPDATE_FAIL
      ],
      handler: 'fail'
    },
    {
      action: AppConstants.EXPENSES.REMOVE_SUCCESS,
      handler: 'remove'
    }
  ],

  start() {
    this.cleanState();
    this.loading = true;
  },

  fail(payload) {
    this.loading = false;
    this.error = payload.error;
  },


  save(payload) {
    this.cleanState();
    _saveExpense(payload.expenseData);
  },

  remove(payload) {
    this.cleanState();
    _removeExpense(payload.expenseId);
  },

  cleanState(){
    this.loading = false;
    this.error = {error: false, validation: {category: {}}};
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

module.exports = ExpenseStore;