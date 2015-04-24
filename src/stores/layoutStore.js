var merge = require('lodash/object/merge');
var AppDispatcher = require('../dispatchers/appDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;

var _layoutData = {
  headerData: {
    title: 'Xpencer'
  }
};


const LayoutStore = merge({}, EventEmitter.prototype, {

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
    return _layoutData;
  }

});

LayoutStore.dispatchToken = AppDispatcher.register(function(actionPayload) {

  var {action, payload} = actionPayload;

  switch(action) {
    case AppConstants.LAYOUT.SET_HEADER:
      _layoutData.headerData = payload.headerData;
      LayoutStore.emitChange();
      break;

    default:
    // no op
  }
});

module.exports = LayoutStore;