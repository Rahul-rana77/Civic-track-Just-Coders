
    async function loadIssue() {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      if (!id) return;

      try {
        const res = await fetch("http://localhost:8000/api/issues");
        const issues = await res.json();
        const issue = issues.find(i => i.id == id);

        if (!issue) {
          document.querySelector('.container').innerHTML = "<p>Issue not found.</p>";
          return;
        }

        document.getElementById("issueTitle").textContent = issue.title;
        document.getElementById("issueStatus").textContent = issue.status || 'Reported';
        document.getElementById("issueStatus").classList.add(issue.status?.toLowerCase().replace(" ", "-"));
        document.getElementById("issueCategory").textContent = issue.category;
        document.getElementById("issueDate").textContent = new Date(issue.date || Date.now()).toLocaleDateString();
        document.getElementById("issueLocation").textContent = issue.location;
        document.getElementById("issueDescription").textContent = issue.description || "No description provided";

        let imageUrl = issue.photoUrl
            ? `http://localhost:8000${issue.photoUrl}`
            : "https://via.placeholder.com/600x300?text=No+Image";


        document.getElementById("issueImage").src = imageUrl

      } catch (err) {
        console.error("Error fetching issue:", err);
      }
    }

    window.onload = loadIssue;