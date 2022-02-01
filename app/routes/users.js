var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello world');
});

/* GET individual user. */
router.get('/:id', function(req, res, next) {
  res.send(req.params.id)
});

/* Create user. */
router.post('/', function(req, res, next) {
  
});

/* Update user. */
router.patch('/:id', function(req, res, next) {
  
});

/* Delete user. */
router.delete('/:id', function(req, res, next) {
  
});

module.exports = router;
