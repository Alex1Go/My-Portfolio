import { initThemeToggle } from './themeToggle.js';
import { initThreeScene } from './threeScene.js';
import { initCursorEffects } from './cursorEffects.js';
import { initScrollAnimations } from './scrollAnimations.js';
import { initProjectSlider } from './projectSlider.js';
import { initSkillsFilter } from './skillsFilter.js';
import { initSmoothScroll } from './smoothScroll.js';
import { initRunningText } from './runningText.js';
import { initEmailService } from './sendemail.js';
import { initMobileMenu } from './mobileMenu.js';

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

    // Initialize email service
    initEmailService();

    // Initialize mobile menu
    initMobileMenu();

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
