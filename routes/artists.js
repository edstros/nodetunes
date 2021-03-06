var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;


router.get('/', function (req, res) {
  var collection = global.db.collection('artists');
  collection.find().toArray(function (err, artists) {
    var formattedArtists = artists.map(function (artist) {
      //take an order and return an obect we want it to be
     console.log("this is the artist stuff", artists);
      return {
        _id: artist._id,
        name: artist.artistName,
        genre: artist.genre,
        bio: artist.bio,
        language: artist.language,
        nationality: artist.nationality,
        members: artist.members,
        wiki: artist.wiki
      };
    });
    // console.log("formatted artists", formattedArtists);
    res.render('templates/artists', {
      artists: formattedArtists
    });
  });
});

router.get('/artists/addartist', function (req, res) {
  //console.log('res', res);
  res.render('templates/addartist');
});
router.post('/artists/addartist', function (req, res) {
  var collection = global.db.collection('artists');
  collection.save(req.body, function () {
    res.redirect('/');
  });
});

router.post('/delete/:id', function (req, res) {
  console.log(req.params.id);
  var collection = global.db.collection('artists');
  collection.remove({
    _id: ObjectId(req.params.id)
  }, function () {
    res.redirect('/artists')
  });
});




module.exports = router;
