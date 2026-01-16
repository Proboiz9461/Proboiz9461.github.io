// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_FIREBASE_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let currentRoom = '';
let username = '';
let darkMode = true;
let typingTimeout = null;

// Theme toggle
function toggleTheme(){
  darkMode = !darkMode;
  document.body.className = darkMode ? 'dark' : 'light';
}

// Emoji insert
function insertEmoji(emoji){
  const input = document.getElementById('messageInput');
  input.value += emoji;
}

// Create room
function createRoom(){
  const roomName = document.getElementById('roomName').value.trim();
  const password = document.getElementById('roomPassword').value;

  if(!roomName) return alert("Enter room name");

  const roomRef = db.ref('rooms/'+roomName);
  roomRef.get().then(snapshot=>{
    if(snapshot.exists()){
      alert("Room already exists");
    } else {
      roomRef.set({ password: password || '', createdAt: Date.now() });
      alert("Room created! Click on it to join.");
      addRoomToList(roomName);
    }
  });
}

// Add room to sidebar
function addRoomToList(room){
  const div = document.createElement('div');
  div.textContent = room;
  div.onclick = ()=>joinRoom(room);
  document.getElementById('roomList').appendChild(div);
}

// Join room
function joinRoom(room){
  const roomRef = db.ref('rooms/'+room);
  roomRef.get().then(snapshot=>{
    if(!snapshot.exists()) return alert("Room does not exist");
    const pwd = snapshot.val().password;
    if(pwd){
      const entered = prompt("Enter room password:");
      if(entered !== pwd) return alert("Incorrect password");
    }
    username = prompt("Enter your name:") || 'Guest';
    currentRoom = room;
    document.getElementById('chatHeader').textContent = "Room: "+room;
    document.getElementById('messages').innerHTML = '';
    listenMessages();
  });
}

// Send message
function sendMessage(){
  const msg = document.getElementById('messageInput').value.trim();
  if(!msg || !currentRoom) return;
  const messagesRef = db.ref('rooms/'+currentRoom+'/messages');
  messagesRef.push({user: username, message: msg, timestamp: Date.now()});
  document.getElementById('messageInput').value='';
}

// Listen for new messages
function listenMessages(){
  const messagesRef = db.ref('rooms/'+currentRoom+'/messages');
  messagesRef.off(); // remove old listeners
  messagesRef.on('child_added', snapshot=>{
    const data = snapshot.val();
    const div = document.createElement('div');
    div.classList.add('message-bubble');
    div.classList.add(data.user===username?'me':'other');
    const time = new Date(data.timestamp).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
    div.textContent = `${data.user}: ${data.message} (${time})`;
    document.getElementById('messages').appendChild(div);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;

    // Play sound & notifications
    if(data.user!==username){
      document.getElementById('messageSound').play();
      if(Notification.permission==="granted") new Notification(`New message from ${data.user}`,{body:data.message});
    }
  });
}

// Typing indicator
function typing(){
  if(!currentRoom) return;
  const typingRef = db.ref('rooms/'+currentRoom+'/typing/'+username);
  typingRef.set(true);
  typingRef.onDisconnect().remove();
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(()=>{typingRef.remove();},1000);
}

// Listen typing
function listenTyping(){
  const typingRef = db.ref('rooms/'+currentRoom+'/typing');
  typingRef.on('value', snapshot=>{
    const users = Object.keys(snapshot.val() || {}).filter(u=>u!==username);
    document.getElementById('typingIndicator').textContent = users.length>0 ? users.join(', ')+" is typing..." : '';
  });
}
 
