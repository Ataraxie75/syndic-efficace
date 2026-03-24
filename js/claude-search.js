// ─── CLAUDE SEARCH ────────────────────────────────────────────────────────────
// Génère un prompt Copilot via Claude si le use case n'est pas référencé

const ClaudeSearch = (() => {
  const API_URL = '/api/generate-prompt';

  function init() {
    const input = document.querySelector('.search__input');
    const sendBtn = document.getElementById('search-send-btn');
    const panel = document.getElementById('claude-result');

    if (!input || !panel) return;

    const doSearch = () => {
      const query = input.value.trim();
      if (query.length < 3) return;
      runSearch(query, panel);
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        doSearch();
      }
    });

    if (sendBtn) {
      sendBtn.addEventListener('click', doSearch);
    }

    // Fermer le panneau si on clique ailleurs
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrap')) {
        panel.hidden = true;
      }
    });
  }

  function runSearch(query, panel) {
    // 1. Chercher dans la bibliothèque de prompts existants
    if (typeof PROMPTS !== 'undefined' && typeof Search !== 'undefined') {
      const matches = Search.filterPrompts(PROMPTS, query, null);
      if (matches.length > 0) {
        showLocalResults(matches, panel, query);
        return;
      }
    }

    // 2. Aucun résultat local → générer avec Claude
    generateWithClaude(query, panel);
  }

  function showLocalResults(prompts, panel, query) {
    const count = prompts.length;
    const items = prompts.slice(0, 3).map(p => `
      <div class="local-result">
        <span class="tool-pill tool-pill--${(p.outil || '').toLowerCase()}">${p.outil}</span>
        <div class="local-result__body">
          <strong>${escapeHtml(p.titre)}</strong>
          <p>${escapeHtml(p.contexte)}</p>
        </div>
        ${p.gratuit ? '' : '<span class="local-result__lock">🔒 Pack</span>'}
      </div>
    `).join('');

    const moreLabel = count > 3
      ? `<p class="local-result__more">+ ${count - 3} autre(s) situation(s) dans le pack complet</p>`
      : '';

    panel.innerHTML = `
      <div class="claude-result__header">
        <span class="claude-result__badge claude-result__badge--found">
          ✓ ${count} situation${count > 1 ? 's' : ''} trouvée${count > 1 ? 's' : ''} dans la bibliothèque
        </span>
      </div>
      <div class="claude-result__local">${items}${moreLabel}</div>
    `;
    panel.hidden = false;
  }

  async function generateWithClaude(query, panel) {
    panel.innerHTML = `
      <div class="claude-result__loading">
        <span class="claude-result__spinner"></span>
        <span>Génération de votre prompt Copilot en cours…</span>
      </div>
    `;
    panel.hidden = false;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erreur serveur');
      }

      renderResult(data, panel);
    } catch (err) {
      panel.innerHTML = `
        <div class="claude-result__error">
          <p>⚠️ ${escapeHtml(err.message || 'Impossible de générer le prompt. Réessayez.')}</p>
        </div>
      `;
    }
  }

  function renderResult(data, panel) {
    const toolClass = (data.outil || 'copilot').toLowerCase();

    panel.innerHTML = `
      <div class="claude-result__card">
        <div class="claude-result__card-top">
          <span class="tool-pill tool-pill--${toolClass}">${escapeHtml(data.outil)}</span>
          <span class="claude-result__badge claude-result__badge--ai">✨ Généré par IA</span>
          ${data.gain ? `<span class="claude-result__gain">⏱ ${escapeHtml(data.gain)}</span>` : ''}
        </div>
        <h4 class="claude-result__title">${escapeHtml(data.titre)}</h4>
        ${data.contexte ? `<p class="claude-result__ctx">${escapeHtml(data.contexte)}</p>` : ''}
        <div class="claude-result__prompt-wrap">
          <p class="claude-result__prompt">${escapeHtml(data.prompt)}</p>
          <button class="claude-result__copy" data-prompt="${escapeAttr(data.prompt)}">
            Copier le prompt
          </button>
        </div>
        <p class="claude-result__disclaimer">
          Prompt généré par IA — vérifiez qu'il correspond à votre situation avant utilisation.
        </p>
      </div>
    `;

    // Bouton copier
    panel.querySelector('.claude-result__copy').addEventListener('click', function () {
      const text = this.dataset.prompt;
      navigator.clipboard.writeText(text).then(() => {
        this.textContent = '✓ Copié !';
        this.classList.add('copied');
        setTimeout(() => {
          this.textContent = 'Copier le prompt';
          this.classList.remove('copied');
        }, 2000);
      });
    });

    panel.hidden = false;
  }

  function escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(str) {
    return (str || '').replace(/"/g, '&quot;');
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => ClaudeSearch.init());
