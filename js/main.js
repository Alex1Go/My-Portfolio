// // 3D Scene for Hero Section
// document.addEventListener('DOMContentLoaded', function () {
//   // ========== THEME TOGGLE FUNCTIONALITY ==========
//   const themeToggle = document.getElementById('theme-toggle');
//   const themeIcon = document.getElementById('theme-icon');
//   const body = document.body;

//   // Check for saved theme preference or default to 'dark'
//   const savedTheme = localStorage.getItem('theme') || 'dark';

//   // Apply saved theme
//   if (savedTheme === 'light') {
//     body.classList.add('light-theme');
//     themeIcon.classList.remove('fa-sun');
//     themeIcon.classList.add('fa-moon');
//   }

//   // Theme toggle event listener
//   themeToggle.addEventListener('click', function () {
//     if (body.classList.contains('light-theme')) {
//       // Switch to dark theme
//       body.classList.remove('light-theme');
//       themeIcon.classList.remove('fa-moon');
//       themeIcon.classList.add('fa-sun');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       // Switch to light theme
//       body.classList.add('light-theme');
//       themeIcon.classList.remove('fa-sun');
//       themeIcon.classList.add('fa-moon');
//       localStorage.setItem('theme', 'light');
//     }
//   });

//   // Three.js scene
//   const canvasContainer = document.getElementById('canvas-container');

//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   canvasContainer.appendChild(renderer.domElement);

//   // Частицы
//   const particlesGeometry = new THREE.BufferGeometry();
//   const particlesCount = 1000;

//   const posArray = new Float32Array(particlesCount * 3);

//   for (let i = 0; i < particlesCount * 3; i++) {
//     posArray[i] = (Math.random() - 0.5) * 10;
//   }

//   particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

//   const particlesMaterial = new THREE.PointsMaterial({
//     size: 0.02,
//     color: 0x00f7ff,
//     transparent: true,
//     opacity: 0.8,
//     blending: THREE.AdditiveBlending,
//     depthWrite: false,
//   });

//   const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//   scene.add(particlesMesh);

//   camera.position.z = 3;

//   // Цикл анимации
//   function animate() {
//     requestAnimationFrame(animate);

//     particlesMesh.rotation.x += 0.0005;
//     particlesMesh.rotation.y += 0.0005;

//     renderer.render(scene, camera);
//   }

//   animate();

//   // Управление изменением размера окна
//   window.addEventListener('resize', function () {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   });

//   // Эффект подсветки курсора
//   const cursorHighlight = document.getElementById('cursor-highlight');
//   document.addEventListener('mousemove', function (e) {
//     cursorHighlight.style.left = e.clientX + 'px';
//     cursorHighlight.style.top = e.clientY + 'px';
//   });

//   // Эффект частиц для контактного сечения
//   const particlesContainer = document.getElementById('particles');
//   const particleCount = 50;

//   for (let i = 0; i < particleCount; i++) {
//     const particle = document.createElement('div');
//     particle.className = 'particle';
//     particle.style.left = Math.random() * 100 + '%';
//     particle.style.top = Math.random() * 100 + '%';
//     particlesContainer.appendChild(particle);

//     // Анимация частиц
//     setInterval(() => {
//       particle.style.left = Math.random() * 100 + '%';
//       particle.style.top = Math.random() * 100 + '%';
//     }, Math.random() * 3000 + 2000);
//   }

//   // Анимации GSAP
//   gsap.registerPlugin(ScrollTrigger);

//   // Анимация секций при скролле
//   gsap.utils.toArray('.section').forEach(section => {
//     gsap.from(section, {
//       scrollTrigger: {
//         trigger: section,
//         start: 'top bottom',
//         toggleActions: 'play none none none',
//       },
//       y: 50,
//       opacity: 0,
//       duration: 1,
//       ease: 'power3.out',
//     });
//   });

//   // Анимация карточек скилов
//   gsap.utils.toArray('.skill-card').forEach((card, i) => {
//     gsap.from(card, {
//       scrollTrigger: {
//         trigger: card,
//         start: 'top 80%',
//         toggleActions: 'play none none none',
//       },
//       y: 50,
//       opacity: 0,
//       duration: 0.5,
//       delay: i * 0.1,
//       ease: 'power3.out',
//     });
//   });

//   // Навигация по слайдеру проекта
//   const slider = document.querySelector('.project-slider');
//   const prevBtn = document.querySelector('.absolute.left-0 button');
//   const nextBtn = document.querySelector('.absolute.right-0 button');

//   let currentSlide = 0;
//   const slideWidth = document.querySelector('.project-card').offsetWidth;

//   nextBtn.addEventListener('click', () => {
//     currentSlide = (currentSlide + 1) % document.querySelectorAll('.project-card').length;
//     slider.scrollTo({
//       left: currentSlide * slideWidth,
//       behavior: 'smooth',
//     });
//   });

//   prevBtn.addEventListener('click', () => {
//     currentSlide =
//       (currentSlide - 1 + document.querySelectorAll('.project-card').length) %
//       document.querySelectorAll('.project-card').length;
//     slider.scrollTo({
//       left: currentSlide * slideWidth,
//       behavior: 'smooth',
//     });
//   });

//   // Плавная прокрутка для навигации
//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//       e.preventDefault();

//       document.querySelector(this.getAttribute('href')).scrollIntoView({
//         behavior: 'smooth',
//       });
//     });
//   });

//   // Переключение темного/светлого режима (упрощенно)
//   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//   if (!prefersDark) {
//     document.documentElement.classList.add('light-mode');
//   }

//   // Бегущий текст
//   const runningText = document.querySelector('.running-text');
//   if (runningText) {
//     runningText.innerHTML = runningText.textContent.repeat(3);
//   }

//   // Фильтрация скилов по категориям
//   function initSkillsFilter() {
//     const filterButtons = document.querySelectorAll('.filter-btn');
//     const skillCards = document.querySelectorAll('.skill-card');

//     filterButtons.forEach(button => {
//       button.addEventListener('click', function () {
//         const filter = this.getAttribute('data-filter');

//         // Обновляем активную кнопку
//         filterButtons.forEach(btn => btn.classList.remove('active'));
//         this.classList.add('active');

//         // Фильтруем карточки
//         skillCards.forEach(card => {
//           const category = card.getAttribute('data-category');

//           if (filter === 'all' || category === filter) {
//             card.classList.remove('hidden');
//           } else {
//             card.classList.add('hidden');
//           }
//         });
//       });
//     });
//   }

//   // Инициализируем фильтр скилов
//   initSkillsFilter();

//   // Анимация прогресс-баров при появлении в области видимости
//   function animateProgressBars() {
//     const skillCards = document.querySelectorAll('.skill-card:not(.hidden)');

//     skillCards.forEach((card, index) => {
//       const progressFill = card.querySelector('.progress-bar-fill');
//       const targetWidth = progressFill.style.width;

//       // Сбрасываем ширину
//       progressFill.style.width = '0%';

//       // Анимируем с задержкой
//       setTimeout(() => {
//         progressFill.style.width = targetWidth;
//       }, index * 100);
//     });
//   }

//   // Запускаем анимацию прогресс-баров при загрузке
//   setTimeout(animateProgressBars, 500);

//   // Перезапускаем анимацию при смене фильтра
//   document.querySelectorAll('.filter-btn').forEach(btn => {
//     btn.addEventListener('click', function () {
//       setTimeout(animateProgressBars, 100);
//     });
//   });
// });

import { initThemeToggle } from './themeToggle.js';
import { initThreeScene } from './threeScene.js';
import { initCursorEffects } from './cursorEffects.js';
import { initScrollAnimations } from './scrollAnimations.js';
import { initProjectSlider } from './projectSlider.js';
import { initSkillsFilter } from './skillsFilter.js';
import { initSmoothScroll } from './smoothScroll.js';
import { initRunningText } from './runningText.js';

// Main initialization function
function initApp() {
  try {
    // Initialize theme toggle
    initThemeToggle();

    // Initialize 3D scene
    if (typeof THREE !== 'undefined') {
      initThreeScene();
    } else {
      console.warn('⚠ Three.js not loaded, skipping 3D scene');
    }

    // Initialize cursor effects
    initCursorEffects();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize project slider
    initProjectSlider();

    // Initialize skills filter
    const skillsFilter = initSkillsFilter();

    // Initialize smooth scroll
    initSmoothScroll();

    // Initialize running text
    initRunningText();

    // Return cleanup functions if needed
    return {
      skillsFilter,
    };
  } catch (error) {
    console.error('❌ Error initializing application:', error);
  }
}

document.addEventListener('DOMContentLoaded', initApp);

export { initApp };
