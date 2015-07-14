//Definición do modelo de comentario con validación

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'Comentario',
		{
			texto: {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Falta o comentario!"}}
			}
		}
	);
}