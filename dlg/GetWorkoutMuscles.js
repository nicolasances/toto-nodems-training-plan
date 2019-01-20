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
      var muscles = [];

      // The muscles that have been added as a concatenation of 'muscle;muscle;...'
      var addedMuscles = '';

      var exercises = exercisesResp.exercises;

      // Function to add a muscle to the list of impacted muscles
      var addMuscle = function(m) {

        if (m == null) return;

        // If the muscle hasn't been added, add it
        if (addedMuscles.indexOf(m) == -1) {

          // Add to the array
          muscles.push(m);

          // Add to the "added list"
          addedMuscles += ';' + m;
        }
      }

      // Iterate to find the muscles
      for (var i = 0; i < exercises.length; i++) {

        let ex = exercises[i];

        // Based on the type of exercise, get the muscle
        if (ex.type == 'single') addMuscle(ex.muscleGroupId)
        else if (ex.type == 'superset') {
          addMuscle(ex.ex1.muscleGroupId);
          addMuscle(ex.ex2.muscleGroupId);
        }
        else if (ex.type == 'dropset') addMuscle(ex.muscleGroupId);
        else if (ex.type == 'striping') addMuscle(ex.muscleGroupId);
        else if (ex.type == 'hourglass') addMuscle(ex.muscleGroupId);

      }

      // Return the list of muscles
      success({muscles: muscles});

    })

  });

}
