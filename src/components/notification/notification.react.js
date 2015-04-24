var React = require('react');
var StoreWatchMixin = require('../../mixins/storeWatchMixin');
var NotificationStore = require('../../stores/notificationStore');
var NotificationActions = require('../../actions/notificationActions');
var ReactTransitionGroup = React.addons.CSSTransitionGroup;

function setNotificationState() {
  return NotificationStore.getState();
}

var Notification = React.createClass({

  mixins: [new StoreWatchMixin({
    store: NotificationStore,
    setState: setNotificationState
  })],

  acceptNotification() {
    NotificationActions.hide(this.state.notificationData.acceptCallbackAction);
  },

  cancelNotification() {
    NotificationActions.hide(this.state.notificationData.rejectCallbackAction);
  },

  render() {
    var options;
    var message;
    var notification;

    if (this.state.open) {
      if (this.state.notificationData.cancelable) {
        options = (
          <div className="notification-options">
            <div
              className="option ok"
              onClick={this.acceptNotification}>
              <span className="icon icon-tick"></span>
            </div>
            <div
              className="option cancel"
              onClick={this.cancelNotification}>
              <span className="icon icon-cross"></span>
            </div>
          </div>
        );
      }

      if (this.state.notificationData.message) {
        message = (<div className="notification-message">{this.state.notificationData.message}</div>);
      }
      notification = (
        <div className="notification-overlay" onClick={this.cancelNotification}>
          <div className="notification">
            <div className="notification-title">
              {this.state.notificationData.title}
            </div>
            {message}
            {options}
          </div>
        </div>

      )
    }


    return (
      <ReactTransitionGroup transitionName="notification">
        {notification}
      </ReactTransitionGroup>
    );
  }

});

module.exports = Notification;