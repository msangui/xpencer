var AppConstants = require('../constants/appConstants');
var AppDispatcher = require('../dispatchers/appDispatcher');
var LoginAPI = require('../api/loginApi');
var GoogleDriveAPI = require('../api/googleDriveApi');

var LoginActions = {

  login() {
    LoginAPI.login().then(function (accessToken) {
      GoogleDriveAPI.files(accessToken);
      AppDispatcher.dispatch({
        action: AppConstants.LOGIN.LOGIN_SUCCESS
      });
    }, function () {
      AppDispatcher.dispatch({
        action: AppConstants.LOGIN.LOGIN_FAIL
      });
    });
  }

};

module.exports = LoginActions;