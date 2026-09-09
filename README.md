# 🌱 HabitFlow — Habit Tracker

A modern, responsive Habit Tracker web application built using HTML5, CSS3, and JavaScript as part of the **Veda Technology Web Development Internship – Task 17**.

HabitFlow allows users to create habits, track daily completion, monitor streaks, view weekly progress, and save their data using browser LocalStorage.

---

## 🚀 Live Demo

👉 **[View HabitFlow Live Demo](https://silambarasanc199-jpg.github.io/task-17-habit-tracker/)**

---

## 📌 Task Information

- **Company:** Veda Technology
- **Internship:** Web Development Internship
- **Task:** Task 17 – Habit Tracker
- **Domain:** Web Development
- **Technologies:** HTML5, CSS3, JavaScript
- **Storage:** LocalStorage
- **Deployment:** GitHub Pages

---

## 🎯 Project Objective

The objective of this project is to develop a responsive and interactive habit tracking application that helps users create habits, mark daily completion, monitor consecutive-day streaks, and review their weekly progress.

---

## ✨ Features

- ➕ Add new habits
- 🗑️ Delete habits
- ✅ Mark habits as completed
- 🔥 Current streak calculation
- 🏆 Best streak calculation
- 📊 Daily progress percentage
- 📈 Weekly completion percentage
- 📅 Weekly habit progress grid
- 💾 LocalStorage data persistence
- 🔄 Data remains available after page refresh
- 📱 Responsive mobile design
- 💻 Responsive desktop design
- 🎨 Modern UI/UX
- 🧩 Habit icon selection
- ⚡ Interactive user interface

---

## 🛠️ Technologies Used

### HTML5

Used to create the structure and layout of the Habit Tracker application.

### CSS3

Used for:

- Responsive layouts
- Flexbox
- CSS Grid
- Modern UI styling
- Gradients
- Cards
- Buttons
- Progress indicators
- Modal interface
- Responsive mobile design

### JavaScript

Used to implement:

- Habit creation
- Habit deletion
- Daily completion tracking
- Current streak calculation
- Best streak calculation
- Weekly progress calculation
- Dynamic DOM rendering
- Modal interactions
- Date handling
- LocalStorage persistence

### LocalStorage

Browser LocalStorage is used to store habits and completion records so that user progress remains available after refreshing the browser.

---

## 📊 Dashboard

The dashboard displays an overview of habit performance:

- **Total Habits**
- **Completed Today**
- **Best Streak**
- **Weekly Progress**
- **Today's Completion Percentage**

---

## 🔥 Streak Tracking

HabitFlow calculates consecutive completed days for each habit.

When a habit is completed on consecutive days, the current streak increases automatically.

The application also calculates the best streak achieved by the user.

---

## 📅 Weekly Overview

The weekly overview provides a seven-day completion grid for every habit.

Example:

```text
        Mon Tue Wed Thu Fri Sat Sun
Reading  ✓   ✓   ·   ✓   ✓   ·   ·
Workout  ✓   ·   ✓   ✓   ✓   ✓   ·
Coding   ✓   ✓   ✓   ✓   ·   ✓   ·
