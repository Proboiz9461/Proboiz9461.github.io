let room = "";
let user = "";
let isAdmin = false;

/* GOD ADMIN CHECK */
function checkAdmin(name) {
  if (name === "Shaurya Chauhan") {
    isAdmin = true;
  }
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

  db.ref("rooms/" + room + "/messages").off();
  db.ref("rooms/" + room + "/messages").on("child_added", snap => {
    const m = snap.val();
    const div = document.createElement("div");
    div.className = "bubble " + (m.user === user ? "me" : "");

    div.innerHTML = `
      <b>${m.user}${m.admin ? " ✅" : ""}</b><br>
      ${m.text}
    `;

    /* ADMIN DELETE */
    if (isAdmin) {
      const del = document.createElement("button");
      del.textContent = "🗑";
      del.onclick = () => {
        db.ref("rooms/" + room + "/messages/" + snap.key).remove();
      };
      div.appendChild(del);
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  });
}

/* SEND MESSAGE */
sendBtn.onclick = () => {
  if (!messageInput.value || !room) return;

  db.ref("rooms/" + room + "/messages").push({
    user,
    text: messageInput.value,
    admin: isAdmin,
    time: Date.now()
  });

  messageInput.value = "";
};
