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

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  
  console.log("Login attempt:", { email, password });

  
  if (email === "test@example.com" && password === "123456") {
    alert("Login successful!");
    window.location.href = "/Civic-track-Just-Coders/frontend/homepage/homepage.html";
  } else {
    alert("Invalid credentials. Try test@example.com / 123456");
  }
});
