var AppConstants = require('../constants/appConstants');
var AppDispatcher = require('../dispatchers/appDispatcher');

const TransitionActions = {
  go(transition) {
    AppDispatcher.dispatch({
      action: AppConstants.TRANSITIONS.GO,
      payload: {
        transition: transition
      }
    });
  },
  went() {
    AppDispatcher.dispatch({
      action: AppConstants.TRANSITIONS.WENT
    });
  }
};

module.exports = TransitionActions;