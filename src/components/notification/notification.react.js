var React = require('react');
var StoreWatchMixin = require('../../mixins/storeWatchMixin');
var NotificationStore = require('../../stores/notificationStore');
var NotificationActions = require('../../actions/notificationActions');
var Hammer = require('react-hammerjs');

function setNotificationState() {
  return NotificationStore.getStoreState();
}

var Notification = React.createClass({

  mixins: [new StoreWatchMixin(NotificationStore, setNotificationState)],

  acceptNotification() {
    NotificationActions.hide(this.state.notificationData.acceptCallbackAction);
  },

  cancelNotification() {
    NotificationActions.hide(this.state.notificationData.rejectCallbackAction);
  },

  render() {
    var options;
    var message;
    if (this.state.notificationData.cancelable) {
      options = (
        <div className="notification-options">
          <Hammer component="button"
            className="btn btn-positive btn-block"
            onTap={this.acceptNotification}>OK</Hammer>
          <Hammer component="button"
            className="btn btn-negative btn-block btn-outlined"
            onTap={this.cancelNotification}>Cancel</Hammer>
        </div>
      );
    }

    if (this.state.notificationData.message) {
      message = (<p>{this.state.notificationData.message}</p>);
    }

    return (
      <Hammer className={'notification ' + (this.state.show ? 'shown': '')}
        component="div"
        onTap={this.cancelNotification}>
        <div className="popover">
          <header className="bar bar-nav">
            <h2 className="title">{this.state.notificationData.title}</h2>
          </header>
          <div className="table-view content-padded">
            {message}
            {options}
          </div>
        </div>
      </Hammer>
    );
  }

});

module.exports = Notification;