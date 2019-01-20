var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/WorkoutConverter');

var MongoClient = mongo.MongoClient;

exports.do = function(req) {

  var id = req.params.wid;

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // Fetch the data!
      db.db(config.dbName).collection(config.collections.workouts)
                          .findOne({_id: new mongo.ObjectId(id)}, function(err, doc) {

        db.close();

        success(converter.converter.workoutTO(doc));

      });
    });
  });

}
