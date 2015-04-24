var http = require('q-io/http');

var GoogleDriveAPI = {
  files(accessToken) {
    return http.request({
      url: 'https://www.googleapis.com/drive/v2/files?access_token=' + accessToken
    });
  }
};

module.exports = GoogleDriveAPI;