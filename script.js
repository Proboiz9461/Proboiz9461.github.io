const loginBox = document.getElementById("loginBox");
const app = document.getElementById("app");
const userName = document.getElementById("userName");
const userPic = document.getElementById("userPic");

// PROVIDERS
const google = new firebase.auth.GoogleAuthProvider();
const github = new firebase.auth.GithubAuthProvider();
const microsoft = new firebase.auth.OAuthProvider('microsoft.com');
const yahoo = new firebase.auth.OAuthProvider('yahoo.com');
const apple = new firebase.auth.OAuthProvider('apple.com');

// LOGIN FUNCTIONS
function loginGoogle() { auth.signInWithPopup(google); }
function loginGithub() { auth.signInWithPopup(github); }
function loginMicrosoft() { auth.signInWithPopup(microsoft); }
function loginYahoo() { auth.signInWithPopup(yahoo); }
function loginApple() { auth.signInWithPopup(apple); }

function logout() {
  auth.signOut();
}

// AUTH STATE
auth.onAuthStateChanged(user => {
  if (user) {
    loginBox.classList.add("hidden");
    app.classList.remove("hidden");

    userName.innerText = user.displayName;
    userPic.src = user.photoURL;
  } else {
    loginBox.classList.remove("hidden");
    app.classList.add("hidden");
  }
});
