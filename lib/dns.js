var request = require('superagent')
  , config = {}
  , resolve;

config = {
  api: 'http://api.statdns.com/'
};

resolve = function(host, type, cb) {
  request
    .get(config.api + host + '/' + type)
    .end(function(err, res) {
      var customErr = new Error();

      if (err && err.code === 503) {
        customErr.code = 'NXDOMAIN';
        customErr.message = 'No record found';
        cb(customErr);
      } else if (err) {
        cb(err);
      } else {
        cb(undefined, res.body);
      }
    });
};

module.exports = resolve;