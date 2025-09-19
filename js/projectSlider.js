// projectSlider.js - Project Slider Navigation (Fixed)
export function initProjectSlider() {
  const slider = document.querySelector('.project-slider');
  const projectCards = document.querySelectorAll('.project-card');

  const prevBtn = document.querySelector('.absolute.left-0 button');
  const nextBtn = document.querySelector('.absolute.right-0 button');

  if (!slider || !projectCards.length || !prevBtn || !nextBtn) {
    console.warn('Project slider elements not found');
    return;
  }

  let currentSlide = 0;

  function getSlideWidth() {
    const card = projectCards[0];
    const cardRect = card.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(card);
    const marginLeft = parseFloat(computedStyle.marginLeft) || 0;
    const marginRight = parseFloat(computedStyle.marginRight) || 0;
    return cardRect.width + marginLeft + marginRight;
  }

  function updateSliderPosition() {
    const slideWidth = getSlideWidth();
    slider.scrollTo({
      left: currentSlide * slideWidth,
      behavior: 'smooth',
    });
  }

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % projectCards.length;
    updateSliderPosition();
  });

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + projectCards.length) % projectCards.length;
    updateSliderPosition();
  });

  function handleResize() {
    updateSliderPosition();
  }

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}
