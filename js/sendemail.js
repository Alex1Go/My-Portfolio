// Email service configuration
const EMAIL_CONFIG = {
  userId: 'dQmmS8z9yyRz7icJ_',
  serviceId: 'service_uot8wkk',
  templateId: 'template_2diarit',
};

function initEmailService() {
  try {
    if (typeof emailjs === 'undefined') {
      console.warn('⚠ EmailJS library not loaded');
      return;
    }
    emailjs.init(EMAIL_CONFIG.userId);
    console.log('✅ EmailJS initialized successfully');
    setupContactForm();
  } catch (error) {
    console.error('❌ Error initializing email service:', error);
  }
}

function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) {
    console.warn('⚠ Contact form not found on page');
    return;
  }
  contactForm.addEventListener('submit', handleFormSubmit);
  console.log('✅ Contact form handler attached');
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton ? submitButton.textContent : 'Send Message';

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.classList.add('opacity-50', 'cursor-not-allowed');
  }

  try {
    const response = await emailjs.sendForm(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, form);
    console.log('✅ Email sent successfully:', response);
    showSuccessNotification();
    resetForm(form);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    showErrorNotification();
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }
}

function showSuccessMessage() {
  showSuccessNotification();
}

function showErrorMessage() {
  showErrorNotification();
}

function resetForm(form) {
  form.reset();
}

function showSuccessNotification() {
  const notification = document.createElement('div');
  notification.className =
    'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
  notification.textContent = '✅ Message sent successfully!';

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = 'translateY(0)';
  }, 10);

  setTimeout(() => {
    notification.style.transform = 'translateY(-100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function showErrorNotification() {
  const notification = document.createElement('div');
  notification.className =
    'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
  notification.textContent = '❌ Failed to send message. Please try again.';

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = 'translateY(0)';
  }, 10);

  setTimeout(() => {
    notification.style.transform = 'translateY(-100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

export {
  initEmailService,
  handleFormSubmit,
  EMAIL_CONFIG,
  showSuccessNotification,
  showErrorNotification,
};
