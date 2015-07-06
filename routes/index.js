var express = require('express');
var router = express.Router();

var cculturalController = require('../controllers/ccultural_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Compostela Cultural' });
});

router.get('/actos/acto', cculturalController.acto);

module.exports = router;
