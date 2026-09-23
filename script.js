const modal = document.getElementById("modal");

function openModal() {
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

function scrollToTasks() {
    document.getElementById("tasks").scrollIntoView({
        behavior: "smooth"
    });
}

function toggleTask(button) {

    const task = button.parentElement;

    task.classList.toggle("completed");

    updateStats();
}

function updateStats() {

    const tasks = document.querySelectorAll(".task");
    const completed = document.querySelectorAll(".task.completed");

    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("completedTasks").textContent = completed.length;
    document.getElementById("pendingTasks").textContent =
        tasks.length - completed.length;

    let percentage = tasks.length === 0
        ? 0
        : Math.round((completed.length / tasks.length) * 100);

    document.getElementById("heroPercent").textContent =
        percentage + "%";

    document.querySelector(".circle-progress").style.background =
        `conic-gradient(#635bff ${percentage}%, #e9e9f2 0)`;
}

function addTask() {

    const name = document.getElementById("taskInput").value.trim();
    const description =
        document.getElementById("descriptionInput").value.trim();

    const category =
        document.getElementById("categoryInput").value;

    if (name === "") {
        alert("Please enter a task name.");
        return;
    }

    const taskList = document.getElementById("taskList");

    const task = document.createElement("div");

    task.className = "task";

    task.innerHTML = `
        <button class="check-btn" onclick="toggleTask(this)">✓</button>

        <div class="task-info">
            <h3>${name}</h3>
            <p>${description || "No description added."}</p>
        </div>

        <span class="tag ${category}">
            ${category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
    `;

    taskList.appendChild(task);

    document.getElementById("taskInput").value = "";
    document.getElementById("descriptionInput").value = "";

    closeModal();

    updateStats();
}

document.getElementById("themeBtn").addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        this.textContent = "☀️";
    } else {
        this.textContent = "🌙";
    }

});

window.addEventListener("click", function(event) {

    if (event.target === modal) {
        closeModal();
    }

});

updateStats();