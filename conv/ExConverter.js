var moment = require('moment-timezone');

exports.converter = {

  /**
   * Creates the persistent object from a JSON object
   */
  exPO: function(data) {

    if (data.type == 'single') return single(data);
    else if (data.type == 'dropset') return dropset(data);
    else if (data.type == 'striping') return striping(data);
    else if (data.type == 'superset') return superset(data);
    else if (data.type == 'hourglass') return hourglass(data);

    return null;
  },

  /**
   * Creates the transfer object from the PO
   */
  exTO: function(data) {

    if (data == null) return {};

    var to = {};

    if (data.type == 'single') to = single(data);
    else if (data.type == 'dropset') to = dropset(data);
    else if (data.type == 'striping') to = striping(data);
    else if (data.type == 'superset') to = superset(data);
    else if (data.type == 'hourglass') to = hourglass(data);

    to.id = data._id;

    return to;
  },

  /**
   * Updates the exercise with the provided data
   */
  update: function(body) {

    if (body == null) return {$set: {}};

    let data = {};

    if (body.sets != null) data.sets = body.sets;
    if (body.reps != null) data.reps = body.reps;
    if (body.reps1 != null) data.reps1 = body.reps1;
    if (body.reps2 != null) data.reps2 = body.reps2;
    if (body.reps3 != null) data.reps3 = body.reps3;
    if (body.weight != null) data.weight = body.weight;
    if (body.weight1 != null) data.weight1 = body.weight1;
    if (body.weight2 != null) data.weight2 = body.weight2;
    if (body.weight3 != null) data.weight3 = body.weight3;
    if (body.ex1 != null) data.ex1 = body.ex1;
    if (body.ex2 != null) data.ex2 = body.ex2;
    if (body.muscleGroupId != null) data.muscleGroupId = body.muscleGroupId;

    return {$set: data};

  }


}

var single = (data) => {
  return {
      planId: data.planId,
      workoutId: data.workoutId,
      type: data.type,
      benchmarkExerciseId: data.benchmarkExerciseId,
      name: data.name,
      sets: data.sets,
      reps: data.reps,
      weight: data.weight,
      muscleGroupId: data.muscleGroupId
  }
}

var superset = (data) => {
  return {
      planId: data.planId,
      workoutId: data.workoutId,
      type: data.type,
      ex1: {name: data.ex1.name, benchmarkExerciseId: data.ex1.benchmarkExerciseId, sets: data.ex1.sets, reps: data.ex1.reps, weight: data.ex1.weight, muscleGroupId: data.ex1.muscleGroupId},
      ex2: {name: data.ex2.name, benchmarkExerciseId: data.ex2.benchmarkExerciseId, sets: data.ex2.sets, reps: data.ex2.reps, weight: data.ex2.weight, muscleGroupId: data.ex2.muscleGroupId}
  }
}

var dropset = (data) => {
  return {
      planId: data.planId,
      workoutId: data.workoutId,
      type: data.type,
      benchmarkExerciseId: data.benchmarkExerciseId,
      name: data.name,
      sets: data.sets,
      reps1: data.reps1,
      reps2: data.reps2,
      weight1: data.weight1,
      weight2: data.weight2,
      muscleGroupId: data.muscleGroupId
  }
}

var striping = (data) => {
  return {
      planId: data.planId,
      workoutId: data.workoutId,
      type: data.type,
      benchmarkExerciseId: data.benchmarkExerciseId,
      name: data.name,
      sets: data.sets,
      reps1: data.reps1,
      reps2: data.reps2,
      reps3: data.reps3,
      weight1: data.weight1,
      weight2: data.weight2,
      weight3: data.weight3,
      muscleGroupId: data.muscleGroupId
  }
}

var hourglass = (data) => {
  return {
      planId: data.planId,
      workoutId: data.workoutId,
      type: data.type,
      benchmarkExerciseId: data.benchmarkExerciseId,
      name: data.name,
      sets: data.sets,
      weight1: data.weight1,
      weight2: data.weight2,
      weight3: data.weight3,
      muscleGroupId: data.muscleGroupId
  }
}
