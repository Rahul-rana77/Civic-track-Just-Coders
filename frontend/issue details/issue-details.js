async function loadIssue() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  try {
    const res = await fetch("http://localhost:8000/api/issues");
    const issues = await res.json();
    const issue = issues.find(i => i.id == id);

    if (!issue) {
      document.body.innerHTML = "<p>Issue not found.</p>";
      return;
    }

    // Fill details
    document.getElementById("issueTitle").textContent = issue.title;
    const statusElem = document.getElementById("issueStatus");
    statusElem.textContent = issue.status || 'Reported';
    statusElem.classList.add(issue.status?.toLowerCase().replace(" ", "-"));
    document.getElementById("issueCategory").textContent = issue.category;
    document.getElementById("issueDate").textContent = new Date(issue.createdAt || Date.now()).toLocaleDateString();
    document.getElementById("issueLocation").textContent = issue.location;
    document.getElementById("issueDescription").textContent = issue.description || "No description provided";

    const imageUrl = issue.photoUrl
      ? `http://localhost:8000${issue.photoUrl}`
      : "https://via.placeholder.com/600x300?text=No+Image";
    document.getElementById("issueImage").src = imageUrl;

    // Lightbox for image
    document.querySelector(".clickable-img").addEventListener("click", () => {
      const win = window.open(imageUrl, "_blank");
      win.focus();
    });

    // Map Setup
    const map = L.map('map').setView([28.6139, 77.2090], 13); // Default to Delhi
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    if (issue.lat && issue.lng) {
      map.setView([issue.lat, issue.lng], 15);
      L.marker([issue.lat, issue.lng]).addTo(map)
        .bindPopup(`<b>${issue.title}</b><br>${issue.location}`);
    }

    // Similar Issues
    const similarContainer = document.getElementById("similarIssues");
    const similar = issues.filter(i => i.category === issue.category && i.id !== issue.id).slice(0, 4);
    similar.forEach(s => {
      const card = document.createElement("div");
      card.style.border = "1px solid #ccc";
      card.style.borderRadius = "8px";
      card.style.padding = "8px";
      card.innerHTML = `
        <img src="${s.photoUrl ? `http://localhost:8000${s.photoUrl}` : 'https://via.placeholder.com/200'}" style="width:100%; height:120px; object-fit:cover; border-radius:6px;">
        <h4>${s.title}</h4>
        <p>Status: ${s.status}</p>
      `;
      card.onclick = () => window.location.href = `issue-details.html?id=${s.id}`;
      similarContainer.appendChild(card);
    });

    // Upvote System
    const votesKey = `votes_${id}`;
    let votes = parseInt(localStorage.getItem(votesKey) || "0");
    document.getElementById("voteCount").textContent = votes;
    document.getElementById("upvoteBtn").addEventListener("click", () => {
      votes++;
      localStorage.setItem(votesKey, votes);
      document.getElementById("voteCount").textContent = votes;
    });

    // Comment System
    const commentsKey = `comments_${id}`;
    let comments = JSON.parse(localStorage.getItem(commentsKey) || "[]");
    const commentsList = document.getElementById("commentsList");

    function renderComments() {
      commentsList.innerHTML = comments.map(c => `<p>💬 ${c}</p>`).join("");
    }
    renderComments();

    document.getElementById("postCommentBtn").addEventListener("click", () => {
      const text = document.getElementById("commentInput").value.trim();
      if (!text) return;
      comments.push(text);
      localStorage.setItem(commentsKey, JSON.stringify(comments));
      document.getElementById("commentInput").value = "";
      renderComments();
    });

  } catch (err) {
    console.error("Error fetching issue:", err);
    document.body.innerHTML = "<p>Error loading issue.</p>";
  }
}

window.onload = loadIssue;
