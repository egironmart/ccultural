var express = require('express');
var router = express.Router();

var cculturalController = require('../controllers/ccultural_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Compostela Cultural', erros:[]});
});

//Autoload de comandos con :actoId
router.param('actoId',              cculturalController.load);

//GET lista de actos
router.get('/actos',                cculturalController.index);

//GET un acto concreto
router.get('/actos/:actoId(\\d+)',  cculturalController.show);

//Get novo acto
router.get('/actos/new',            cculturalController.new);
router.post('/actos/crear',         cculturalController.crear);

//GET editar acto
router.get('/actos/:actoId(\\d+)/edit',  cculturalController.edit);

//PUT actualizar acto
router.put('/actos/:actoId(\\d+)',  cculturalController.update);

//DELETE borrar acto
router.delete('/actos/:actoId(\\d+)',  cculturalController.destroy);

module.exports = router;
