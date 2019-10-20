//Estos módulos deben ser importados para poder utilizarlos
//Para construir aplicaciones web y APIs
const express = require("express");
const app = express();
//Para evitar problemas de acceso a la hora de hacer peticiones desde el cliente
var cors = require("cors");
//Para registrar detalles de la solicitud
const morgan = require("morgan");
//Extrae toda la parte del cuerpo de un flujo de solicitud entrante y lo expone en req.body, así es más fácil interactuar.
const bodyparser = require("body-parser");
app.use(cors());

//middler morgan
app.use(morgan("dev")); //more edetails in log console
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//configurar el puerto
app.set('port',3000);
app.set('json spaces',2);

//routers
app.use(require('./routers/index.js'));
app.use(require('./routers/debates.js'));
app.use(require('./routers/argumentos.js'));


//arrancado el servidor.
app.listen(app.get('port'), () => {
    console.log("El servidor está inicializado en el puerto 3000");
});