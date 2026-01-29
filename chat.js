let room = "";
let user = "";
let isAdmin = false;

/* ADMIN CHECK */
function checkAdmin(name) {
  if (name === "Shaurya Chauhan") isAdmin = true;
}

/* CREATE ROOM */
createBtn.onclick = () => {
  if (!roomName.value) return;
  db.ref("rooms/" + roomName.value).set({});
};

/* LOAD ROOMS */
db.ref("rooms").on("child_added", snap => {
  const div = document.createElement("div");
  div.textContent = snap.key;
  div.onclick = () => joinRoom(snap.key);
  roomList.appendChild(div);
});

/* JOIN ROOM */
function joinRoom(r) {
  room = r;
  user = prompt("Your name");
  if (!user) return;

  checkAdmin(user);
  messages.innerHTML = "";
  chatHeader.innerHTML = `Room: ${r} ${isAdmin ? "👑" : ""}`;

  /* ONLINE */
  db.ref(`online/${room}/${user}`).set(true);
  db.ref(`online/${room}/${user}`).onDisconnect().remove();

  db.ref(`online/${room}`).on("value", snap => {
    onlineUsers.innerHTML = "";
    snap.forEach(u => onlineUsers.innerHTML += `<div>${u.key}</div>`);
  });

  /* MESSAGES */
  db.ref("rooms/" + room + "/messages").off();
  db.ref("rooms/" + room + "/messages").on("child_added", snap => {
    const m = snap.val();
    const div = document.createElement("div");
    div.className = "bubble " + (m.user === user ? "me" : "");

    div.innerHTML = `
      <b>${m.user}${m.admin ? " ✅" : ""}</b><br>
      ${m.text}
      <div>
        <span onclick="react('${snap.key}','👍')">👍</span>
        <span onclick="react('${snap.key}','😂')">😂</span>
        <span onclick="react('${snap.key}','❤️')">❤️</span>
      </div>
    `;

    if (isAdmin) {
      const del = document.createElement("button");
      del.textContent = "🗑";
      del.onclick = () =>
        db.ref(`rooms/${room}/messages/${snap.key}`).remove();
      div.appendChild(del);
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  });
}

/* SEND */
sendBtn.onclick = () => {
  if (!messageInput.value || !room) return;
  db.ref(`rooms/${room}/messages`).push({
    user,
    text: messageInput.value,
    admin: isAdmin,
    time: Date.now()
  });
  messageInput.value = "";
};

/* REACT */
function react(id, emoji) {
  db.ref(`rooms/${room}/messages/${id}/reactions/${emoji}`)
    .transaction(n => (n || 0) + 1);
}
