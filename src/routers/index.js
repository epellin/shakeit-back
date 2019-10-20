const   {Router} = require("express");
const router = Router();

//routes
router.get('/', function (req, res) {
	let response = {
		"title": "mi primer debate", 
		"description" : "mi descripcion del debate 1"
	}
	res.json(response);
 });

 module.exports= router;