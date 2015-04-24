var AppConstants = require('../constants/appConstants');
var AppDispatcher = require('../dispatchers/appDispatcher');

const TransitionActions = {
  go(transition) {

    // always wait for other stores dispatchers
    setTimeout(function () {
      AppDispatcher.dispatch({
        action: AppConstants.TRANSITIONS.GO,
        payload: {
          transition: transition
        }
      });
    }, 0);
  },
  went() {
    AppDispatcher.dispatch({
      action: AppConstants.TRANSITIONS.WENT
    });
  }
};

module.exports = TransitionActions;