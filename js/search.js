// ─── SEARCH MODULE ────────────────────────────────────────────────────────────

const Search = (() => {
  let activeOutil = null;
  let searchQuery = '';

  function normalize(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function matches(prompt, query, outil) {
    const fields = [
      prompt.titre, prompt.workflow, prompt.contexte,
      prompt.user_story, prompt.prompt, prompt.parcoursLabel
    ].map(f => normalize(f || ''));

    const q = normalize(query);
    const queryMatch = !q || fields.some(f => f.includes(q));
    const outilMatch = !outil || prompt.outil === outil;
    return queryMatch && outilMatch;
  }

  function filterPrompts(prompts, query, outil) {
    return prompts.filter(p => matches(p, query, outil));
  }

  function highlight(text, query) {
    if (!query) return text;
    const norm = normalize(query);
    const regex = new RegExp(`(${norm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function setOutil(outil) {
    activeOutil = outil;
  }

  function setQuery(query) {
    searchQuery = query;
  }

  function getState() {
    return { query: searchQuery, outil: activeOutil };
  }

  return { filterPrompts, highlight, setOutil, setQuery, getState, normalize };
})();
