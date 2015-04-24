var AppConstants = require('../constants/appConstants');
var Q = require('q');
var OAuthInAppBrowser = require('../common/utils/oAuthInAppBrowser');

var LoginAPI = {
  login: function() {
    var oAuthUri,
      params = {
        scope: 'email profile https://www.googleapis.com/auth/drive',
        state: '/profile',
        redirect_uri: 'http://localhost:8000/',
        response_type: 'token',
        client_id: AppConstants.GOOGLE.CLIENT_ID
      },
      queryParams = [],
      deferred = Q.defer();

    // build oAuth URI
    for (var key in params) {
      queryParams.push(key + '=' + encodeURIComponent(params[key]));
    }

    oAuthUri = AppConstants.GOOGLE.LOGIN_URI + '?' + queryParams.join('&');

    function onSuccess(oAuthToken) {
      deferred.resolve(oAuthToken);
    }

    function onError() {
      deferred.reject();
    }

    OAuthInAppBrowser.login(oAuthUri, onSuccess, onError);

    return deferred.promise;

  }
};

module.exports = LoginAPI;