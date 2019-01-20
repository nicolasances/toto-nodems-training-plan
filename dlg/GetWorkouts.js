var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/WorkoutConverter');

var MongoClient = mongo.MongoClient;

exports.do = function(req) {

  var planId = req.params.pid;

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // Fetch the data!
      db.db(config.dbName).collection(config.collections.workouts)
                          .find({planId: planId})
                          .toArray(function(err, array) {

        db.close();

        if (array == null) {
          success({});
          return;
        }

        var workouts = [];
        for (var i = 0; i < array.length; i++) {
          workouts.push(converter.converter.workoutTO(array[i]));
        }

        success({workouts: workouts});

      });
    });
  });

}
