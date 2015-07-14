var models = require('../models/models.js');

//GET /actos/:actoId/comentarios/new
exports.new = function (req, res) {
	res.render('comentarios/new.ejs', {actoid: req.params.actoId, erros: []});
};

//POST /actos/:actoId/comentarios
exports.crear = function (req, res) {
	var comentario = models.Comentarios.build(
		//Atributos da táboa de comentarios
		{ texto: req.body.comentario.texto,
		  ActoId: req.params.actoId
		}
	);
	
	comentario.validate().then(
		function (err) {
			if (err) {
				res.render('comentarios/new.ejs',{comentario: comentario, actoid: req.params.actoId, erros: err.errors});
			} else {
				comentario.save().then(function () {res.redirect('/actos/'+req.params.actoId)})
			}
		}
	).catch (function (error) {next(error)});
};