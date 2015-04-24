var merge = require('lodash/object/merge');
var AppDispatcher = require('../dispatchers/appDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;

var _contextMenuData = {};


function _initContextMenu(contextMenuData) {
  _contextMenuData = contextMenuData;
}

const ContextMenuStore = merge({}, EventEmitter.prototype, {

  open: false,

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
      open: this.open,
      contextMenuData: _contextMenuData
    }
  }

});

ContextMenuStore.dispatchToken = AppDispatcher.register(function(actionPayload) {

  var {action, payload} = actionPayload;

  switch(action) {
    case AppConstants.CONTEXT_MENU.OPEN:
      ContextMenuStore.open = true;
      _initContextMenu(payload.contextMenuData);
      ContextMenuStore.emitChange();
      break;

    case AppConstants.CONTEXT_MENU.CLOSE:
      ContextMenuStore.open = false;
      _initContextMenu({});
      ContextMenuStore.emitChange();
      break;
    default:
    // no op
  }
});

module.exports = ContextMenuStore;