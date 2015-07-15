var express = require('express');
var router = express.Router();

var cculturalController   = require('../controllers/ccultural_controller');
var comentariosController = require('../controllers/comentarios_controller');
var sessionController     = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Compostela Cultural', erros:[]});
});

//Autoload de comandos con :actoId
router.param('actoId',              cculturalController.load);

//Rutas de sesión
router.get('/login',  sessionController.new);     //Formulario de login
router.post('/login', sessionController.create);  //Crear nova sesión
router.get('/logout', sessionController.destroy); //Acabar a sesión

//GET lista de actos
router.get('/actos',                cculturalController.index);

//GET un acto concreto
router.get('/actos/:actoId(\\d+)',  cculturalController.show);

//Get novo acto
router.get('/actos/new',            sessionController.loginRequired, cculturalController.new);
router.post('/actos/crear',         sessionController.loginRequired,cculturalController.crear);

//GET editar acto
router.get('/actos/:actoId(\\d+)/edit',  sessionController.loginRequired,cculturalController.edit);

//PUT actualizar acto
router.put('/actos/:actoId(\\d+)',  sessionController.loginRequired,cculturalController.update);

//DELETE borrar acto
router.delete('/actos/:actoId(\\d+)',  sessionController.loginRequired,cculturalController.destroy);

//Creación de comentarios
router.get('/actos/:actoId(\\d+)/comentarios/new',  comentariosController.new);
router.post('/actos/:actoId(\\d+)/comentarios/',    comentariosController.crear);

module.exports = router;
