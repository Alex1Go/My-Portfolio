// scrollAnimations.js - GSAP Scroll Animations
export function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        toggleActions: 'play none none none',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });

  gsap.utils.toArray('.skill-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      y: 50,
      opacity: 0,
      duration: 0.5,
      delay: i * 0.1,
      ease: 'power3.out',
    });
  });
}
