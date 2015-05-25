var GA = require('googleanalytics');
var util = require('util');
var conf = require('./config.js');

exports.getResult = function(propertyId, token){
  // start with the first result (start-index==1)
  getPortion(propertyId, token, 1);
}

function getPortion(propertyId, token, startIndex){
  var config = {
      "token": token
  };

  var ga = new GA.GA(config);

  var options = {
      'ids': propertyId,
      'start-date': conf.START_DATE,
      'end-date': conf.END_DATE,
      'dimensions': 'ga:pagePath',
      'metrics': 'ga:pageviews',
      'sort': '-ga:pageviews',
      'max-results': "10000",
      'start-index': startIndex,
      'filters': conf.FILTER
  };

  ga.get(options, function(err, entries) {
    if (err) { return console.log(err); }
    var lastPageViewCount = 10000;
    var index = 0; //entries.length
    var firstMeaningfulRawIndex = 0;
    // for bigger markets, the first raw can be "(other)" meaning that some pagePath were grouped
    if (entries.length > 0 && entries[0].dimensions[0]['ga:pagePath'] == "(other)" ){
      // we should skip it
      firstMeaningfulRawIndex = 1;
    }
     for (index=firstMeaningfulRawIndex; index < entries.length; index++){
      var questionId = entries[index].dimensions[0]['ga:pagePath'].split("/")[2];
      lastPageViewCount = entries[index].metrics[0]['ga:pageviews'];
      var row = util.format("%s, %s", questionId, lastPageViewCount);
      console.log(row);
    }
    //console.log(lastPageViewCount);
    // if we still go tonly pages with higer pageviews number that the threshold
    if (lastPageViewCount >= conf.PV_THRESHOLD){
      // continue iterating
      var newStartingIndex = startIndex + index;
      getPortion(propertyId, token, newStartingIndex);
    }
  });

}
