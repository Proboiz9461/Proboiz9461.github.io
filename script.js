function login() {
  alert("Login system will connect to backend later.");
  window.location.href = "dashboard.html";
}

function signup() {
  alert("Account created (frontend demo)");
  window.location.href = "index.html";
}

function createPost() {
  const content = document.getElementById("postContent").value;
  if (!content) return;

  const feed = document.getElementById("feed");

  const post = document.createElement("div");
  post.className = "post glass";
  post.innerHTML = `<h4>You</h4><p>${content}</p>`;

  feed.prepend(post);
  document.getElementById("postContent").value = "";
}
