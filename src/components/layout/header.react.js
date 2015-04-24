var React = require('react/addons');
var ReactTransitionGroup = React.addons.CSSTransitionGroup;
var StoreWatchMixin = require ('../../mixins/storeWatchMixin');
var LayoutStore = require('../../stores/layoutStore');

function setHeaderState() {
  console.log('state', LayoutStore.getState().headerData)
  return LayoutStore.getState().headerData;
}

var Header = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [new StoreWatchMixin({
    store: LayoutStore,
    setState: setHeaderState,
    replace: true
  })],

  triggerLeftAction() {
    if (this.state.navigation && this.state.navigation.left && !this.state.navigation.left.disabled) {
      this.state.navigation.left.action();
    }
  },

  triggerRightAction() {
    if (this.state.navigation && this.state.navigation.right && !this.state.navigation.right.disabled) {
      this.state.navigation.right.action();
    }
  },

  render() {
    var left;
    var right;
    var navigation = this.state.navigation;
    if (navigation) {
      if (navigation.left) {
        left = (<span className={"icon " + navigation.left.icon} disabled={navigation.left.disabled}></span>);
      }
      if (navigation.right) {
        right = (<span className={"icon " + navigation.right.icon} disabled={navigation.right.disabled}></span>);
      }
    }

    return (
      <header className="nav-bar">
        <div className="row">
          <div className="action col-xs-3" onClick={this.triggerLeftAction}>{left}</div>
          <div className="col-xs-6 title">
            <h1>{this.state.title}</h1>
          </div>
          <div className="action col-xs-3" onClick={this.triggerRightAction}>{right}</div>
        </div>
      </header>
    );
  }
});

module.exports = Header;