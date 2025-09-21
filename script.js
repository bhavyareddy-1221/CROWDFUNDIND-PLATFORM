const form = document.getElementById("createProject");
const projectsSection = document.getElementById("projects");

let projects = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const goal = parseInt(document.getElementById("goal").value);

  const project = {
    title,
    description,
    goal,
    raised: 0,
    updates: []
  };

  projects.push(project);
  renderProjects();
  form.reset();
  document.getElementById("projectForm").style.display = "none";
});

function renderProjects() {
  projectsSection.innerHTML = "<h2>Active Projects</h2>";
  projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p><strong>Goal:</strong> ₹${project.goal}</p>
      <p><strong>Raised:</strong> ₹${project.raised}</p>
      <button onclick="contribute(${index})">Contribute</button>
      <button onclick="addUpdate(${index})">Add Update</button>
      <div id="updates-${index}">
        ${project.updates.map(u => `<div class="update">🔔 ${u}</div>`).join("")}
      </div>
    `;
    projectsSection.appendChild(card);
  });
}

function contribute(index) {
  const amount = prompt("Enter contribution amount (₹):");
  if (amount && !isNaN(amount)) {
    projects[index].raised += parseInt(amount);
    renderProjects();
  }
}

function addUpdate(index) {
  const update = prompt("Enter project update:");
  if (update) {
    projects[index].updates.push(update);
    renderProjects();
  }
}

function showForm() {
  document.getElementById("projectForm").style.display = "block";
}
