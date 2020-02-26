// Requires
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
// const firebase = require("firebase")
const mysql = require("mysql")
const fs = require("fs");
const ejs = require("ejs")
require("dotenv/config");

var sqlConnection = mysql.createPool({
    connectionLimit: 5,
    host: "us-cdbr-iron-east-04.cleardb.net",
    user: "b4eb1d5633570c",
    password: "2a2186ca",
    database: "heroku_9b8a67f78720fcc"
});

sqlConnection.getConnection(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + sqlConnection.host);
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
//app.set('view engine', 'ejs');

// Port config
const PORT = process.env.PORT || 3000;

// Listening
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
//app.listen(3000, () => console.log(`listening on port 3000...`));

//app.get('/', function (req, res) {
//    console.log('test');
//    res.sendFile(__dirname + '/public/index.html')
//});


app.get('/searchMysql', function (req, res) {
    
    var search = String(req.query.searchInput)
    console.log('search :', search);
    sqlConnection.query(
        `SELECT scene.thumbnail_Link, video.video_Link, scene.time_sec FROM video 
                INNER JOIN scene USING(video_ID)
                INNER JOIN scene_dtls USING(scene_ID)
            WHERE(scene_dtls.tag1 = ?
                OR scene_dtls.tag2 = ?
                OR scene_dtls.tag3 = ?
                OR scene_dtls.tag4 = ?
                OR scene_dtls.tag5 = ?
                OR scene_dtls.tag6 = ?
                OR scene_dtls.tag7 = ?
                OR scene_dtls.tag8 = ?
                OR scene_dtls.tag9 = ?
                OR scene_dtls.tag10 = ?
                OR scene_dtls.place_name = ?
                OR video.city = ?);`
                , [search, search, search, search, search, search, search, search, search, search, search, search], function (error, results) {
        if (error) {
            console.log('error: ', error.message);
        } else {
            res.send(
                ejs.render(data, {
                prodList: results
            }
            ));
            console.log('Selecteddata: ', results);
        }
    });
});

