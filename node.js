const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(__dirname));

let rooms = {}; // { roomName: { password: hashed, users: [] } }

app.post('/create-room', (req, res) => {
  const { name, password } = req.body;
  if (rooms[name]) return res.json({ success: false, message: "Room exists" });

  const hashed = password ? Buffer.from(password).toString('base64') : null;
  rooms[name] = { password: hashed, users: [] };
  res.json({ success: true });
});

app.post('/join-room', (req, res) => {
  const { name, password, user } = req.body;
  const room = rooms[name];
  if (!room) return res.json({ success: false, message: "Room does not exist" });

  const hashed = password ? Buffer.from(password).toString('base64') : null;
  if (room.password && room.password !== hashed)
    return res.json({ success: false, message: "Incorrect password" });

  if (!room.users.includes(user)) room.users.push(user);
  res.json({ success: true, users: room.users });
});

io.on('connection', socket => {
  socket.on('joinRoom', ({ room, user }) => {
    socket.join(room);
    io.to(room).emit('updateUsers', { users: rooms[room].users });
  });

  socket.on('chatMessage', ({ room, user, message }) => {
    io.to(room).emit('message', { user, message });
  });

  socket.on('disconnecting', () => {
    const roomsJoined = Array.from(socket.rooms).filter(r => r !== socket.id);
    roomsJoined.forEach(r => {
      if (rooms[r]) {
        rooms[r].users = rooms[r].users.filter(u => u !== username);
        io.to(r).emit('updateUsers', { users: rooms[r].users });
      }
    });
  });
});

server.listen(3000, () => console.log('Server running on port 3000'));
