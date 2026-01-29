let room = "";
let user = "";

createBtn.onclick = () => {
  if (!roomName.value) return;
  db.ref("rooms/" + roomName.value).set({});
};

db.ref("rooms").on("child_added", snap => {
  const div = document.createElement("div");
  div.textContent = snap.key;
  div.onclick = () => joinRoom(snap.key);
  roomList.appendChild(div);
});

function joinRoom(r) {
  room = r;
  user = prompt("Your name");
  messages.innerHTML = "";
  chatHeader.textContent = "Room: " + r;

  db.ref("rooms/" + room + "/messages").on("child_added", snap => {
    const m = snap.val();
    const div = document.createElement("div");
    div.className = "bubble " + (m.user === user ? "me" : "");
    div.textContent = m.user + ": " + m.text;
    messages.appendChild(div);
  });
}

sendBtn.onclick = () => {
  if (!messageInput.value) return;
  db.ref("rooms/" + room + "/messages").push({
    user,
    text: messageInput.value
  });
  messageInput.value = "";
};
