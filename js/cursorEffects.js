// cursorEffects.js - Cursor and Particle Effects
export function initCursorEffects() {
  const cursorHighlight = document.getElementById('cursor-highlight');

  if (cursorHighlight) {
    document.addEventListener('mousemove', function (e) {
      cursorHighlight.style.left = e.clientX + 'px';
      cursorHighlight.style.top = e.clientY + 'px';
    });
  }

  const particlesContainer = document.getElementById('particles');

  if (particlesContainer) {
    const particleCount = 50;
    const particleIntervals = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particlesContainer.appendChild(particle);

      const interval = setInterval(() => {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
      }, Math.random() * 3000 + 2000);

      particleIntervals.push(interval);
    }

    return () => {
      particleIntervals.forEach(interval => clearInterval(interval));
    };
  }
}
