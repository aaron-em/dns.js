var request = require('visionmedia/superagent')
  , config = {}
  , resolve;

config = {
  api: 'http://api.statdns.com/'
};

resolve = function(host, type, cb) {
  request
    .get(config.api + host + '/' + type)
    .end(function(err, res) {
      var customErr = new Error()
        , parsedBody;

      if (err && err.code === 503) {
        customErr.code = 'NXDOMAIN';
        customErr.message = 'No record found';
        cb(customErr);
      } else if (err) {
        cb(err);
      } else {
        try {
          parsedBody = JSON.parse(res);
          cb(undefined, parsedBody);
        } catch (parseErr) {
          customErr.message = 'Invalid JSON from API: ' + parseErr.message;
          cb(customErr);
        }
      }
    });
};

module.exports = resolve;