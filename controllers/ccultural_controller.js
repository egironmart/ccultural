var models = require('../models/models.js');

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
