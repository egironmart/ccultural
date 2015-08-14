var models = require('../models/models.js');

//Autoload - factoriza o código se a ruta inclúe :actoId
exports.load = function (req, res, next, actoId) {
	models.Actos.findById(actoId, {include:[{model: models.Comentarios}]})
	   .then(
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
	var cab = "Actos programados";
	models.Actos.findAll({where: {pasado: false}, order:['data','hora']}).then(function (acto) {
   	res.render('actos/lista', { acto: acto, pasado: "0", cabeceira: cab, erros:[]});
	})
};

//GET pasados (lista de actos pasados)
exports.pasados = function (req, res) {
	var cab = "Actos xa pasados";
	models.Actos.findAll({where: {pasado: true}, order:['data','hora']}).then(function (acto) {
   	res.render('actos/lista', { acto: acto, pasado: "1", cabeceira: cab, erros:[]});
	})
};

//GET hoxe (lista de actos para o día)
exports.hoxe = function (req, res) {
	var cab = "Actos no día de hoxe";
	var f = new Date();
	var dia = f.getDate();
	var mes = f.getMonth()+1
	var ano = f.getFullYear();
	
	if (dia < 10) {dia = "0"+ dia};
	if (mes < 10) {mes = "0"+ mes};

   var dataAct = (ano+mes+dia).toString();
	models.Actos.findAll({where: {data: dataAct}}).then(function (acto) {
   	res.render('actos/lista', { acto: acto, pasado: "0", cabeceira: cab, erros:[]});
	})
};

//GET actos/acto (datos dun acto concreto)
exports.show = function (req, res) {
	var nomes = [];
	models.Actos.findById(req.params.actoId, {include:[{model: models.Comentarios}]}).then(function(acto){
		for (var index in acto.Comentarios) {
			models.Usuarios.findById(acto.Comentarios[index].UsuarioId).then(function (usu) {
				nomes.push(usu.usuario);
			})
		}
console.log(nomes.length);
		for (var i in acto.Comentarios) {
			console.log(i + " " + nomes[i]);
			console.log(acto.Comentarios[i].texto);
		}
		res.render('actos/acto', { acto: acto, erros:[]});
	})
};

//GET de novo acto
exports.new = function (req, res) {
	var acto = models.Actos.build(
		{ nome:       "",
		  data:       "",
		  hora:       "",
		  lugar:      "",
		  tipo:       "",
		  descricion: "",
		  foto:       "",
		  activo:     "",
		  pasado:     ""
		}
	);
	res.render('actos/novo', {acto: acto, erros:[]});
};

//POST crear novo acto
exports.crear = function (req, res) {
	var acto = models.Actos.build(req.body.acto);
	
	var dia = req.body.acto.data.substr(0,2);
	var mes = req.body.acto.data.substr(3,2);
	var ano = req.body.acto.data.substr(6,4);
	
	acto.data = (ano+mes+dia).toString();
	
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

//GET /actos/:actoId/edit Editar un acto xa gardado
exports.edit = function (req, res) {
	var acto = req.acto; //Autoload da instancia
	
	res.render('actos/edit', {acto: acto, erros:[]});
};

//PUT /actos/:id Actualiza as modificacións do acto
exports.update = function (req, res) {
	req.acto.nome =       req.body.acto.nome;
//	req.acto.data =       req.body.acto.data;
	req.acto.hora =       req.body.acto.hora;
	req.acto.lugar =      req.body.acto.lugar;
	req.acto.tipo =       req.body.acto.tipo;
	req.acto.descricion = req.body.acto.descricion;
	req.acto.foto =       req.body.acto.foto;
	req.acto.activo =     req.body.acto.activo;
	req.acto.pasado =     req.body.acto.pasado;
	
	var dia = req.body.acto.data.substr(0,2);
	var mes = req.body.acto.data.substr(3,2);
	var ano = req.body.acto.data.substr(6,4);
	
	req.acto.data = (ano+mes+dia).toString();
	
	req.acto.validate().then(
		function (err) {
			if (err) {
				res.render('actos/edit', {acto: req.acto, erros: err.errors});
			} else {
				req.acto
				.save(
					{fields: 
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
				)
				.then(function () {res.redirect('/actos');});
			}
		}
	);
};

//DELETE /actos/:id
exports.destroy = function (req, res) {
	req.acto.destroy().then(
		function () {
			res.redirect('/actos');
		}
	).catch (function (error) {next(error)});
};

//Actualiza datas se xa pasou o acto
//Se está pasado, pon o indicador pasado = 1.
exports.actualiza = function(req, res, next){
	var f = new Date();
	var dia = f.getDate();
	var mes = f.getMonth()+1
	var ano = f.getFullYear();
	
	if (dia < 10) {dia = "0"+ dia};
	if (mes < 10) {mes = "0"+ mes};
	var dataAct = (ano+mes+dia).toString(); //Convirte a formato internacional: yyyymmaa

	models.Actos.findAll({where: {pasado: false}}).then(function (acto) {
		for (i=0; i < acto.length; i++) {
			if (dataAct > acto[i].data) {
				acto[i].pasado = "1";
				acto[i].save({fields: ["pasado"]});
			}
		}
	});

	next();
}