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
   	res.render('actos/lista', { acto: acto, erros:[]});
	})
};

//GET actos/acto (datos dun acto concreto)
exports.show = function (req, res) {
	models.Actos.findById(req.params.actoId).then(function(acto){
		res.render('actos/acto', { acto: acto, erros:[]});
	})
};

//GET de novo acto
exports.new = function (req, res) {
	var acto = models.Actos.build(
		{ nome:       "Nome do acto",
		  data:       "Data",
		  hora:       "Hora",
		  lugar:      "Lugar",
		  tipo:       "Tipo de acto ",
		  descricion: "Breve descrición do contido",
		  foto:       "Foto",
		  activo:     "",
		  pasado:     ""
		}
	);
	res.render('actos/novo', {acto: acto, erros:[]});
};

//POST crear novo acto
exports.crear = function (req, res) {
	var acto = models.Actos.build(req.body.acto);
	
	acto.validate().then(function (err) {
		if (err) {
			res.render('actos/novo', {acto: acto, erros: err.errors});
		} else {
				//Garda na base de datos os campos
				acto.save(
					{ fields: 
						[	"nome",
							"data",
							"hora",
							"lugar",
							"tipo",
							"descricion",
							"foto",
							"activo",
							"pasado"
						]
					}
				).then(function () {res.redirect('/actos')})
		}	
		}		
	);
};

