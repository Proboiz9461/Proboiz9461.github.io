const socket = io();
let currentRoom = '';
let username = '';
let darkMode = true;
let typingTimeout;

// Request notification permission
if("Notification" in window){
  Notification.requestPermission();
}

function toggleTheme() {
  darkMode = !darkMode;
  document.body.className = darkMode ? 'dark' : 'light';
}

// Emoji support
function insertEmoji(emoji){
  const input = document.getElementById('messageInput');
  input.value += emoji;
}

// Create Room
function createRoom(){
  const name = document.getElementById('roomName').value.trim();
  const password = document.getElementById('roomPassword').value;
  if(!name) return alert("Enter room name");

  fetch('/create-room',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({name,password})
  }).then(res=>res.json()).then(data=>{
    if(data.success){
      alert("Room created! Click on it in the list to join.");
      addRoomToList(name);
    } else alert(data.message);
  });
}

// Join Room from list
function joinRoomFromList(room){
  const password = prompt("Enter room password (if any):") || '';
  username = prompt("Enter your name:") || 'Guest';

  fetch('/join-room',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({name:room,password,user:username})
  }).then(res=>res.json()).then(data=>{
    if(data.success){
      currentRoom = room;
      document.getElementById('messages').innerHTML='';
      document.getElementById('chatHeader').textContent = "Room: "+room;
      updateUsers(data.users);
      socket.emit('joinRoom',{room:currentRoom,user:username});
    } else alert(data.message);
  });
}

// Add room to sidebar
function addRoomToList(room){
  const div = document.createElement('div');
  div.textContent = room;
  div.onclick = ()=>joinRoomFromList(room);
  document.getElementById('roomList').appendChild(div);
}

// Typing indicator
function typing(){
  if(!currentRoom) return;
  socket.emit('typing',{room:currentRoom,user:username});
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(()=>{socket.emit('stopTyping',{room:currentRoom});},1000);
}

// Send message
function sendMessage(){
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
  const time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  div.textContent = `${data.user}: ${data.message} (${time})`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // Push notification
  if(document.hidden && data.user !== username){
    if(Notification.permission==="granted"){
      new Notification(`New message from ${data.user}`,{body:data.message});
    }
  }

  // Play sound
  if(data.user !== username){
    document.getElementById('messageSound').play();
  }
});

// Update users list
socket.on('updateUsers', data=>{
  updateUsers(data.users);
});

function updateUsers(users){
  document.getElementById('typingIndicator').textContent = users.typing ? users.typing.join(', ') + " is typing..." : '';
}

// Typing indicators
socket.on('userTyping', data=>{
  document.getElementById('typingIndicator').textContent = `${data.user} is typing...`;
});

socket.on('userStopTyping', ()=>{
  document.getElementById('typingIndicator').textContent = '';
});
