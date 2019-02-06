var express = require('express');
var Promise = require('promise');
var Controller = require('toto-api-controller');

var postPlan = require('./dlg/PostPlan');
var getPlans = require('./dlg/GetPlans');
var getPlan = require('./dlg/GetPlan');

var postWorkout = require('./dlg/PostWorkout');
var getWorkouts = require('./dlg/GetWorkouts');
var getWorkout = require('./dlg/GetWorkout');
var getWorkoutMuscles = require('./dlg/GetWorkoutMuscles');

var postExercise = require('./dlg/PostExercise');
var getExercises = require('./dlg/GetExercises');
var getExercise = require('./dlg/GetExercise');

var api = new Controller('training-plan');

api.path('POST', '/plans', postPlan);
api.path('GET', '/plans', getPlans);

api.path('GET', '/plans/:pid', getPlan);

api.path('POST', '/plans/:pid/workouts', postWorkout);
api.path('GET', '/plans/:pid/workouts', getWorkouts);

api.path('GET', '/plans/:pid/workouts/:wid', getWorkout);

// Retrieves the list of muscles that are impacted by a specified workout
api.path('GET', '/plans/:pid/workouts/:wid/muscles', getWorkoutMuscles);

api.path('POST', '/plans/:pid/workouts/:wid/exercises', postExercise);
api.path('GET', '/plans/:pid/workouts/:wid/exercises', getExercises);
api.path('GET', '/plans/:pid/workouts/:wid/exercises/:eid', getExercise);

api.listen();
