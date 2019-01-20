var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/ExConverter');

var MongoClient = mongo.MongoClient;

exports.do = function(req) {

  var workoutId = req.params.wid;

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // Fetch the data!
      db.db(config.dbName).collection(config.collections.exercises)
                          .find({workoutId: workoutId})
                          .toArray(function(err, array) {

        db.close();

        if (array == null) {
          success({});
          return;
        }

        var exercises = [];
        for (var i = 0; i < array.length; i++) {
          exercises.push(converter.converter.exTO(array[i]));
        }

        success({exercises: exercises});

      });
    });
  });

}
