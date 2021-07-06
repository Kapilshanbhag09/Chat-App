const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http,{cors: {
    origin: "*",
    methods: ["GET", "POST"]}});
const Cors=require('cors')
io.on("connection", function(socket) {
  socket.on('text_changed',(text)=>{
      io.emit('text_changed',text);
  })
  socket.on('message_sent',(data)=>{
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
http.listen(4000, function() {
  console.log("listening on :4000");
});
