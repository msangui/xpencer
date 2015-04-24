var AppConstants = require('../constants/appConstants');
var FluxStore = require('./fluxStore');

var _modalData = {};

function _initModal(modalData) {
  _modalData = modalData;
}

const ModalStore = new FluxStore({

  open: false,

  listensTo: [
    {action: AppConstants.MODAL.OPEN, handler: 'show'},
    {action: AppConstants.MODAL.CLOSE, handler: 'hide'}
  ],

  show(){
    this.open = true;
    _initModal(payload.modalData);
  },

  hide() {
    this.open = false;
    _initModal({});
  },

  getState() {
    return {
      open: this.open,
      modalData: _modalData
    }
  }

});

module.exports = ModalStore;