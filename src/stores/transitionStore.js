var AppConstants = require('../constants/appConstants');
var FluxStore = require('./fluxStore');
var ExpenseStore = require('./expenseStore');

const TransitionStore = new FluxStore({

  transition: false,

  listensTo: [
    {
      action: [
        AppConstants.TRANSITIONS.GO,
        AppConstants.EXPENSES.ADD_SUCCESS,
        AppConstants.EXPENSES.UPDATE_SUCCESS,
        AppConstants.EXPENSES.REMOVE_SUCCESS
      ],
      handler: 'go'
    },
    {
      action: AppConstants.TRANSITIONS.WENT,
      handler: 'went'
    }
  ],

  waitFor: [ExpenseStore.dispatchToken],

  go(payload) {
    this.transition = payload.transition;
  },

  went() {
    this.transition = false;
  },

  getState() {
    return this.transition;
  }

});

module.exports = TransitionStore;