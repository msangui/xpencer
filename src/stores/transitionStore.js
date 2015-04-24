var merge = require('lodash/object/merge');
var AppDispatcher = require('../dispatchers/appDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;

const TransitionStore = merge({}, EventEmitter.prototype, {

  transition: false,

  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', function () {
      callback();
    });
  },

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  },

  getTransition() {
    return this.transition;
  }

});

TransitionStore.dispatchToken = AppDispatcher.register(function(actionPayload) {

  var {action, payload} = actionPayload;

  switch(action) {
    case AppConstants.TRANSITIONS.GO:
      TransitionStore.transition = payload.transition;
      TransitionStore.emitChange('change');
      break;

    case AppConstants.TRANSITIONS.WENT:
      TransitionStore.transition = false;
      TransitionStore.emitChange('change');
      break;

    default:
    // no op
  }
});

module.exports = TransitionStore;