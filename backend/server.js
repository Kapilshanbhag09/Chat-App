const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http,{cors: {
    origin: "*",
    methods: ["GET", "POST"]}});
const Cors=require('cors')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
io.on("connection", function(socket) {
  socket.on('text_changed',(text)=>{
      io.emit('text_changed',text);
  })
  socket.on('message_sent',(data)=>{
    console.log(data.myside);
    console.log(data.message);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("Chat_"+data.myside);
      var myobj = { sender:data.myside,message:data.message };
      dbo.collection("chats").insertOne(myobj, function(err, res) {
        if (err) throw err;
        db.close();
      });
    });
    io.emit("message_recieved",(data));
  })
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.get('/',(req,res)=>{
    res.send("HEllo")
})
app.get('/getmessage/:fromside',(req,res)=>{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Chat_"+req.params.fromside);
    dbo.collection("chats").find({}).toArray(function(err, mongodata) {
      if (err) throw err;
      console.log(mongodata)
      res.send(mongodata)
      db.close();
    });
  });
})
http.listen(4000, function() {
  console.log("listening on :4000");
});
