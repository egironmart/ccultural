var models = require('../models/models.js');

//GET usuarios/new
exports.new = function (req, res) {
	res.render('usuarios/new.ejs', {erros: []});
};

//POST usuarios
exports.crear = function (req, res, next) {
	var usuarios = models.Usuarios.build(
		//Atributos da táboa de usuarios
		{ usuario:  req.body.usuario,
		  password: req.body.password,
		  email:    req.body.email,
		  admin:    "0"
		}
	);
	
	usuarios.validate().then(
		function (err) {
			if (err) {
				res.render('usuarios/new.ejs',{erros: err.errors});
			} else {

				models.Usuarios.findAll({where: {usuario: usuarios.usuario}}).then(function (usu) {
					if (!usu) {
					usuarios.save()
						.then(function () {res.render('usuarios/novousuario.ejs',{erros:[]})})
						.error(function (err) {res.render('usuarios/new.ejs',{erros: err.errors});});
					} else {
						new ValidationError("Eeste usuario xa existe");
						res.render('usuarios/new.ejs',{erros: err.errors});
					}
				})	

			}
		}
	).catch (function (error) {next(error)});
};