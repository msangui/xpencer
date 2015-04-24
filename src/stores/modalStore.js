var merge = require('lodash/object/merge');
var AppDispatcher = require('../dispatchers/appDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;

var _modalData = {};


function _initModal(modalData) {
  _modalData = modalData;
}

const ModalStore = merge({}, EventEmitter.prototype, {

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
      modalData: _modalData
    }
  }

});

ModalStore.dispatchToken = AppDispatcher.register(function(actionPayload) {

  var {action, payload} = actionPayload;

  switch(action) {
    case AppConstants.MODAL.OPEN:
      ModalStore.open = true;
      _initModal(payload.modalData);
      ModalStore.emitChange();
      break;

    case AppConstants.MODAL.CLOSE:
      ModalStore.open = false;
      _initModal({});
      ModalStore.emitChange();
      break;
    default:
    // no op
  }
});

module.exports = ModalStore;