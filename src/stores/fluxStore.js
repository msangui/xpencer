var merge = require('lodash/object/merge');
var isArray = require('lodash/lang/isArray');
var isString = require('lodash/lang/isString');
var isFunction = require('lodash/lang/isFunction');

var AppDispatcher = require('../dispatchers/appDispatcher');
var EventEmitter = require('events').EventEmitter;

var FluxStore = function (config) {
  var self = this;

  merge(this, config);

  var listeners = {};

  this.listensTo.forEach(function (listener) {
    if (isArray(listener.action)) {
      listener.action.forEach(function (action) {
        listeners[action] = listener.handler;
      });
    } else if (isString(listener.action)) {
      listeners[listener.action] = listener.handler;
    }
  });

  var actions = Object.keys(listeners);


  this.dispatchToken = AppDispatcher.register(function(actionPayload) {
    if (self.waitFor) {
      AppDispatcher.waitFor(self.waitFor);
    }

    var {action, payload} = actionPayload;

    if (actions.indexOf(action) > -1) {
      var handler = self[listeners[action]];
      if (isFunction(handler)) {
        handler.call(self, payload);
      }
      self.emit('change');
    }
  });
};

FluxStore.prototype = merge({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on('change', function () {
      callback();
    });
  },
  removeChangeListener(callback) {
   this.removeListener('change', callback);
  }
});


module.exports = FluxStore;