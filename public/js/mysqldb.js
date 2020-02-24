const mysql = require("mysql");
const fs = require("fs");
const ejs = require("ejs");

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(express.cookieParser('your secret here'));
//app.use(express.session());
//app.use(app.router);

const search = location.search.substring(1);
// Object containing input made by user
const input = JSON.parse(
  '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
  function(key, value) {
    return key === "" ? value : decodeURIComponent(value);
  }
);
console.log(input);
// Object containing actual coords of dep/arrival location

function resultList() {
  var dbTable;
  // connect to mysql database (clearDB)
  var sqlConnection = mysql.createPool({
    connectionLimit: 5,
    host: "us-cdbr-iron-east-04.cleardb.net",
    user: "b4eb1d5633570c",
    password: "2a2186ca",
    database: "heroku_9b8a67f78720fcc"
  });
  sqlConnection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
  });
  //query to clearDB
  sqlConnection.query('SELECT video.video_Link FROM video', function(error, results){
    if(error){
      console.log('error: ', error.message);
    }else{
      ejs.render(data,{
        prodList:results}
      );
      dbTable = results;
      console.log('Selecteddata: ', results);
    }
  });
  initSceneMap(dbTable);
}
