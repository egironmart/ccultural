//Definición do modelo de usuarios con validación

module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'Usuarios',
		{
			usuario: {
				type: DataTypes.STRING,
//				unique: true,
				validate: {notEmpty: {msg: "-> Tes que poñer un nome de usuario!"}}
			},
			password: {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Tes que poñer unha contraseña!"},
				           len: [4,15]}
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				validate: {notEmpty: {msg: "-> É necesaria unha conta de correo electrónico!"}}
			},
			admin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
		}
	);
}