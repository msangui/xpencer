var AppConstants = require('../constants/appConstants');
var AppDispatcher = require('../dispatchers/appDispatcher');
var ExpenseAPI = require('../api/expenseApi');

var ExpenseActions = {

  add(expenseData) {
    ExpenseAPI.addExpense(expenseData).then(function() {
      AppDispatcher.dispatch({
        actionType: AppConstants.EXPENSES.ADD,
        expenseData: expenseData
      });
    });
  },

  update(expenseData){
    ExpenseAPI.updateExpense(expenseData).then(function() {
      AppDispatcher.dispatch({
        actionType: AppConstants.EXPENSES.UPDATE,
        expenseData: expenseData
      });
    });
  },

  remove(expenseId) {
    ExpenseAPI.removeExpense(expenseId).then(function() {
      AppDispatcher.dispatch({
        actionType: AppConstants.EXPENSES.REMOVE,
        expenseId: expenseId
      });
    });
  }

};

module.exports = ExpenseActions;