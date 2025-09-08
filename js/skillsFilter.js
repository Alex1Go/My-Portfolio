// skillsFilter.js - Skills Filtering (Fixed)
export function initSkillsFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!filterButtons.length || !skillCards.length) {
    console.warn('Skills filter elements not found');
    return;
  }

  // Функция анимации прогресс-баров
  function animateProgressBars() {
    const visibleCards = document.querySelectorAll('.skill-card:not(.hidden)');

    visibleCards.forEach((card, index) => {
      const progressFill = card.querySelector('.progress-bar-fill');
      if (!progressFill) return;

      // Получаем целевую ширину из data-атрибута или стиля
      let targetWidth = progressFill.getAttribute('data-width') || progressFill.style.width;

      // Если ширина не задана, попробуем получить из CSS переменной или установить значение по умолчанию
      // if (!targetWidth || targetWidth === '0%') {
      //   // Можно установить значения по умолчанию для каждой технологии
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

      // Сохраняем целевую ширину в data-атрибуте для последующих анимаций
      progressFill.setAttribute('data-width', targetWidth);

      // Сбрасываем ширину
      progressFill.style.width = '0%';
      progressFill.style.transition = 'none';

      // Анимируем с задержкой
      setTimeout(() => {
        progressFill.style.transition = 'width 1s ease-out';
        progressFill.style.width = targetWidth;
      }, index * 100);
    });
  }

  // Инициализация фильтров
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      // Обновляем активную кнопку
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Фильтруем карточки
      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          // Добавляем класс для плавного появления
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

      // Перезапускаем анимацию прогресс-баров после фильтрации
      setTimeout(animateProgressBars, 100);
    });
  });

  // Запускаем анимацию прогресс-баров при загрузке
  setTimeout(animateProgressBars, 500);

  // Возвращаем функцию для ручного запуска анимации
  return {
    animateProgressBars,
  };
}
