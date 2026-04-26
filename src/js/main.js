import '../css/base.css';
import '../css/layout.css';
import Tracking from './TrackingManager';

document.addEventListener('DOMContentLoaded', () => {
  Tracking.init();

  // Mobile Menu Toggle - Restored logic
  const menuBtn = document.getElementById('menuToggle');
  const nav = document.getElementById('mainMenu');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isVisible = nav.style.display === 'block';
      nav.style.display = isVisible ? 'none' : 'block';
      menuBtn.classList.toggle('is-active');
    });
  }

  // Sticky Header Scroll Effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Lazy Loading for background images (optional if using <img> tags with loading="lazy")
  const lazyBackgrounds = document.querySelectorAll('.lazy-bg');
  if ('IntersectionObserver' in window) {
    let bgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bg = entry.target;
          const src = bg.getAttribute('data-bg');
          if (src) bg.style.backgroundImage = `url(${src})`;
          observer.unobserve(bg);
        }
      });
    });
    lazyBackgrounds.forEach(bg => bgObserver.observe(bg));
  }
});
