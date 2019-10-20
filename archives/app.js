const express = require("express");
const app = express();
const morgan = require("morgan");


//middler morgan
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//configurar el puerto
app.set('port',3000);
app.set('json spaces',2);

//routers
app.use(require('./src/routers/index.js'));
app.use(require('./src/routers/debates.js'));


//arrancado el servidor
app.listen(app.get('port'), () => {
    console.log("El servidor está inicializado en el puerto 3000");
});
/**var http = require('http');
var mysql = require('mysql');
var console_debug = "";
const express = require("express");
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//variable global de debate
let debate = {
	title:'',
	description: ''
 };

 //rerspuesta del servidor
let respuesta = {
	error: false,
	codigo: 200,
	mensaje: ''
 };

 //Home
app.get('/', function (req, res) {
	respuesta = {
		error: true,
		codigo: 200,
		mensaje: 'Punto de inicio'
	 };
	 res.send(respuesta);
});


//Metodo POST para crear un debate
app.get('/debate', function (req, res) {
	respuesta = {
	 error: false,
	 codigo: 200,
	 mensaje: ''
	};
	if(debate.title === '' || debate.description=== '') {
	 respuesta = {
		error: true,
		codigo: 501,
		mensaje: 'El debate no ha sido creado'
	 };
	} else {
	 respuesta = {
		error: false,
		codigo: 200,
		mensaje: 'respuesta del debate',
		respuesta: debate
	 };
	}
	res.send(respuesta);
 });

 app.post('/debate', function (req, res) {
	 console.log("req: "+req );
	 console.log("req.body.descriptions: "+req.body.description );
	if(!req.body.title || !req.body.description) {
	 respuesta = {
		error: true,
		codigo: 502,
		mensaje: 'El titulo  y la descripcion son requeridos'
	 };
	} else {
	 if(debate.title !== '' || debate.description !== '') {
		respuesta = {
		 error: true,
		 codigo: 503,
		 mensaje: 'El debate ya fue creado previamente'
		};
	 } else {
		debate = {
		 title: req.body.title,
		 description: req.body.description
		};
		respuesta = {
		 error: false,
		 codigo: 200,
		 mensaje: 'Debate creado',
		 respuesta: debate
		};
	 }
	}
	
	res.send(respuesta);
 });

 app.put('/debate', function (req, res) {
	if(!req.body.title || !req.body.description) {
	 respuesta = {
		error: true,
		codigo: 502,
		mensaje: 'El campo title y descripcion son requeridos'
	 };
	} else {
	 if(debate.title === '' || debate.description === '') {
		respuesta = {
		 error: true,
		 codigo: 501,
		 mensaje: 'El debate no ha sido creado'
		};
	 } else {
		debate = {
		 title: req.body.title,
		 description: req.body.description
		};
		respuesta = {
		 error: false,
		 codigo: 200,
		 mensaje: 'debate actualizado',
		 respuesta: usuario
		};
	 }
	}
	
	res.send(respuesta);
 });
 

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});
**/

// var server = http.createServer(function(req, res) {
// 	var con = mysql.createConnection({
// 	  host: "localhost",
// 	  user: "qgmsenxs_elena",
// 	  password: "CuentaElena5*"
// 	});

// 	con.connect(function(err) {
// 	  if (err) throw err;
// 	  console.log("Connected!");
// 	  console_debug = "CONECTED";
// 	});


//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var message = 'It works!\n',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//     res.end(response+console_debug);
// });


//server.listen();
