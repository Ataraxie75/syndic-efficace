// app.js — interactions visuelles de base

document.addEventListener('DOMContentLoaded', () => {

  // Hover lift sur les cartes
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      console.log('Parcours sélectionné :', card.querySelector('.card__title')?.textContent);
    });
  });

  // Barre de recherche : feedback visuel au focus
  const searchInput = document.querySelector('.search__input');
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      searchInput.closest('.search').style.boxShadow = '0 0 0 3px rgba(0,120,212,.25), 0 8px 24px rgba(0,0,0,.12)';
    });
    searchInput.addEventListener('blur', () => {
      searchInput.closest('.search').style.boxShadow = '';
    });
  }

  // ── COOKIE BANNER ──────────────────────────────────────────────────────────
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');

  if (banner && acceptBtn) {
    // Si déjà accepté, on cache immédiatement sans animation
    if (localStorage.getItem('cookie-accepted') === '1') {
      banner.classList.add('hidden');
    }

    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookie-accepted', '1');
      banner.classList.add('hidden');
    });
  }

});
