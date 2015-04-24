var merge = require('lodash/object/merge');
var AppDispatcher = require('../dispatchers/appDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;

const CategoryFilterListStore = merge({}, EventEmitter.prototype, {

  categories: [],

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

  getInitialState() {
    return {
      categories: []
    }
  },

  getState() {
    return {
      categories: this.categories
    }
  }

});

CategoryFilterListStore.dispatchToken = AppDispatcher.register(function(actionPayload) {
  var {action, payload} = actionPayload;

  switch(action) {
    case AppConstants.CATEGORIES.FILTER:
      CategoryFilterListStore.categories = [];
      CategoryFilterListStore.emitChange('change');
      break;

    case AppConstants.CATEGORIES.FILTER_SUCCESS:
      CategoryFilterListStore.categories = payload.categories;
      CategoryFilterListStore.emitChange('change');
      break;

    case AppConstants.CATEGORIES.FILTER_FAIL:
      CategoryFilterListStore.categories = [];
      CategoryFilterListStore.emitChange('change');
      break;

    default:
    // no op
  }
});

module.exports = CategoryFilterListStore;