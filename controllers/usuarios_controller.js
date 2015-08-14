var models = require('../models/models.js');

//GET usuarios/new
exports.new = function (req, res) {
	res.render('usuarios/new.ejs', {erros: []});
};

//POST usuarios
exports.crear = function (req, res, next) {
	var usuarios = models.Usuarios.build({ 
		usuario:  req.body.usuario,
		password: req.body.password,
		email:    req.body.email,
		admin:    "0",
		activo:   "1"
		}
	);

	usuarios.validate().then(function (err) {
			if (err) {
				res.render('usuarios/new.ejs',{erros: err.errors});
			} else {
				usuarios.save()
				.then(function () {res.render('usuarios/novousuario.ejs',{erros:[]});})
				.error(function (err) {res.render('usuarios/new.ejs',{erros: err.errors});})
			}
	}).catch (function (error) {next(error)});
};