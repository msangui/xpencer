var AppConstants = require('../constants/appConstants');
var FluxStore = require('./fluxStore');

var _contextMenuData = {};

function _initContextMenu(contextMenuData) {
  _contextMenuData = contextMenuData;
}

const ContextMenuStore = new FluxStore({

  open: false,

  listensTo: [
    {action: AppConstants.CONTEXT_MENU.OPEN, handler: 'show'},
    {action: AppConstants.CONTEXT_MENU.CLOSE, handler: 'hide'}
  ],

  show(payload) {
    this.open = true;
    _initContextMenu(payload.contextMenuData);
  },

  hide() {
    this.open = false;
    _initContextMenu({});
  },

  getState() {
    return {
      open: this.open,
      contextMenuData: _contextMenuData
    }
  }

});


module.exports = ContextMenuStore;