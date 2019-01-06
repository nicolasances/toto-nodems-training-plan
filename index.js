var express = require('express');
var Promise = require('promise');
var bodyParser = require("body-parser");
var logger = require('toto-apimon-events');

var postPlan = require('./dlg/PostPlan');
var getPlans = require('./dlg/GetPlans');
var getPlan = require('./dlg/GetPlan');

var postWorkout = require('./dlg/PostWorkout');
var getWorkouts = require('./dlg/GetWorkouts');
var getWorkout = require('./dlg/GetWorkout');

var apiName = 'training-plan';

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  next();
});
app.use(bodyParser.json());

/***************
 * APIS
 ***************/
app.get('/', function(req, res) {res.send({api: apiName, status: 'running'});});

app.post('/plans', function(req, res) {logger.apiCalled(apiName, '/plans', 'POST', req.query, req.params, req.body); postPlans.do(req.body).then(function(result) {res.send(result);});});
app.get('/plans', function(req, res) {logger.apiCalled(apiName, '/plans', 'GET', req.query, req.params, req.body); getPlans.do(req.query).then(function(result) {res.send(result);});});

app.get('/plans/:id', function(req, res) {logger.apiCalled(apiName, '/plans/{id}', 'GET', req.query, req.params, req.body); getPlan.do(req.params.id).then(function(result) {res.send(result);});});

app.post('/plans/:id/workouts', function(req, res) {logger.apiCalled(apiName, '/plans/:id/workouts', 'POST', req.query, req.params, req.body); postWorkout.do(req.params.id, req.body).then(function(result) {res.send(result);});});
app.get('/plans/:id/workouts', function(req, res) {logger.apiCalled(apiName, '/plans/:id/workouts', 'GET', req.query, req.params, req.body); getWorkouts.do(req.params.id, req.query).then(function(result) {res.send(result);});});

app.get('/plans/:id/workouts/:wid', function(req, res) {logger.apiCalled(apiName, '/plans/:id/workouts/:wid', 'GET', req.query, req.params, req.body); getWorkout.do(req.params.id, req.params.wid).then(function(result) {res.send(result);});});

/***********
 * START
 **********/
app.listen(8080, function() {
  console.log('Training Plan Microservice up and running');
});
