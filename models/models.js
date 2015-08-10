var path = require('path');

//Para BBDD Postgres (se despregamos en Heroku) e SQLite en local
// Postgres DATABASE_URL = postgres://user:password@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE; 

//Carga o modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite ou Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // só SQLite (.env)
    omitNull: true      // só Postgres
  }      
);

//Importa a definición das táboas
var Actos       = sequelize.import(path.join(__dirname,'actos'));
var Comentarios = sequelize.import(path.join(__dirname,'comentarios'));
var Usuarios    = sequelize.import(path.join(__dirname,'usuarios'));

Comentarios.belongsTo(Actos);
Actos.hasMany(Comentarios);

exports.Actos = Actos;             //Exporta a definición da táboa Actos
exports.Comentarios = Comentarios; //Exporta a definición da táboa Comentarios
exports.Usuarios = Usuarios;       //Exporta a definición da táboa Usuarios

//Crea e inicializa a táboa
sequelize.sync().then(function () {
	Actos.count().then(function (count) {
		if (count === 0) {
			Actos.create({
				nome:       'Acto nº 1',
 	   	   data:       '12/06/2015',
 	   	   hora:       '17:00',
	   	   lugar:      'Salón de actos',
	   	   tipo:       'Conferencia',
	   	   descricion: 'Descición da conferencia que terá lugar.',
	   	   foto:       '',
	   	   activo:     '1',
	   	   pasado:     '0'
			}).then(function () {console.log('Base de datos inicializada')});
		}
	});
});