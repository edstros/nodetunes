var mongo = require('mongodb').MongoClient;

var url = process.env.MONGODB_URL || 'mongodb://localhost:27017'/*'mongodb://4FilFmSDiw:u5AfzHfcocKnodWhx4euKcFfY@ds047800.mongolab.com:51738/47800/'*/;
var dbName = 'nodetunes';

if (!global.db) {
  mongo.connect(url + '/' + dbName, function (err, db) {
      global.db = db;
    });
  }

