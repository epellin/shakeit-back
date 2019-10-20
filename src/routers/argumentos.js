const   {Router} 	= require("express");
const 	router 		= Router();
const 	underscore 	= require('underscore');



/** connexion a mongoDB */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://elena:shakeit@cluster0-1fzjz.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("shakeit_db");
  dbo.collection("argumentos").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});


//routes
router.get('/argumentos', function (req, res,next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Content-Security-Policy", "default-src 'none'; font-src 'self' data:; style-src 'self' 'unsafe-inline' data:; img-src 'self' data:; script-src 'self' 'unsafe-inline'; connect-src 'self';");
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("shakeit_db");
		dbo.collection("argumentos").find({}).toArray(function(err, result) {
		  if (err) throw err;
		 res.json(result);
		});
	  });

 });


 //create argumento
 router.post('/argumentos', function (req, res,next) {
	 const {id, title, description, ok_vote, ko_vote, post_id, created_date, type} = req.body;
		if (id && title && description && created_date){
			const id_var = id +1;
			console.log("id: " + id_var);
			const newArgumento = {...req.body,id};
			console.log(newArgumento);
			var myobj = {id : id , title: title, description:description, ok_vote:ok_vote, ko_vote:ko_vote, post_id:post_id, created_date:created_date, type:type};
			console.log("myobj es: " + myobj);
			MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				var dbo = db.db("shakeit_db");
				dbo.collection("argumentos").insertOne(myobj, function(err, res) {
					if (err) throw err;
					db.close();
				});
				res.json({"msg" : "registro guardado correctamente."});
			});
			/*res.json(myobj);*/
		}else{
			console.log("Some params is empty or wrong");
			res.send("Worng request");
		}
	
 });

 //update
 router.put('/argumentos/:id', function (req, res,next) {
	const {title, description, ok_vote, ko_vote, created_date, post_id, type} = req.body;
	const {id }= req.params;
	var myquery = { 'title': title};
	//if (ok_vote && ko_vote)
	if (title && (ok_vote ||  ko_vote) && created_date){
		var newvalues = { $set: { ok_vote: ok_vote, ko_vote: ko_vote} };
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("shakeit_db");
			dbo.collection("argumentos").updateOne(myquery, newvalues, function(err, res) {
				if (err) throw err;
			db.close();
			});
			
			res.json({ 
				"id": id,
				"title": title,
				"description": description,
				"ok_vote": ok_vote,
				"ko_vote": ko_vote,
				"post_id": post_id,
				"created_date": created_date,
				"type": type
			});
		});
	}else{
		console.log("Some params is empty or wrong");
		res.status(500).json({"error" : "All the fields are required"});
	 }
});


 module.exports= router;