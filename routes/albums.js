var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


router.get('/', function (req, res) {
  var collection = global.db.collection('albums');
  collection.find().toArray(function (err, albums) {
  var formattedAlbums = albums.map(function (album) {
      //take an order and return an obect we want it to be
      console.log("this is the album stuff", album);
      return {
        _id: album._id,
        artist: album.artistName,
        name: album.albumName,
        year: album.year
      };
    });
    //console.log(formattedAlbums)
    res.render('templates/albums', {
      albums: formattedAlbums
    });
  });
});

router.get('/addalbum', function (req, res) {
  res.render('templates/addalbum');
});
router.post('/addalbum', function (req, res) {
  var collection = global.db.collection('albums');
  collection.save(req.body, function () {
    res.redirect('/albums');
  });
});
router.post('/delete/:id', function (req, res) {
  var collection = global.db.collection('albums');
  collection.remove({
    _id: ObjectId(req.params.id)
  }, function () {
      res.redirect('/albums')
    });
});

router.get('/search/:artistName', function (req, res) {
 //console.log(req.params.artistName);
  var collection = global.db.collection('albums');
  collection.find({
    artistName: (req.params.artistName),
    _id: ObjectId(req.params.id)

  }, function () {
    $('target').append($('<div><p>' + res.artistName + '</p></div>'))
    res.redirect('/')
  });
});
module.exports = router;
