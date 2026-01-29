let room = "";
let user = "";
let isAdmin = false;

/* GOD MODE CHECK */
function checkAdmin(name) {
  if (name === "Shaurya Chauhan") {
    isAdmin = true;
  }
}

/* ROOM AUTO JOIN FROM LINK */
const params = new URLSearchParams(location.search);
const autoRoom = params.get("room");

/* LOAD ROOMS */
function loadRooms() {
  db.ref("rooms").on("child_added", snap => {
    const div = document.createElement("div");
    div.textContent = snap.key;
    div.onclick = () => joinRoom(snap.key);
    roomList.appendChild(div);
  });
}

/* JOIN ROOM */
function joinRoom(r) {
  db.ref("rooms/" + r).get().then(snap => {
    if (!snap.exists()) return;

    if (snap.val().locked) {
      alert("Room locked by admin");
      return;
    }

    const pwd = snap.val().password;
    if (pwd) {
      const p = prompt("Room password:");
      if (p !== pwd) return alert("Wrong password");
    }

    user = prompt("Your name");
    if (!user) return;

    checkAdmin(user);
    room = r;

    chatHeader.innerHTML = `
      Room: ${r} ${isAdmin ? "👑" : ""}
      <button onclick="copyInvite()">🔗 Invite</button>
    `;

    messages.innerHTML = "";
    setupOnline();
    listenMessages();
  });
}

/* CREATE ROOM */
function createRoom() {
  if (!roomName.value) return;
  db.ref("rooms/" + roomName.value).set({
    password: roomPassword.value || "",
    locked: false
  });
}

/* ONLINE USERS */
function setupOnline() {
  db.ref(`online/${room}/${user}`).set(true);
  db.ref(`online/${room}/${user}`).onDisconnect().remove();

  db.ref(`online/${room}`).on("value", snap => {
    onlineUsers.innerHTML = "";
    snap.forEach(u => {
      onlineUsers.innerHTML += `<div>${u.key}</div>`;
    });
  });
}

/* SEND MESSAGE */
function sendMessage() {
  if (!messageInput.value) return;

  db.ref(`rooms/${room}/messages`).push({
    user,
    text: messageInput.value,
    admin: isAdmin,
    time: Date.now()
  });

  messageInput.value = "";
}

/* LISTEN MESSAGES */
function listenMessages() {
  db.ref(`rooms/${room}/messages`).off();
  db.ref(`rooms/${room}/messages`).on("child_added", snap => {
    const m = snap.val();
    const div = document.createElement("div");
    div.className = "bubble " + (m.user === user ? "me" : "other");

    div.innerHTML = `
      <b>${m.user}${m.admin ? " ✅" : ""}</b><br>
      ${m.text}
      <div class="reactions">
        <span onclick="react('${snap.key}','👍')">👍</span>
        <span onclick="react('${snap.key}','😂')">😂</span>
        <span onclick="react('${snap.key}','❤️')">❤️</span>
      </div>
    `;

    if (isAdmin) {
      const del = document.createElement("button");
      del.textContent = "🗑";
      del.onclick = () => {
        db.ref(`rooms/${room}/messages/${snap.key}`).remove();
      };
      div.appendChild(del);
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;

    db.ref(`seen/${room}/${snap.key}/${user}`).set(true);
  });
}

/* MESSAGE REACTIONS */
function react(id, emoji) {
  db.ref(`rooms/${room}/messages/${id}/reactions/${emoji}`)
    .transaction(n => (n || 0) + 1);
}

/* INVITE LINK */
function copyInvite() {
  navigator.clipboard.writeText(
    `${location.origin}${location.pathname}?room=${room}`
  );
  alert("Invite link copied");
}

/* INIT */
window.onload = () => {
  loadRooms();
  if (autoRoom) joinRoom(autoRoom);
};
