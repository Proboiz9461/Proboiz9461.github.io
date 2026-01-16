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
  const r = roomName.value.trim();
  if (!r) return;
  db.ref("rooms/" + r).set({ password: roomPassword.value });
}

function loadRooms() {
  db.ref("rooms").on("child_added", snap => {
    const d = document.createElement("div");
    d.textContent = snap.key;
    d.onclick = () => joinRoom(snap.key);
    roomList.appendChild(d);
  });
}

function joinRoom(r) {
  db.ref("rooms/" + r).get().then(snap => {
    const pwd = snap.val().password;
    if (pwd && prompt("Password") !== pwd) return;
    user = prompt("Your name") || "Guest";
    room = r;
    messages.innerHTML = "";
    chatHeader.textContent = r;
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
    const b = document.createElement("div");
    b.className = "bubble " + (m.user === user ? "me" : "other");
    b.textContent = `${m.user}: ${m.text}`;
    messages.appendChild(b);
    messages.scrollTop = messages.scrollHeight;
  });
}

function typing() {
  clearTimeout(typingTimer);
  db.ref(`typing/${room}/${user}`).set(true);
  typingTimer = setTimeout(() => {
    db.ref(`typing/${room}/${user}`).remove();
  }, 800);
}

window.onload = loadRooms;
