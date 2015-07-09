//Definición do modelo de actos
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Actos',
	   {
	   	nome: {
	   		type: DataTypes.STRING,
	   		validate: {notEmpty:{msg: "--> O nome do acto é obrigatorio!"}}
	   	},
	   	data: {
	   		type: DataTypes.STRING,
	   		validate: {notEmpty:{msg: "--> A data é obrigatoria!"}}
	   	},
	   	hora: {
	   		type: DataTypes.STRING,
	   		validate: {notEmpty:{msg: "--> A hora é obrigatoria!"}}
	   	},
	   	lugar: {
	   		type: DataTypes.STRING,
	   		validate: {notEmpty:{msg: "--> O lugar de celebración é obrigatorio!"}}
	   	},
	   	tipo: {
	   		type: DataTypes.STRING,
	   		validate: {notEmpty:{msg: "--> O tipo de acto é obrigatorio!"}}
	   	},
	   	descricion: {
	   		type: DataTypes.STRING(1000),
	   		validate: {notEmpty:{msg: "--> A descrición é obrigatoria!"}}
	   	},
	   	foto:       DataTypes.STRING,
	   	activo: {
	   		type: DataTypes.BOOLEAN,
	   		validate: {is:{args:[/[0-1]+/g],msg: "--> Debes marcar se está activo!"}}
	   	},
	   	pasado: {
	   		type: DataTypes.BOOLEAN,
	   		validate: {is:{args:[/[0-1]+/g],msg: "--> Debes marcar se xa é un acto pasado!"}}
	   	}
	   }
	);
}