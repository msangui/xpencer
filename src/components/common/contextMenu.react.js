var React = require('react');
var StoreWatchMixin = require('../../mixins/storeWatchMixin');
var ContextMenuStore = require('../../stores/contextMenuStore');
var ContextMenuActions = require('../../actions/contextMenuActions');
var ReactTransitionGroup = React.addons.CSSTransitionGroup;

function setContextMenuState() {
  return ContextMenuStore.getState();
}

var ContextMenu = React.createClass({

  mixins: [new StoreWatchMixin({
      store: ContextMenuStore,
      setState: setContextMenuState
    }
  )],

  close() {
    ContextMenuActions.close();
  },

  render() {
    var contextMenu;

    if (this.state.open && this.state.contextMenuData.content) {
      contextMenu = (
        <div className="context-menu-container" onClick={this.close}>
          <div className={'context-menu box ' + this.state.contextMenuData.position}>
            {this.state.contextMenuData.content}
          </div>
        </div>
      );
    }


    return (
      <ReactTransitionGroup transitionName="context-menu" transitionLeave={false}>
        {contextMenu}
      </ReactTransitionGroup>
    );
  }

});

module.exports = ContextMenu;