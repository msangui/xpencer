var AppConstants = require('../constants/appConstants');
var AppDispatcher = require('../dispatchers/appDispatcher');
var ExpenseAPI = require('../api/expenseApi');

var ExpenseActions = {
  load(expenseId) {

    // API call started
    AppDispatcher.dispatch({
      action: AppConstants.EXPENSES.LOAD
    });

    ExpenseAPI.getExpense(expenseId).then(function(expenseData) {
      // API call succeeded
      AppDispatcher.dispatch({
        action: AppConstants.EXPENSES.LOAD_SUCCESS,
        payload: {
          expenseData: expenseData
        }
      });
    }, function (error) {
      // API call failed
      AppDispatcher.dispatch({
        action: AppConstants.EXPENSES.LOAD_FAIL,
        payload: {
          error: error
        }
      });
    });
  },

  loadAll(month) {

    // API call started
    AppDispatcher.dispatch({
      action: AppConstants.EXPENSES.LOAD_ALL
    });

    ExpenseAPI.getAllExpenses(month).then(function(expenseData) {
      // API call succeeded
      AppDispatcher.dispatch({
        action: AppConstants.EXPENSES.LOAD_ALL_SUCCESS,
        payload: {
          expensesData: expenseData
        }
      });
    }, function (error) {
      // API call failed
      AppDispatcher.dispatch({
        action: AppConstants.EXPENSES.LOAD_ALL_FAIL,
        payload: {
          error: error
        }
      });
    });
  },

  add(expenseData) {

    // API call started
    AppDispatcher.dispatch({
      action: AppConstants.EXPENSES.ADD
    });

    ExpenseAPI.addExpense(expenseData).then(function(expenseData) {
      // API call succeeded
      AppDispatcher.dispatch({
        action: AppConstants.EXPENSES.ADD_SUCCESS,
        payload: {
          expenseData: expenseData
        }
      });
    }, function (error) {
      // API call failed
      AppDispatcher.dispatch({
        action: AppConstants.EXPENSES.ADD_FAIL,
        payload: {
          error: error
        }
      });
    });
  },

  update(expenseData){

    AppDispatcher.dispatch({
      action: AppConstants.EXPENSES.UPDATE
    });

    ExpenseAPI.updateExpense(expenseData).then(function() {
      AppDispatcher.dispatch({
        action: AppConstants.EXPENSES.UPDATE_SUCCESS,
        payload: {
          expenseData: expenseData
        }
      });
    }, function (error) {
      AppDispatcher.dispatch({
        action: AppConstants.EXPENSES.UPDATE_FAIL,
        payload: {
          error: error
        }
      });
    });
  },

  save(expenseData) {
    if (expenseData.id) {
      this.update(expenseData);
    } else {
      this.add(expenseData);
    }
  },

  remove(expenseId) {

    AppDispatcher.dispatch({
      action: AppConstants.EXPENSES.REMOVE
    });

    ExpenseAPI.removeExpense(expenseId).then(function() {
      AppDispatcher.dispatch({
        action: AppConstants.EXPENSES.REMOVE_SUCCESS,
        payload: {
          expenseId: expenseId
        }
      });
    }, function (error) {
      AppDispatcher.dispatch({
        action: AppConstants.EXPENSES.REMOVE_FAIL,
        payload: {
          error: error
        }
      });
    });
  },

  removeCancelled() {
    AppDispatcher.dispatch({
      action: AppConstants.EXPENSES.REMOVE_CANCELLED
    });

  }

};

module.exports = ExpenseActions;