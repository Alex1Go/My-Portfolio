// themeToggle.js - Theme Toggle Functionality
export function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  if (!themeToggle || !themeIcon) {
    console.warn('Theme toggle elements not found');
    return;
  }

  // const savedTheme = localStorage.getItem('theme') || 'dark';

  // Для artifacts используем переменную:
  let currentTheme = 'dark';

  // Apply saved theme
  if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }

  // Theme toggle event listener
  themeToggle.addEventListener('click', function () {
    if (body.classList.contains('light-theme')) {
      // Switch to dark theme
      body.classList.remove('light-theme');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      currentTheme = 'dark';
      // localStorage.setItem('theme', 'dark');
    } else {
      // Switch to light theme
      body.classList.add('light-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      currentTheme = 'light';
      // localStorage.setItem('theme', 'light');
    }
  });

  // Detect system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (!prefersDark && currentTheme === 'dark') {
    document.documentElement.classList.add('light-mode');
  }
}
