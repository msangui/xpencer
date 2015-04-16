var AppConstants = require('../constants/appConstants');
var AppDispatcher = require('../dispatchers/appDispatcher');
var Q = require('q');

var NotificationAction = {

  show(notificationData) {
    AppDispatcher.dispatch({
      action: AppConstants.NOTIFICATIONS.SHOW,
      payload: {
        notificationData: notificationData
      }
    });
  },

  hide(callbackAction) {
    if (callbackAction) {
      // send this to as next as possible, first hide the notification!
      setTimeout(function() {
        callbackAction();
      }, 0);
    }

    // hide notification
    AppDispatcher.dispatch({
      action: AppConstants.NOTIFICATIONS.HIDE
    });
  }
};

module.exports = NotificationAction;