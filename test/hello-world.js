var resolve = require('../lib/dns.js');

console.log('Resolving aaron-miller.me A...');

resolve('aaron-miller.me', 'a', function(err, dnsResponse) {
  var answers = [];

  if (err) throw err;

  answers = dnsResponse.answer.map(function(ans) {
    return ans.rdata;
  });

  console.log('Answer:', answers);
  console.log('Authority:', dnsResponse.authority);
});