//Estos módulos deben ser importados para poder utilizarlos
//Para construir aplicaciones web y APIs
const   {Router} 	= require("express");
const 	router 		= Router();
//Librería que proporciona métodos y funcionalidades para trabajas con colecciones (BBDD)
const 	underscore 	= require('underscore');

/** connexion a mongoDB */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://elena:shakeit@cluster0-1fzjz.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("shakeit_db");
  dbo.collection("debate").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});


//routes
router.get('/debates', function (req, res,next) {
	/*
    La respuesta debe manejar todas las cabeceras y los códigos de retorno. Este tipo de cosas se 
    manejan automáticamente en programas de servidor como Apache y Tomcat, pero Node requiere que todo 
    lo hagamos nosotros mismos.
    */
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Content-Security-Policy", "default-src 'none'; font-src 'self' data:; style-src 'self' 'unsafe-inline' data:; img-src 'self' data:; script-src 'self' 'unsafe-inline'; connect-src 'self';");
	var response;

	  MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("shakeit_db");
		dbo.collection("debate").find({}).toArray(function(err, result) {
			if (err) throw err;
			res.json(result);
		});
		});
 });


 //create debate
 router.post('/debates', function (req, res) {
	 const {title, description, ok_vote, ko_vote, created_date} = req.body;
	 if (title && (ok_vote ||  ko_vote) && created_date){
		const id = debates.length +1;
		console.log("id: " + id);
		const newDebate = {...req.body,id};
		console.log(newDebate);
		debates.push(newDebate);
		res.json(debates);
	 }else{
		console.log("Some params is empty or wrong");
		res.send("Worng request");
	 }
	
 });

 //update
 router.put('/debates/:id', function (req, res,next) {
	const {title, ok_vote, ko_vote, created_date} = req.body;
	const {id }= req.params;
	//var myid = { "id": Number.parseInt(id)};
	var myid = parseInt(id);
	if (title && (ok_vote ||  ko_vote) && created_date){
		var newvalues = { $set: {  ok_vote: ok_vote, ko_vote: ko_vote} };
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("shakeit_db");
			dbo.collection("debate").updateOne({"title" : title}, newvalues, function(err, res) {
				if (err) throw err;
			db.close();
			});
			res.json({
				"id": myid,
				"title": title,
				"ok_vote": ok_vote,
				"ko_vote": ko_vote,
				"created_date": created_date,
			});
		});
	}else{
		console.log("Some params is empty or wrong");
		res.status(500).json({"error" : "All the fields are required"});
	 }
});


//remove debate
 router.delete('/debates/:id', function (req, res) {
	const {id }= req.params;
	underscore.each(debates, (debate, i) => {
		if (debate.id == id){
			debates.splice(i,1);
		}
	});
	res.json(debates);
	});

 module.exports= router;