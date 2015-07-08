var express = require('express');
var router = express.Router();

var cculturalController = require('../controllers/ccultural_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Compostela Cultural' });
});

//Autoload de comandos con :actoId
router.param('actoId', cculturalController.load);

//GET lista de actos
router.get('/actos',               cculturalController.index);

//GET un acto concreto
router.get('/actos/:actoId(\\d+)', cculturalController.show);

module.exports = router;
