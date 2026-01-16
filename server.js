const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(__dirname));

let rooms = {}; // roomName -> { password, users: [], typing: [] }

// REST APIs for room management
app.post('/create-room',(req,res)=>{
  const {name,password} = req.body;
  if(rooms[name]) return res.json({success:false,message:"Room exists"});
  rooms[name] = {password:password?Buffer.from(password).toString('base64'):null, users:[], typing:[]};
  res.json({success:true});
});

app.post('/join-room',(req,res)=>{
  const {name,password,user} = req.body;
  const room = rooms[name];
  if(!room) return res.json({success:false,message:"Room does not exist"});
  const hashed = password?Buffer.from(password).toString('base64'):null;
  if(room.password && room.password!==hashed) return res.json({success:false,message:"Incorrect password"});
  if(!room.users.includes(user)) room.users.push(user);
  res.json({success:true, users:room.users});
});

// Socket.IO real-time
io.on('connection', socket=>{
  socket.on('joinRoom', ({room,user})=>{
    socket.join(room);
    io.to(room).emit('updateUsers',{users:rooms[room].users});
  });

  socket.on('chatMessage', ({room,user,message})=>{
    io.to(room).emit('message',{user,message});
  });

  socket.on('typing', ({room,user})=>{
    if(!rooms[room].typing.includes(user)) rooms[room].typing.push(user);
    io.to(room).emit('userTyping',{user});
  });

  socket.on('stopTyping', ({room,user})=>{
    rooms[room].typing = rooms[room].typing.filter(u=>u!==user);
    io.to(room).emit('userStopTyping');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
