const header = document.getElementById('header');
if (header) {
  const onScroll = () => header.classList.toggle('lk-header--scrolled', scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
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
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
function animateCount(el, target) {
  const duration = 1600, start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (!e.isIntersecting) return; animateCount(e.target, parseInt(e.target.dataset.count, 10)); countObserver.unobserve(e.target); });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));
const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.getElementById('cookie-accept');
if (cookieBanner && cookieAccept) {
  if (localStorage.getItem('lk-cookie-ok')) cookieBanner.classList.add('is-hidden');
  cookieAccept.addEventListener('click', () => { localStorage.setItem('lk-cookie-ok', '1'); cookieBanner.classList.add('is-hidden'); });
}
const form = document.getElementById('lk-contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(f => { f.style.borderColor = f.value.trim() ? '' : '#c0392b'; if (!f.value.trim()) valid = false; });
    if (!valid) return;
    const btn = form.querySelector('[type=submit]');
    btn.textContent = 'Message envoyé ✓'; btn.disabled = true; btn.style.opacity = '.7';
  });
}