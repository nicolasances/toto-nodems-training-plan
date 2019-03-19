var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/ExConverter');

var MongoClient = mongo.MongoClient;

exports.do = function(req) {

  var id = req.params.eid;
  var data = req.body;

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // 1. Convert the data
      let update = converter.converter.update(data);

      // 2. Insert the data
      db.db(config.dbName).collection(config.collections.exercises)
                          .updateOne({_id: new mongo.ObjectId(id)}, update, function(err, res) {

        db.close();

        success({});

      });
    });
  });

}
