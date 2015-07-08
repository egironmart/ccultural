var models = require('../models/models.js');

//Autoload - factoriza o código se a ruta inclúe :actoId
exports.load = function (req, res, next, actoId) {
	models.Actos.findById(actoId).then(
		function (acto) {
			if (acto) {
				req.acto = acto;
				next();
			} else {next (new Error('Non existe este acto: ' + actoId));}
		}
	).catch (function (error) {next(error);});
};

//GET actos (lista de actos)
exports.index = function (req, res) {
	models.Actos.findAll({where: {pasado: false}}).then(function (acto) {
   	res.render('actos/lista', { acto: acto});
	})
};

//GET actos/acto (datos dun acto concreto)
exports.show = function (req, res) {
	models.Actos.findById(req.params.actoId).then(function(acto){
		res.render('actos/acto', { acto: acto});
	})
};
