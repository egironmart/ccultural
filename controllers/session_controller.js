//Autorización para accións restrinxidas
exports.loginRequired = function (req, res, next) {
	if (req.session.user) {
		next();
	}else {
		res.redirect('/login');
	}
};

//GET /login - Formulario de login
exports.new = function (req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};
	
	res.render('sessions/new', {erros: errors});
};

//POST /login - Crear a sesión
exports.create = function (req, res) {
	var login = req.body.login;
	var password = req.body.password;
	
	var userController = require('./user_controller');
	userController.autenticar(login, password, function (error, user) {
		//Se hai algun erro no inicio da sesión
		if (error) {
			req.session.errors = [{"message": 'Erro no inicio de sesión: '+error}];
			res.redirect('/login');
			return;
		}
		
		//Se non hai erros, creamos req.session.user con id de sesión e nome de usuario
		req.session.user = {id: user.id, username: user.username};
		//res.redirect(req.session.redir.toString()); //Redirixe ao sitio onde estaba cando inicia a sesión
		res.redirect('/#');
	});
};

//DELETE /logout - Finaliza a sesión
exports.destroy = function (req, res) {
	delete req.session.user;
	//res.redirect(req.session.redir.toString()); //Redirixe ao sitio onde estaba
	res.redirect('/#');
};
