var AppConstants = require('../constants/appConstants');
var AppDispatcher = require('../dispatchers/appDispatcher');

var LayoutActions = {

  setHeader(headerData) {
    AppDispatcher.dispatch({
      action: AppConstants.LAYOUT.SET_HEADER,
      payload: {
        headerData: headerData
      }
    });
  }

};

module.exports = LayoutActions;