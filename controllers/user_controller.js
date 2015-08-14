//Probas: o usuario e password están nesta primeira variable.
//var users = {
//	admin: {id:1, username:"admin", password:"1234"},
//	pepe: {id:2, username:"pepe", password:"5678"}
//};

//Comproba se o usuario e password é correcto
//exports.autenticar = function (login, password, callback) {
//	if (users[login]) {
//		if (password === users[login].password) {
//			callback(null, users[login]);
//		} else {
//			callback(new Error('Password erróneo!'));
//		}
//	}else {
//		callback(new Error('Non existe este usuario'));
//	}
//};

//Modelo de acceso sobre base de datos
var models = require('../models/models.js');

//Comproba se o usuario e password é correcto
exports.autenticar = function (login, password, callback) {
	models.Usuarios.findOne({where: {usuario: login}}).then(function (usu) {
   	if (usu) {
   		if (password === usu.password) {
				callback(null, usu);
			} else {
				callback(new Error('Contrasinal erróneo!'));
			}
   	}else {
   		callback(new Error('Non existe este usuario'));
   	}
	})
};