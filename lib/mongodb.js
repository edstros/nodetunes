var mongo = require('mongodb').MongoClient;

var url = process.env.MONGODB_URL || 'mongodb://localhost:27017';
var dbName = 'nodetunes';

if (!global.db) {
  mongo.connect(url + '/' + dbName, function (err, db) {
      global.db = db;
    });
  }

