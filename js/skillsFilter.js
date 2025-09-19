// skillsFilter.js - Skills Filtering (Fixed)
export function initSkillsFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!filterButtons.length || !skillCards.length) {
    console.warn('Skills filter elements not found');
    return;
  }

  function animateProgressBars() {
    const visibleCards = document.querySelectorAll('.skill-card:not(.hidden)');

    visibleCards.forEach((card, index) => {
      const progressFill = card.querySelector('.progress-bar-fill');
      if (!progressFill) return;

      let targetWidth = progressFill.getAttribute('data-width') || progressFill.style.width;

      // if (!targetWidth || targetWidth === '0%') {
      //   const techMap = {
      //     react: '90%',
      //     javascript: '85%',
      //     html: '95%',
      //     css: '90%',
      //     nodejs: '80%',
      //     mongodb: '75%',
      //     default: '70%',
      //   };

      //   const techName = card.getAttribute('data-category') || 'default';
      //   targetWidth = techMap[techName] || techMap['default'];
      // }

      progressFill.setAttribute('data-width', targetWidth);

      progressFill.style.width = '0%';
      progressFill.style.transition = 'none';

      setTimeout(() => {
        progressFill.style.transition = 'width 1s ease-out';
        progressFill.style.width = targetWidth;
      }, index * 100);
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease-in-out';
            card.style.opacity = '1';
          }, 50);
        } else {
          card.classList.add('hidden');
          card.style.opacity = '0';
        }
      });

      setTimeout(animateProgressBars, 100);
    });
  });

  setTimeout(animateProgressBars, 500);

  return {
    animateProgressBars,
  };
}
