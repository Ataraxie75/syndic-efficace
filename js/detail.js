// ─── DETAIL.JS — Page de détail d'un prompt ──────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) { window.location.href = 'index.html'; return; }

  const prompt = PROMPTS.find(p => p.id === id);
  if (!prompt) { window.location.href = 'index.html'; return; }

  // Prompts du même parcours, pour navigation prev/next
  const siblings = PROMPTS.filter(p => p.parcours === prompt.parcours);
  const idx = siblings.findIndex(p => p.id === id);

  // ── TITRE & META ────────────────────────────────────────────────────────────
  document.title = prompt.titre + ' — Forward Copilot';

  document.getElementById('detail-title').textContent = prompt.titre;
  document.getElementById('detail-workflow').textContent = '› ' + prompt.workflow;

  // Breadcrumb
  const bcParcours = document.getElementById('breadcrumb-parcours');
  bcParcours.textContent = prompt.parcoursLabel;
  bcParcours.href = 'parcours.html?p=' + prompt.parcours;
  document.getElementById('breadcrumb-titre').textContent = prompt.titre;

  // Badges
  const niveauClass = prompt.niveau === 'Essentiel' ? 'badge--essentiel' : 'badge--avance';
  document.getElementById('detail-meta').innerHTML = `
    <span class="tool-pill tool-pill--${prompt.outil.toLowerCase().replace(' ', '-')}">${prompt.outil}</span>
    <span class="badge ${niveauClass}">${prompt.niveau}</span>
    ${!prompt.gratuit ? '<span class="badge badge--payant">🔒 Premium</span>' : ''}
  `;

  // ── CONTEXTE & STORY ────────────────────────────────────────────────────────
  document.getElementById('detail-contexte').textContent = prompt.contexte;
  document.getElementById('detail-story').textContent = prompt.user_story;

  // ── PROMPT ──────────────────────────────────────────────────────────────────
  const zone = document.getElementById('detail-prompt-zone');
  if (prompt.gratuit) {
    zone.innerHTML = `
      <div class="prompt-box">
        <div class="prompt-box__header">
          <div class="prompt-box__header-left">
            <span class="prompt-box__headline">Prêt à coller dans Copilot</span>
            <span class="prompt-box__sub">Calibré pour votre métier · Réponse immédiate · Zéro rédaction</span>
          </div>
          <button class="btn-copy" id="btn-copy" data-prompt="${escAttr(prompt.prompt)}">
            📋 Copier le prompt
          </button>
        </div>
        <div class="prompt-box__text">${escHtml(prompt.prompt)}</div>
      </div>
    `;
    document.getElementById('btn-copy').addEventListener('click', (e) => {
      const btn = e.currentTarget;
      navigator.clipboard.writeText(prompt.prompt).then(() => {
        btn.textContent = '✓ Copié !';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = '📋 Copier';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  } else {
    zone.innerHTML = `
      <div class="prompt-locked">
        <div class="prompt-locked__blur">${escHtml(prompt.prompt.substring(0, 150))}…</div>
        <div class="prompt-locked__overlay">
          <span class="prompt-locked__icon">🔒</span>
          <p class="prompt-locked__msg">Prompt réservé au pack complet</p>
          <a href="pack.html" class="btn btn--primary">Accéder au pack — 29€</a>
        </div>
      </div>
    `;
    document.getElementById('detail-cta-band').classList.remove('hidden');
  }

  // ── COMMENT UTILISER ────────────────────────────────────────────────────────
  const steps = getSteps(prompt);
  const stepsEl = document.getElementById('detail-steps');
  stepsEl.innerHTML = steps.map(s => `<li>${escHtml(s)}</li>`).join('');

  // ── GARDE-FOU ────────────────────────────────────────────────────────────────
  if (prompt.garde_fou) {
    document.getElementById('detail-gardefou').classList.remove('hidden');
    document.getElementById('detail-gardefou-text').textContent = prompt.garde_fou;
  }

  // ── GAIN ─────────────────────────────────────────────────────────────────────
  document.getElementById('detail-gain-text').textContent = 'Gain estimé : ' + prompt.gain + ' récupérées';

  // ── NAVIGATION PREV / NEXT ────────────────────────────────────────────────────
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnBack = document.getElementById('btn-back-parcours');

  btnBack.href = 'parcours.html?p=' + prompt.parcours;
  btnBack.textContent = '↩ Retour au parcours';

  if (idx > 0) {
    btnPrev.addEventListener('click', () => {
      window.location.href = 'detail.html?id=' + siblings[idx - 1].id;
    });
  } else {
    btnPrev.disabled = true;
    btnPrev.style.opacity = '.3';
  }

  if (idx < siblings.length - 1) {
    btnNext.addEventListener('click', () => {
      window.location.href = 'detail.html?id=' + siblings[idx + 1].id;
    });
  } else {
    btnNext.disabled = true;
    btnNext.style.opacity = '.3';
  }
});

// ── STEPS PAR DÉFAUT (à enrichir prompt par prompt) ──────────────────────────
function getSteps(prompt) {
  const tool = prompt.outil;
  const base = [
    `Ouvrez ${tool} et sélectionnez le contexte concerné (email, document ou conversation).`,
    `Ouvrez Copilot en cliquant sur l'icône ✨ dans ${tool} ou via le panneau latéral.`,
    `Copiez-collez le prompt ci-dessus dans la zone de saisie Copilot.`,
    `Personnalisez les éléments entre crochets [ ] avec vos informations réelles.`,
    `Relisez la réponse générée avant de l'utiliser — ajustez si nécessaire.`
  ];

  // Steps spécifiques selon l'outil
  if (tool === 'Outlook') {
    base[0] = `Ouvrez l'email ou le fil de discussion concerné dans Outlook.`;
    base[1] = `Cliquez sur le bouton Copilot ✨ en haut à droite de l'email (ou dans le volet de lecture).`;
  } else if (tool === 'Teams') {
    base[0] = `Ouvrez la réunion ou la conversation concernée dans Microsoft Teams.`;
    base[1] = `Accédez à Copilot via le menu "…" dans la conversation ou le récapitulatif de réunion.`;
  } else if (tool === 'Excel') {
    base[0] = `Ouvrez votre fichier Excel avec les données concernées.`;
    base[1] = `Activez Copilot via le bouton ✨ dans le ruban Accueil.`;
  } else if (tool === 'Word') {
    base[0] = `Ouvrez votre document Word ou créez un nouveau document vierge.`;
    base[1] = `Cliquez sur Copilot ✨ dans le ruban ou utilisez Alt+I pour ouvrir le panneau.`;
  }

  return base;
}

// ── UTILS ─────────────────────────────────────────────────────────────────────
function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function escAttr(str) {
  if (!str) return '';
  return str.replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
