// 🔹 Firebase v9 Modular SDK (NO COMPAT)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// 🔐 YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyA_Na0eivLj652OIfV94hPhBNUC0k8CndI",
  authDomain: "breathers-2026.firebaseapp.com",
  projectId: "breathers-2026",
  appId: "1:73555421893:web:987d540dd10f47da71deac"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// UI refs
const loginBox = document.getElementById("loginBox");
const appBox = document.getElementById("app");
const userName = document.getElementById("userName");
const userPic = document.getElementById("userPic");

document.getElementById("googleBtn").onclick = () =>
  signInWithRedirect(auth, googleProvider);

document.getElementById("githubBtn").onclick = () =>
  signInWithRedirect(auth, githubProvider);

document.getElementById("logoutBtn").onclick = () =>
  signOut(auth);

// Handle redirect result (important)
getRedirectResult(auth).catch(err => {
  console.error(err.code, err.message);
});

// Auth state
onAuthStateChanged(auth, user => {
  if (user) {
    loginBox.classList.add("hidden");
    appBox.classList.remove("hidden");

    userName.textContent = user.displayName;
    userPic.src = user.photoURL;
  } else {
    loginBox.classList.remove("hidden");
    appBox.classList.add("hidden");
  }
});
