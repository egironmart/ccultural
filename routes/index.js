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
//Primeiro comproba se os actos son actuais. Se están pasados (días anteriores), pon o indicador de pasado a 1
router.get('/actos',                cculturalController.actualiza, cculturalController.index);

//GET lista actos xa pasados
router.get('/pasados',              cculturalController.pasados);

//GET actos para hoxe
router.get('/hoxe',                cculturalController.hoxe);

//GET un acto concreto
router.get('/actos/:actoId(\\d+)',  cculturalController.show);

//Get novo acto
router.get('/actos/new',            sessionController.loginRequired, cculturalController.new);
router.post('/actos/crear',         sessionController.loginRequired, cculturalController.crear);

//GET editar acto
router.get('/actos/:actoId(\\d+)/edit',  sessionController.loginRequired,cculturalController.edit);

//PUT actualizar acto
router.put('/actos/:actoId(\\d+)',  sessionController.loginRequired,cculturalController.update);

//DELETE borrar acto
router.delete('/actos/:actoId(\\d+)',  sessionController.loginRequired,cculturalController.destroy);

//Creación de comentarios
router.get('/actos/:actoId(\\d+)/comentarios/new',  sessionController.loginRequired, comentariosController.new);
router.post('/actos/:actoId(\\d+)/comentarios/',    sessionController.loginRequired, comentariosController.crear);

module.exports = router;
