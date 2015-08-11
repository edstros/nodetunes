//change artists to albums

var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/', function (req, res) {
  var collection = global.db.collection('albums');
  collection.find().toArray(function (err, albums) {
    var formattedAlbums = albums.map(function (album) {
      //take an order and return an obect we want it to be
      console.log("this is the artist stuff", album);
      return {
        _id: album._id,
        name: album.albumName,
        genre: album.genre,
        bio: album.bio,
        language: album.language,
        nationality: album.nationality,
        members: album.members,
        wiki: album.wiki
      };
    });
    console.log(formattedAlbums)
    res.render('templates/artists', {
      albums: formattedArtists
    });
  });
});

router.get('/albums/addalbum', function (req, res) {
  console.log('res', res);
  res.render('templates/addalbum');
});
router.post('/albums/addalbum', function (req, res) {
  var collection = global.db.collection('albums');
  collection.save(req.body, function () {
    res.redirect('/albums');
  });
});
router.post('/albums/:id/complete', function (req, res) {
  var collection = global.db.collection('albums');
  collection.update({
      _id: ObjectId(req.params.id)
    }, {
      $set: {
        complete: true
      }
    },
    function () {
      res.redirect('/albums')
    });
});

module.exports = router;
