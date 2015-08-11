//npm requires
var express = require('express');
var bodyParser = require('body-parser');
//route requires

var artists = require('./routes/artists');
var albums = require('./routes/albums');
var songs = require('./routes/songs');

//variables
var app = express(); //this was before the app.get files were moved to index.js


/*
if (process.env.NODE_ENV !== 'production') {
  require('./lib/secrets');
}
*/

require('./lib/mongodb');

//settings to express
app.set('view engine', 'ejs');
app.set('case sensitive routing', true); //just what it says
//global variable; all of the templates have access to it
app.locals.title = 'NodeTunes';


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ //parses form data
  extended: false
}))

//routes --  one way to do this
//require('./routes/index');

app.use('/', artists);
app.use('/albums', albums);
app.use('/songs', songs);

app.use(function (req, res) {
  res.status(403); //400s before the 500s
  res.send('Unauthorized!');
});
//put error handling at the end; order is important
//if it's at the top, everything will be unauthorized
app.use(function (err, req, res, next) {
  //pass 4 arguments to create an error handling middleware
  console.log('OH NO! THERE WAS AN ERROR', err.stack);
  res.status(500).send('My Bad');
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
