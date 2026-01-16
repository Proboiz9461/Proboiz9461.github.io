const socket = io();
let currentRoom = '';
let username = '';
let darkMode = true;

function toggleTheme() {
  darkMode = !darkMode;
  document.body.className = darkMode ? 'dark' : 'light';
}

// Emoji support
function insertEmoji(emoji) {
  const input = document.getElementById('messageInput');
  input.value += emoji;
}

// Create Room
function createRoom() {
  const name = document.getElementById('roomName').value.trim();
  const password = document.getElementById('roomPassword').value;
  if (!name) return alert("Enter a room name");

  fetch('/create-room', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({name,password})
  })
  .then(res => res.json())
  .then(data => {
    if(data.success) alert("Room created! Join it below.");
    else alert(data.message);
  });
}

// Join Room
function joinRoom() {
  const room = document.getElementById('joinRoomName').value.trim();
  const password = document.getElementById('joinRoomPassword').value;
  username = document.getElementById('username').value.trim() || 'Guest';
  if (!room) return alert("Enter a room name");

  fetch('/join-room',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({name:room,password,user:username})
  }).then(res=>res.json()).then(data=>{
    if(data.success){
      currentRoom=room;
      document.getElementById('messages').innerHTML='';
      updateUsers(data.users);
      socket.emit('joinRoom',{room:currentRoom,user:username});
    } else alert(data.message);
  });
}

// Send message
function sendMessage() {
  const msg = document.getElementById('messageInput').value.trim();
  if(!msg || !currentRoom) return;
  socket.emit('chatMessage',{room:currentRoom,user:username,message:msg});
  document.getElementById('messageInput').value='';
}

// Receive message
socket.on('message', data=>{
  const messagesDiv = document.getElementById('messages');
  const div = document.createElement('div');
  div.classList.add('message-bubble');
  div.classList.add(data.user===username?'me':'other');
  div.textContent = `${data.user}: ${data.message}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // Push notification
  if(document.hidden && data.user !== username){
    if(Notification.permission==="granted"){
      new Notification(`New message from ${data.user}`,{body:data.message});
    }
  }
});

// Update users
socket.on('updateUsers', data => updateUsers(data.users));

function updateUsers(users){
  document.getElementById('userList').textContent = "Users: "+users.join(', ');
}

// Ask permission for notifications
if("Notification" in window){
  Notification.requestPermission();
}
