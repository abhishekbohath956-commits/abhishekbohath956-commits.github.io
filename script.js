// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== TYPING EFFECT — words appear one by one in a single line with | separator =====
const linesContainer = document.getElementById('typed-lines');
const lines = [
  'Restaurant Captain',
  'Guest Service',
  'Floor Management',
  'Team Coordination'
];

function showLines() {
  lines.forEach((text, i) => {
    setTimeout(() => {
      // add separator before each word except the first
      if (i > 0) {
        const sep = document.createElement('span');
        sep.classList.add('typed-sep');
        sep.textContent = '|';
        linesContainer.appendChild(sep);
        setTimeout(() => sep.classList.add('show'), 100);
      }
      const word = document.createElement('span');
      word.classList.add('typed-word');
      word.textContent = text;
      linesContainer.appendChild(word);
      setTimeout(() => word.classList.add('show'), 150);
    }, i * 600);
  });
}

setTimeout(showLines, 600);

// ===== TIMELINE SLIDE-IN FROM LEFT =====
const timelineCards = document.querySelectorAll('.timeline-card');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger each card slightly
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 150);
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

timelineCards.forEach(card => timelineObserver.observe(card));

// ===== GENERAL SCROLL REVEAL (non-timeline) =====
const revealEls = document.querySelectorAll(
  '.skill-card, .edu-card, .contact-card, .about-grid, .strength-tag, .section-title'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.05}s, transform 0.55s ease ${i * 0.05}s`;
  revealObserver.observe(el);
});

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
        link.style.color = '#c084fc';
      }
    }
  });
});
