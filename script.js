const STORAGE_KEY = "habitflow_task17";

let habits = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

let selectedIcon = "📚";

const modalOverlay = document.getElementById("modalOverlay");
const openModalBtn = document.getElementById("openModal");
const emptyAddBtn = document.getElementById("emptyAddBtn");
const closeModalBtn = document.getElementById("closeModal");

const habitForm = document.getElementById("habitForm");
const habitNameInput = document.getElementById("habitName");

const habitsContainer = document.getElementById("habitsContainer");
const emptyState = document.getElementById("emptyState");

const totalHabits = document.getElementById("totalHabits");
const completedToday = document.getElementById("completedToday");
const bestStreak = document.getElementById("bestStreak");
const weeklyPercentage = document.getElementById("weeklyPercentage");
const todayPercentage = document.getElementById("todayPercentage");

const progressRing = document.getElementById("progressRing");

const currentDay = document.getElementById("currentDay");
const currentDate = document.getElementById("currentDate");

const weekDays = document.getElementById("weekDays");
const weeklyGrid = document.getElementById("weeklyGrid");
const weekLabel = document.getElementById("weekLabel");


/* =========================
   DATE HELPERS
========================= */

function getDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function getStartOfWeek(date = new Date()) {

  const d = new Date(date);

  const day = d.getDay();

  const difference = day === 0 ? -6 : 1 - day;

  d.setDate(d.getDate() + difference);

  d.setHours(0, 0, 0, 0);

  return d;
}


function getWeekDates() {

  const start = getStartOfWeek();

  return Array.from({ length: 7 }, (_, index) => {

    const date = new Date(start);

    date.setDate(start.getDate() + index);

    return date;

  });

}


/* =========================
   DATE DISPLAY
========================= */

function updateDateDisplay() {

  const today = new Date();

  currentDay.textContent =
    today.toLocaleDateString("en-US", {
      weekday: "long"
    });

  currentDate.textContent =
    today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

}


/* =========================
   LOCAL STORAGE
========================= */

function saveHabits() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(habits)
  );

}


/* =========================
   MODAL
========================= */

function openModal() {

  modalOverlay.classList.add("show");

  setTimeout(() => {
    habitNameInput.focus();
  }, 100);

}


function closeModal() {

  modalOverlay.classList.remove("show");

  habitForm.reset();

  selectedIcon = "📚";

  document
    .querySelectorAll(".emoji")
    .forEach((button, index) => {
      button.classList.toggle("active", index === 0);
    });

}


openModalBtn.addEventListener("click", openModal);

emptyAddBtn.addEventListener("click", openModal);

closeModalBtn.addEventListener("click", closeModal);


modalOverlay.addEventListener("click", event => {

  if (event.target === modalOverlay) {
    closeModal();
  }

});


document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeModal();
  }

});


/* =========================
   ICON SELECTION
========================= */

document.querySelectorAll(".emoji").forEach(button => {

  button.addEventListener("click", () => {

    document
      .querySelectorAll(".emoji")
      .forEach(item => item.classList.remove("active"));

    button.classList.add("active");

    selectedIcon = button.dataset.icon;

  });

});


/* =========================
   ADD HABIT
========================= */

habitForm.addEventListener("submit", event => {

  event.preventDefault();

  const name = habitNameInput.value.trim();

  if (!name) return;

  const habit = {

    id: crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString(),

    name,

    icon: selectedIcon,

    completed: {}

  };

  habits.push(habit);

  saveHabits();

  closeModal();

  render();

});


/* =========================
   COMPLETE HABIT
========================= */

function toggleHabit(id) {

  const habit = habits.find(item => item.id === id);

  if (!habit) return;

  const today = getDateKey();

  habit.completed[today] =
    !habit.completed[today];

  saveHabits();

  render();

}


/* =========================
   DELETE HABIT
========================= */

function deleteHabit(id) {

  const habit = habits.find(item => item.id === id);

  if (!habit) return;

  const confirmed =
    confirm(`Delete "${habit.name}"?`);

  if (!confirmed) return;

  habits =
    habits.filter(item => item.id !== id);

  saveHabits();

  render();

}


/* =========================
   STREAK CALCULATION
========================= */

function calculateCurrentStreak(habit) {

  let streak = 0;

  const date = new Date();

  while (true) {

    const key = getDateKey(date);

    if (habit.completed[key]) {

      streak++;

      date.setDate(
        date.getDate() - 1
      );

    } else {

      break;

    }

  }

  return streak;

}


function calculateBestStreak(habit) {

  const dates =
    Object.keys(habit.completed)
      .filter(date => habit.completed[date])
      .sort();

  if (!dates.length) return 0;

  let best = 1;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {

    const previous =
      new Date(dates[i - 1]);

    const currentDate =
      new Date(dates[i]);

    const difference =
      Math.round(
        (currentDate - previous) /
        (1000 * 60 * 60 * 24)
      );

    if (difference === 1) {

      current++;

      best = Math.max(best, current);

    } else {

      current = 1;

    }

  }

  return best;

}


/* =========================
   WEEKLY CALCULATIONS
========================= */

function getWeeklyPercentage() {

  if (!habits.length) return 0;

  const dates = getWeekDates();

  let completed = 0;

  const total =
    habits.length * 7;

  habits.forEach(habit => {

    dates.forEach(date => {

      const key = getDateKey(date);

      if (habit.completed[key]) {
        completed++;
      }

    });

  });

  return Math.round(
    (completed / total) * 100
  );

}


/* =========================
   TODAY PROGRESS
========================= */

function getTodayProgress() {

  if (!habits.length) {

    return {
      completed: 0,
      percentage: 0
    };

  }

  const today = getDateKey();

  const completed =
    habits.filter(
      habit => habit.completed[today]
    ).length;

  const percentage =
    Math.round(
      (completed / habits.length) * 100
    );

  return {
    completed,
    percentage
  };

}


/* =========================
   RENDER HABITS
========================= */

function renderHabits() {

  habitsContainer.innerHTML = "";

  if (!habits.length) {

    emptyState.style.display = "block";

    return;

  }

  emptyState.style.display = "none";

  const today = getDateKey();

  habits.forEach(habit => {

    const completed =
      Boolean(habit.completed[today]);

    const streak =
      calculateCurrentStreak(habit);

    const card =
      document.createElement("div");

    card.className = "habit-card";

    card.innerHTML = `

      <div class="habit-info">

        <div class="habit-icon">
          ${habit.icon}
        </div>

        <div>

          <div class="habit-name">
            ${escapeHTML(habit.name)}
          </div>

          <div class="habit-meta">
            ${completed
              ? "Completed today"
              : "Not completed yet"}
          </div>

        </div>

      </div>

      <div class="streak">
        🔥 ${streak} day${streak === 1 ? "" : "s"}
      </div>

      <button
        class="complete-btn ${completed ? "completed" : ""}"
        onclick="toggleHabit('${habit.id}')"
        aria-label="Toggle completion"
      >
        ${completed ? "✓" : "○"}
      </button>

      <button
        class="delete-btn"
        onclick="deleteHabit('${habit.id}')"
        aria-label="Delete habit"
      >
        🗑
      </button>

    `;

    habitsContainer.appendChild(card);

  });

}


/* =========================
   WEEKLY GRID
========================= */

function renderWeeklyGrid() {

  const dates = getWeekDates();

  weekDays.innerHTML = dates
    .map(date => {

      const day =
        date.toLocaleDateString(
          "en-US",
          { weekday: "short" }
        );

      return `<span>${day}</span>`;

    })
    .join("");

  const start = dates[0];

  const end = dates[6];

  weekLabel.textContent =
    `${start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    })} – ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    })}`;

  weeklyGrid.innerHTML = "";

  habits.forEach(habit => {

    const row =
      document.createElement("div");

    row.className = "week-row";

    let cells = "";

    dates.forEach(date => {

      const key = getDateKey(date);

      const done =
        Boolean(habit.completed[key]);

      cells += `

        <div class="week-cell">

          <div class="day-dot ${done ? "done" : ""}">
            ${done ? "✓" : "·"}
          </div>

        </div>

      `;

    });

    row.innerHTML = `

      <div class="week-habit-name">
        ${habit.icon} ${escapeHTML(habit.name)}
      </div>

      ${cells}

    `;

    weeklyGrid.appendChild(row);

  });

}


/* =========================
   STATISTICS
========================= */

function renderStats() {

  const today =
    getTodayProgress();

  const weekly =
    getWeeklyPercentage();

  let best = 0;

  habits.forEach(habit => {

    best =
      Math.max(
        best,
        calculateBestStreak(habit)
      );

  });

  totalHabits.textContent =
    habits.length;

  completedToday.textContent =
    today.completed;

  bestStreak.textContent =
    `${best} day${best === 1 ? "" : "s"}`;

  weeklyPercentage.textContent =
    `${weekly}%`;

  todayPercentage.textContent =
    `${today.percentage}%`;

  progressRing.style.background = `

    radial-gradient(
      closest-side,
      #202335 76%,
      transparent 77% 99%
    ),

    conic-gradient(
      #8178ff ${today.percentage}%,
      rgba(255,255,255,.12) ${today.percentage}%
    )

  `;

}


/* =========================
   SECURITY / TEXT ESCAPING
========================= */

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}


/* =========================
   MAIN RENDER
========================= */

function render() {

  updateDateDisplay();

  renderHabits();

  renderWeeklyGrid();

  renderStats();

}


/* =========================
   MIDNIGHT REFRESH
========================= */

function scheduleMidnightRefresh() {

  const now = new Date();

  const tomorrow = new Date(now);

  tomorrow.setDate(
    now.getDate() + 1
  );

  tomorrow.setHours(
    0, 0, 1, 0
  );

  const delay =
    tomorrow.getTime() -
    now.getTime();

  setTimeout(() => {

    render();

    scheduleMidnightRefresh();

  }, delay);

}


/* =========================
   INITIALIZE
========================= */

render();

scheduleMidnightRefresh();
