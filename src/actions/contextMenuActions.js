var AppConstants = require('../constants/appConstants');
var AppDispatcher = require('../dispatchers/appDispatcher');

var ContextMenuActions = {

  open(contextMenuData) {
    AppDispatcher.dispatch({
      action: AppConstants.CONTEXT_MENU.OPEN,
      payload: {
        contextMenuData: contextMenuData
      }
    });
  },

  close() {
    // hide notification
    AppDispatcher.dispatch({
      action: AppConstants.CONTEXT_MENU.CLOSE
    });
  }
};

module.exports = ContextMenuActions;