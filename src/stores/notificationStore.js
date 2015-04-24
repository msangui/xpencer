var merge = require('lodash/object/merge');
var AppDispatcher = require('../dispatchers/appDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;

var _notificationData = {};


function _initNotification(notificationData) {
  _notificationData = notificationData;
}

const NotificationStore = merge({}, EventEmitter.prototype, {

  show: false,

  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', callback);
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },

  getState() {
    return {
      show: this.show,
      notificationData: _notificationData
    }
  }

});

NotificationStore.dispatchToken = AppDispatcher.register(function(actionPayload) {

  var {action, payload} = actionPayload;

  switch(action) {
    case AppConstants.NOTIFICATIONS.SHOW:
      NotificationStore.show = true;
      _initNotification(payload.notificationData)
      NotificationStore.emitChange();
      break;

    case AppConstants.NOTIFICATIONS.HIDE:
      NotificationStore.show = false;
      _initNotification({});
      NotificationStore.emitChange();
      break;
    default:
    // no op
  }
});

module.exports = NotificationStore;