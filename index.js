var GAPI = require('gapitoken');
var conf = require('./config.js');
var gaconnector = require('./ga-connector.js');

main();

// process the arguments and run the logic
function main(){
  var args = process.argv.slice(2);
  if (args.length < 1 || conf.PROFILE_IDS_DICT[args[0]] == null){
    console.log("Please choose one of the trackers keys in the dictionary as an argument on start");
    console.log(JSON.stringify(conf.PROFILE_IDS_DICT));
    return;
  }
  var market = args[0];
  authAndFetchData(market);
}

function authAndFetchData(market){
  var gapi = new GAPI({
      iss: conf.SERVICE_ACCOUNT_EMAIL,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      keyFile: conf.KEY_PEM_RELATIVE_PATH
  }, function(err) {
     if (err) { return console.log(err); }

     gapi.getToken(function(err, token) {
         if (err) { return console.log(err); }
         gaconnector.getResult(conf.PROFILE_IDS_DICT[market], token, 1);
     });
  });
}
