var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  var collection = global.db.collection('findArtist');
  collection.find().toArray(function (err, orders) {

    var formattedArtists = orders.map(function (artist) {
      //take an order and return an obect we want it to be
      console.log(complete)
      return {
        _id: artist._id,
        name: artist.name,
        genre: artist.style,
        bio: artist.bio,
        language: artist.language,
        nationality: artist.nationality,
        members: artist.members,
        wiki: artist.wiki
      };
    });
    res.render('templates/addartist');
  });
});

router.get('/addartist', function (req, res) {
  res.render('templates/addartist');
});
router.post('/addartist', function (req, res) {
  var collection = global.db.collection('artists');
  collection.save(req.body, function () {
    res.redirect('/artists')
  });

});
router.post('/order/:id/complete', function (req, res) {
  var collection = global.db.collection('artists');
  collection.update({
      _id: ObjectId(req.params.id)
    }, {
      $set: {
        complete: true
      }
    },
    function () {
      res.redirect('/artists')
    });
});

module.exports = router;
