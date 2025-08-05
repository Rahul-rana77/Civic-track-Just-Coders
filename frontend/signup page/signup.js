 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
 import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

 const firebaseConfig = {
    apiKey: "AIzaSyBOu0N08YATCslU033o0f8oJH6WsJsqdUA",
    authDomain: "civic-track-just-coders.firebaseapp.com",
    projectId: "civic-track-just-coders",
    storageBucket: "civic-track-just-coders.firebasestorage.app",
    messagingSenderId: "388460209383",
    appId: "1:388460209383:web:33fd4e50b5ac99c15cae42",
    measurementId: "G-X80TQQCSZ0"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  console.log(auth)

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // TODO: Replace with actual backend call
  console.log("User signed up:", { name, email, password });

  alert("Signup successful!");
  window.location.href = "/Civic-track-Just-Coders/frontend/homepage/homepage.html";
});
