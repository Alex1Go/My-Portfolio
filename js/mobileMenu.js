// Mobile menu state
let isMobileMenuOpen = false;

// Initialize mobile menu functionality
function initMobileMenu() {
  try {
    createMobileMenuHTML();
    setupMobileMenuEventListeners();
    console.log('✅ Mobile menu initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing mobile menu:', error);
  }
}

// Create mobile menu HTML structure
function createMobileMenuHTML() {
  const nav = document.querySelector('nav');
  if (!nav) {
    console.warn('⚠ Navigation element not found');
    return;
  }

  // Add mobile menu to navigation
  const mobileMenuHTML = `
    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu-overlay" class="fixed inset-0 bg-black bg-opacity-90 z-40 hidden md:hidden">
      <div class="flex items-center justify-center min-h-screen">
        <div class="text-center space-y-8">
          <a href="#home" class="mobile-menu-link block text-white text-2xl hover:text-primary transition-colors duration-300">Home</a>
          <a href="#about" class="mobile-menu-link block text-white text-2xl hover:text-primary transition-colors duration-300">About</a>
          <a href="#skills" class="mobile-menu-link block text-white text-2xl hover:text-primary transition-colors duration-300">Skills</a>
          <a href="#projects" class="mobile-menu-link block text-white text-2xl hover:text-primary transition-colors duration-300">Projects</a>
          <a href="#contact" class="mobile-menu-link block text-white text-2xl hover:text-primary transition-colors duration-300">Contact</a>
        </div>
      </div>
    </div>
  `;

  nav.insertAdjacentHTML('afterend', mobileMenuHTML);
}

// Setup event listeners for mobile menu
function setupMobileMenuEventListeners() {
  const mobileMenuButton = document.querySelector('nav button.md\\:hidden');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  if (!mobileMenuButton) {
    console.warn('⚠ Mobile menu button not found');
    return;
  }

  // Toggle menu on button click
  mobileMenuButton.addEventListener('click', toggleMobileMenu);

  // Close menu when clicking on overlay (outside menu content)
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', e => {
      // Close only if clicking on the overlay itself, not on menu items
      if (e.target === mobileMenuOverlay) {
        closeMobileMenu();
      }
    });
  }

  // Close menu when clicking on menu links
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      closeMobileMenu();
    }
  });

  // Handle window resize - close menu if switching to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isMobileMenuOpen) {
      closeMobileMenu();
    }
  });
}

// Toggle mobile menu
function toggleMobileMenu() {
  if (isMobileMenuOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

// Open mobile menu
function openMobileMenu() {
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const menuButton = document.querySelector('nav button.md\\:hidden');
  const menuIcon = menuButton?.querySelector('i');

  if (!mobileMenuOverlay) return;

  // Show overlay
  mobileMenuOverlay.classList.remove('hidden');

  // Add animation class
  setTimeout(() => {
    mobileMenuOverlay.classList.add('animate-fade-in');
  }, 10);

  // Change hamburger to X icon
  if (menuIcon) {
    menuIcon.className = 'fas fa-times text-2xl';
  }

  // Prevent body scrolling
  document.body.style.overflow = 'hidden';

  isMobileMenuOpen = true;
  console.log('📱 Mobile menu opened');
}

// Close mobile menu
function closeMobileMenu() {
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const menuButton = document.querySelector('nav button.md\\:hidden');
  const menuIcon = menuButton?.querySelector('i');

  if (!mobileMenuOverlay) return;

  // Add fade out animation
  mobileMenuOverlay.classList.remove('animate-fade-in');
  mobileMenuOverlay.classList.add('animate-fade-out');

  // Hide overlay after animation
  setTimeout(() => {
    mobileMenuOverlay.classList.add('hidden');
    mobileMenuOverlay.classList.remove('animate-fade-out');
  }, 300);

  // Change X back to hamburger icon
  if (menuIcon) {
    menuIcon.className = 'fas fa-bars text-2xl';
  }

  // Restore body scrolling
  document.body.style.overflow = '';

  isMobileMenuOpen = false;
  console.log('📱 Mobile menu closed');
}

// Modal functionality
let currentModal = null;

// Open modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    console.warn(`⚠ Modal with ID '${modalId}' not found`);
    return;
  }

  // Close any existing modal first
  if (currentModal && currentModal !== modal) {
    closeModal(currentModal.id);
  }

  modal.classList.remove('hidden');

  // Add animation
  setTimeout(() => {
    modal.classList.add('animate-fade-in');
  }, 10);

  // Prevent body scrolling
  document.body.style.overflow = 'hidden';

  currentModal = modal;
  console.log(`📋 Modal '${modalId}' opened`);
}

// Close modal
function closeModal(modalId) {
  const modal = modalId ? document.getElementById(modalId) : currentModal;
  if (!modal) return;

  // Add fade out animation
  modal.classList.remove('animate-fade-in');
  modal.classList.add('animate-fade-out');

  // Hide modal after animation
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('animate-fade-out');
  }, 300);

  // Restore body scrolling
  document.body.style.overflow = '';

  currentModal = null;
  console.log(`📋 Modal closed`);
}

// Setup modal event listeners (call this for each modal)
function setupModalEventListeners(modalId, openButtonSelector, closeButtonSelector = null) {
  const modal = document.getElementById(modalId);
  const openButton = document.querySelector(openButtonSelector);
  const closeButton = closeButtonSelector
    ? document.querySelector(closeButtonSelector)
    : modal?.querySelector('[data-close-modal]');

  if (openButton) {
    openButton.addEventListener('click', e => {
      e.preventDefault();
      openModal(modalId);
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', e => {
      e.preventDefault();
      closeModal(modalId);
    });
  }

  if (modal) {
    // Close on overlay click
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        closeModal(modalId);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && currentModal === modal) {
        closeModal(modalId);
      }
    });
  }
}

// Export functions
export {
  initMobileMenu,
  toggleMobileMenu,
  openMobileMenu,
  closeMobileMenu,
  openModal,
  closeModal,
  setupModalEventListeners,
};
