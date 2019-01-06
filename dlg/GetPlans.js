var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/PlanConverter');

var MongoClient = mongo.MongoClient;

exports.do = function(filters) {

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      // Filter definition
      let filter = {};
      let options = {};

      // Sorting
      options.sort = [];

      if (filters.sort == 'start') options.sort.push(['start', filters.sortDir == 'desc' ? 'descending' : 'asc']);

      // Max results
      if (filters.maxResults != null) options.limit = parseInt(filters.maxResults);

      // Fetch the data!
      db.db(config.dbName).collection(config.collections.plans)
                          .find(filter, options)
                          .toArray(function(err, array) {

        db.close();

        if (array == null) {
          success({});
          return;
        }

        var plans = [];
        for (var i = 0; i < array.length; i++) {
          plans.push(converter.converter.planTO(array[i]));
        }

        success({plans: plans});

      });
    });
  });

}
