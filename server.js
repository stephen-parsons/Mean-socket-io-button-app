var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(session({secret: '1234'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//

app.get('/', function(req, res) {
 	res.render("index");
})

var count=0;

// app.post('/survey', function(req, res) {
// 	console.log("POST DATA", req.body);
// 	res.render('result', {data: req.body});
// })

//

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  io.emit( 'server_response', {response: count});
  socket.on( "button_clicked", function (data){
    console.log("Button clicked");
    count = data.thiscounter;
    console.log(count);
    count++;
    io.emit( 'server_response', {response: count});
	});
  socket.on( "reset_clicked", function (data){
    console.log("Button clicked");
    count = data.thiscounter;
    console.log(count);
    io.emit( 'server_response', {response: count});
	});
})