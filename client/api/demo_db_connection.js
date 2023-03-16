var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "api",
  password: "bKCcknwuGKWR$1",
  database: "db"
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM Users WHERE ID=1";
    con.query(sql, function (err, result) {
      if (err) throw err;
      //console.log(JSON.stringify(result));
      //https://www.pluralsight.com/guides/load-and-render-json-data-into-react-components
      const data = JSON.stringify(result)
      console.log(data)
    });
  });

