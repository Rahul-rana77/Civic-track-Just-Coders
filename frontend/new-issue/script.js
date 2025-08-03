let button = document.getElementById("btn");

document.getElementById('issue-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', document.getElementById('title').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('category', document.getElementById('category').value);
  formData.append('location', document.getElementById('location').value);
  formData.append('isAnonymous', document.getElementById('anonymous').checked);
  formData.append('photo', document.getElementById('photo').files[0]);

  try {
    const res = await fetch('http://localhost:8000/api/issues', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
});

function back() {
  window.location.href = "/Civic-track-Just-Coders/frontend/homepage/index.html";
}

button.addEventListener("click",back);