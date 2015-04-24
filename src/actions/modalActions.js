var AppConstants = require('../constants/appConstants');
var AppDispatcher = require('../dispatchers/appDispatcher');

var ModalActions = {

  open(modalData) {
    AppDispatcher.dispatch({
      action: AppConstants.MODAL.OPEN,
      payload: {
        modalData: modalData
      }
    });
  },

  close() {
    // hide notification
    AppDispatcher.dispatch({
      action: AppConstants.MODAL.CLOSE
    });
  }
};

module.exports = ModalActions;