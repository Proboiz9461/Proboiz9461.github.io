const socket = io();
let currentRoom = '';
let username = '';

function createRoom() {
  const name = document.getElementById('roomName').value.trim();
  const password = document.getElementById('roomPassword').value;

  if (!name) return alert("Enter a room name");

  fetch('/create-room', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) alert("Room created! Join it below.");
    else alert(data.message);
  });
}

function joinRoom() {
  const room = document.getElementById('joinRoomName').value.trim();
  const password = document.getElementById('joinRoomPassword').value;
  username = document.getElementById('username').value.trim() || 'Guest';

  if (!room) return alert("Enter a room name");

  fetch('/join-room', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: room, password, user: username })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      currentRoom = room;
      document.getElementById('messages').innerHTML = '';
      updateUsers(data.users);
      socket.emit('joinRoom', { room: currentRoom, user: username });
    } else {
      alert(data.message);
    }
  });
}

function sendMessage() {
  const msg = document.getElementById('messageInput').value.trim();
  if (!msg || !currentRoom) return;

  socket.emit('chatMessage', { room: currentRoom, user: username, message: msg });
  document.getElementById('messageInput').value = '';
}

socket.on('message', data => {
  const messagesDiv = document.getElementById('messages');
  const div = document.createElement('div');
  div.textContent = `${data.user}: ${data.message}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

socket.on('updateUsers', data => {
  updateUsers(data.users);
});

function updateUsers(users) {
  document.getElementById('userList').textContent = "Users: " + users.join(', ');
}



x
