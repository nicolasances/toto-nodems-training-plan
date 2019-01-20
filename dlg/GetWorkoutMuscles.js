var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/WorkoutConverter');
var getExercises = require('./GetExercises');

var MongoClient = mongo.MongoClient;

exports.do = function(req) {

  return new Promise(function(success, failure) {

    if (req == null || req.params == null || req.params.wid == null) {
      // Fail
      failure({message: 'No Workout ID passed as path param "wid". This parameter is mandatory and must be passed as part of the API path.'});

      // Return
      return;
    }

    // Retrieve the list of exercises of the specified workout
    getExercises.do(req).then((exercisesResp) => {

      // Are there exercises?
      if (exercisesResp == null || exercisesResp.exercises == null) {success({muscles: []}); return;}

      // The muscles impacted by the workout
      let muscles = [];

      // The muscles that have been added as a concatenation of 'muscle;muscle;...'
      let addedMuscles = '';

      let exercises = exercisesResp.exercises;

      // Iterate to find the muscles
      for (var i = 0; i < exercises.length; i++) {

        // If old data, the muscle group is not there
        if (exercises[i].muscleGroupId == null) continue;

        // If the muscle hasn't been added, add it
        if (!addedMuscles.contains(exercises[i].muscleGroupId)) {

          // Add to the array
          muscles.push(exercises[i].muscleGroupId);

          // Add to the "added list"
          addedMuscles += ';' + exercises[i].muscleGroupId;
        }
      }

      // Return the list of muscles
      success({muscles: muscles});

    })

  });

}
