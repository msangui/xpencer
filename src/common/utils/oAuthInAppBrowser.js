var OAuthInAppBrowser = {
    login: function (url, resolveToken, rejectToken) {

      var inAppBrowser = window.open(
          url,
          '_blank',
          'location=no,clearcache=yes,clearsessioncache=yes,closebuttoncaption=Cancel,toolbar=yes'
        ),
        browserInterval,
        tokenFound = false;

      // handlers
      function checkToken(event) {
        var url = event.url,
          queryParams,
          oAuthToken;

        // detect url
        if (!url) {
          if (event.srcElement) {
            url = event.srcElement.URL;
          } else if (event.location) {
            url = event.location.href;
          }
        }

        if (url.indexOf('access_token') > 0) {
          // find access_token
          queryParams = url.split('#')[1];
          queryParams.split('&').forEach(function (queryParam) {
            queryParam = queryParam.split('=');
            if (queryParam[0] === 'access_token') {
              oAuthToken = queryParam[1];
            }
          });
          if (oAuthToken) {
            tokenFound = true;
            // clean & close inAppBrowser
            inAppBrowser.removeEventListener('close', rejectToken);
            inAppBrowser.removeEventListener('exit', rejectToken);

            resolveToken(oAuthToken);
            inAppBrowser.close();

          }
        }
      }

      // add listeners
      if (window.cordova) {
        // oauth events
        inAppBrowser.addEventListener('loadstart', checkToken);
        inAppBrowser.addEventListener('loaderror', checkToken);
        inAppBrowser.addEventListener('exit', rejectToken);
      } else {
        inAppBrowser.addEventListener('load', checkToken);
        // browser hack for development
        browserInterval = setInterval(function () {
          if (inAppBrowser.location.href) {
            checkToken(inAppBrowser);
          } else {
            clearInterval(browserInterval);
            if (!tokenFound) {
              rejectToken();
            }
          }
        }, 2000);
      }


      return inAppBrowser;
    }
  };

module.exports = OAuthInAppBrowser;
