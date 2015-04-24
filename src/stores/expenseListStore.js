var AppConstants = require('../constants/appConstants');
var FluxStore = require('./fluxStore');
var ExpenseStore = require('./expenseStore');

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

const ExpenseListStore = new FluxStore({

  loading: false,

  error: false,

  waitFor: [ExpenseStore.dispatchToken],

  listensTo: [
    {
      action: [
        AppConstants.EXPENSES.LOAD_ALL,
        AppConstants.EXPENSES.ADD,
        AppConstants.EXPENSES.REMOVE,
        AppConstants.EXPENSES.UPDATE
      ],
      handler: 'start'
    },
    {
      action: [
        AppConstants.EXPENSES.LOAD_ALL_FAIL,
        AppConstants.EXPENSES.ADD_FAIL,
        AppConstants.EXPENSES.REMOVE_FAIL,
        AppConstants.EXPENSES.UPDATE_FAIL
      ],
      handler: 'fail'
    },
    {
      action: AppConstants.EXPENSES.LOAD_ALL_SUCCESS,
      handler: 'loadAll'
    },
    {
      action: AppConstants.EXPENSES.ADD_SUCCESS,
      handler: 'add'
    },
    {
      action: AppConstants.EXPENSES.UPDATE_SUCCESS,
      handler: 'update'
    },
    {
      action: AppConstants.EXPENSES.REMOVE_SUCCESS,
      handler: 'remove'
    }
  ],

  // action handlers

  start() {
    this.loading = true;
    this.error = false;
  },

  fail(payload) {
    this.loading = false;
    this.error = payload.error;
  },

  loadAll(payload) {
    this.loading = false;
    this.error = false;
    _loadExpenses(payload.expensesData);
  },

  add(payload) {
    this.loading = false;
    this.error = false;
    _addExpense(payload.expenseData);
  },

  update(payload) {
    this.loading = false;
    this.error = false;
    _updateExpense(payload.expenseData);
  },

  remove(payload) {
    this.loading = false;
    this.error = false;
    _removeExpense(payload.expenseId);
  },

  getState(month) {
    return {
      expenses: _getMonthExpenses(month),
      loading: this.loading,
      error: this.error
    }
  }
});

module.exports = ExpenseListStore;