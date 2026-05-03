/* CMS content loader — peuple le DOM depuis les fichiers data/*.json */
(async () => {
  function get(obj, path) {
    return path.split('.').reduce((acc, k) => acc?.[k], obj);
  }

  let data;
  try {
    const [avocate, contact, stats, temoignages, copropriete, energie, legal, cabinet, accueil, global] = await Promise.all([
      fetch('/data/avocate.json').then(r => r.json()),
      fetch('/data/contact.json').then(r => r.json()),
      fetch('/data/stats.json').then(r => r.json()),
      fetch('/data/temoignages.json').then(r => r.json()),
      fetch('/data/copropriete.json').then(r => r.json()),
      fetch('/data/energie.json').then(r => r.json()),
      fetch('/data/legal.json').then(r => r.json()),
      fetch('/data/cabinet.json').then(r => r.json()),
      fetch('/data/accueil.json').then(r => r.json()),
      fetch('/data/global.json').then(r => r.json()),
    ]);
    data = { avocate, contact, stats, temoignages, copropriete, energie, legal, cabinet, accueil, global };
  } catch (e) {
    return; // Fallback silencieux : le texte HTML statique reste affiché
  }

  // Textes simples
  document.querySelectorAll('[data-cms]').forEach(el => {
    const val = get(data, el.dataset.cms);
    if (val !== undefined && val !== '') el.textContent = val;
  });

  // Attributs HTML (href, src…)
  document.querySelectorAll('[data-cms-attr]').forEach(el => {
    const [path, attr] = el.dataset.cmsAttr.split('|');
    const val = get(data, path);
    if (val !== undefined && val !== '') el.setAttribute(attr, val);
  });

  // Compteurs animés : met à jour data-count AVANT que l'IntersectionObserver ne déclenche
  document.querySelectorAll('[data-cms-count]').forEach(el => {
    const val = get(data, el.dataset.cmsCount);
    if (val !== undefined && val !== '') el.dataset.count = val;
  });

  // Liste de diplômes / certifications
  const diplomesEl = document.getElementById('cms-diplomes');
  if (diplomesEl && Array.isArray(data.avocate?.diplomes)) {
    diplomesEl.innerHTML = data.avocate.diplomes
      .map(d => `<li>${d}</li>`)
      .join('');
  }

  // Photo avocate
  const photoEl = document.getElementById('cms-photo-avocate');
  if (photoEl && data.avocate?.photo) {
    photoEl.style.backgroundImage = `url('${data.avocate.photo}')`;
    photoEl.style.backgroundSize = 'cover';
    photoEl.style.backgroundPosition = 'center';
  }
})();
