var AppConstants = require('../constants/appConstants');
var FluxReact = require('./fluxStore');


var _notificationData = {};

function _initNotification(notificationData) {
  _notificationData = notificationData;
}

const NotificationStore = new FluxReact({

  open: false,

  listensTo: [
    {
      action: AppConstants.NOTIFICATIONS.SHOW,
      handler: 'show'
    },
    {
      action: AppConstants.NOTIFICATIONS.HIDE,
      handler: 'hide'
    }
  ],

  show(payload){
    this.open = true;
    _initNotification(payload.notificationData);
  },

  hide(){
    this.open = false;
    _initNotification({});
  },

  getState() {
    return {
      open: this.open,
      notificationData: _notificationData
    }
  }
});

module.exports = NotificationStore;