//Definición do modelo de actos
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Actos',
	   {
	   	nome:       DataTypes.STRING,
	   	data:       DataTypes.STRING,
	   	hora:       DataTypes.STRING,
	   	lugar:      DataTypes.STRING,
	   	tipo:       DataTypes.STRING,
	   	descricion: DataTypes.STRING(1000),
	   	foto:       DataTypes.STRING,
	   	activo:     DataTypes.BOOLEAN,
	   	pasado:     DataTypes.BOOLEAN
	   }
	);
}