var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "qgmsenxs_elena",
  password: "CuentaElena5*"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});