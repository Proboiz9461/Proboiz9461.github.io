let room = "";
let user = "";
let dark = true;
let typingTimer;

function toggleTheme() {
  dark = !dark;
  document.body.className = dark ? "dark" : "light";
}

function insertEmoji(e) {
  messageInput.value += e;
}

function createRoom() {
  const name = roomName.value.trim();
  if (!name) return alert("Room name required");
  db.ref("rooms/" + name).set({ password: roomPassword.value });
}

function loadRooms() {
  db.ref("rooms").on("child_added", snap => {
    const div = document.createElement("div");
    div.textContent = snap.key;
    div.onclick = () => joinRoom(snap.key);
    roomList.appendChild(div);
  });
}

function joinRoom(r) {
  db.ref("rooms/" + r).get().then(snap => {
    if (!snap.exists()) return;
    const pwd = snap.val().password;
    if (pwd) {
      const p = prompt("Room password:");
      if (p !== pwd) return alert("Wrong password");
    }
    user = prompt("Your name") || "Guest";
    room = r;
    messages.innerHTML = "";
    chatHeader.textContent = "Room: " + r;
    listenMessages();
  });
}

function sendMessage() {
  if (!room || !messageInput.value) return;
  db.ref(`rooms/${room}/messages`).push({
    user,
    text: messageInput.value,
    time: Date.now()
  });
  messageInput.value = "";
}

function listenMessages() {
  db.ref(`rooms/${room}/messages`).off();
  db.ref(`rooms/${room}/messages`).on("child_added", snap => {
    const m = snap.val();
    const div = document.createElement("div");
    div.className = "bubble " + (m.user === user ? "me" : "other");
    div.innerText = `${m.user}: ${m.text}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  });
}

function typing() {
  clearTimeout(typingTimer);
  db.ref(`typing/${room}/${user}`).set(true);
  typingTimer = setTimeout(() => {
    db.ref(`typing/${room}/${user}`).remove();
  }, 1000);
}

window.onload = loadRooms;
