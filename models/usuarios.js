//Definición do modelo de usuarios con validación

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Usuarios',
		{
			usuario: {
				type: DataTypes.STRING,
		 		unique: {args: [true], msg: "-> Este nome de usuario non está dispoñible"},
				validate: {notEmpty: {msg: "-> Tes que poñer un nome de usuario!"}}
			},
			password: {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Tes que poñer un contrasinal!"},
							  len: {args:[4,15],msg:"-> A lonxitude debe ser entre 4 e 15 caracteres"}}
			},
			email: {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> É necesaria unha conta de correo electrónico!"},
							  isEmail:  {msg: "-> Debe ter formato de Email: nome@nome.nome"}},
			},
			admin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			activo: {
				type: DataTypes.BOOLEAN,
				defaultValue: true
			}
		}, {indexes: [{unique: true, fields: ['email']}]}
	);
}