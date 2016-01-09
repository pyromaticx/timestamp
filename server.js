var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
// currently will pull a matching date out of
// a string of any length, or the first 13 digits
// of any consecutive string of numbers.

var dateReg = /(january|february|march|april|may|june?|july|august|september|october|november|december)\s(\d\d?).+?(\d\d\d\d)/;
var unixReg = /[0-9]{13}/;

// options for returned natural date format in toLocaleDateString method.
var options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
// returns a string formatted date based on the optoins object passed abouve
function natString(uxTime) {
  return uxTime.toLocaleDateString('en-US', options);
}

app.set('port', port);
app.use(express.static(__dirname + '/public'));

app.get('/:input', function(req, res) {
  // object that will eventually be returned
  var response = {};

  var input = req.params.input.toLowerCase();

  var natDate = dateReg.exec(input);
  var unixDate = unixReg.exec(input);


  if (natDate !== null) {
    var month = natDate[1];
    var day = natDate[2];
    var year = natDate[3];
    dateString = natDate[1] + ' ' + natDate[2] + ' ' + natDate[3]
    // if a date is entered, get its Unix time in millis
    var parseUnix = Date.parse(dateString);
    // create a date object from the milli value
    var _date = new Date(parseUnix);
    response = {
      unix: parseUnix,
      natural: natString(_date)
    };
    res.send(JSON.stringify(response));

  } else if(unixDate !== null) {
    // format unix time (string) into a number and create a date object
      var date = new Date(Number(unixDate[0]));
      response = {
        unix: unixDate[0],
        natural: natString(date)
      };

    res.send(JSON.stringify(response));

  } else {
    res.send("{'Invalid Date or Timestamp'}");
  }

});
app.listen(port);
