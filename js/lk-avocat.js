/* LK-avocat — interactions */

// Header scroll state
const header = document.getElementById('header');
if (header) {
  const onScroll = () => header.classList.toggle('lk-header--scrolled', scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile burger menu
const burger = document.getElementById('burger');
const navMobile = document.getElementById('nav-mobile');
if (burger && navMobile) {
  burger.addEventListener('click', () => {
    const open = navMobile.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });
  navMobile.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => { navMobile.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); })
  );
}

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animated counters
function animateCount(el, target, suffix = '') {
  const duration = 1600;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.closest('.lk-stat')?.querySelector('.lk-stat__lbl')?.textContent.includes('%') ? '' : '';
    animateCount(el, target, '');
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// Cookie banner
const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.getElementById('cookie-accept');
if (cookieBanner && cookieAccept) {
  if (localStorage.getItem('lk-cookie-ok')) cookieBanner.classList.add('is-hidden');
  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('lk-cookie-ok', '1');
    cookieBanner.classList.add('is-hidden');
  });
}

// Contact form validation (contact.html)
const form = document.getElementById('lk-contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.style.borderColor = field.value.trim() ? '' : '#c0392b';
      if (!field.value.trim()) valid = false;
    });
    if (!valid) return;
    const btn = form.querySelector('[type=submit]');
    btn.textContent = 'Message envoyé ✓';
    btn.disabled = true;
    btn.style.opacity = '.7';
  });
}
