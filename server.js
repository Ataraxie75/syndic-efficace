// server.js — Proxy Claude API pour la recherche Syndic Efficace
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const rateLimit = require('express-rate-limit');

const app = express();
const client = new Anthropic(); // Lit ANTHROPIC_API_KEY depuis l'environnement

app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*'
}));

// Sert les fichiers statiques (HTML/CSS/JS)
app.use(express.static('.'));

// Limite : 10 requêtes IA par minute par IP
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requêtes. Réessayez dans une minute.' }
});

const SYSTEM_PROMPT = `Tu es un expert Microsoft Copilot pour les gestionnaires de copropriété (syndic immobilier en France).

L'utilisateur décrit une situation professionnelle pour laquelle il veut utiliser Microsoft 365 Copilot.
Génère un prompt Copilot professionnel, structuré et directement utilisable dans Microsoft 365.

Réponds UNIQUEMENT avec un objet JSON valide (sans balises markdown, sans texte autour) avec ces champs :
{
  "titre": "Titre court et descriptif de la situation (max 60 caractères)",
  "outil": "Outlook ou Word ou Excel ou Teams",
  "contexte": "Contexte professionnel concis en 1-2 phrases, adapté au métier de gestionnaire de copropriété",
  "prompt": "Le prompt Copilot complet, prêt à copier-coller dans Microsoft 365. Doit être actionnable, précis et professionnel.",
  "gain": "Gain de temps estimé (ex: 15 min, 30 min, 1h)"
}

Règles :
- Choisir l'outil Microsoft 365 le plus adapté à la situation
- Le prompt doit être en français, professionnel, directement utilisable
- Adapter le vocabulaire au métier : copropriétaires, syndic, AG, charges, tantièmes, prestataires, etc.
- Ne jamais inclure de conseils juridiques engageants`;

app.post('/api/generate-prompt', aiLimiter, async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Requête manquante.' });
  }

  const trimmed = query.trim();

  if (trimmed.length < 3) {
    return res.status(400).json({ error: 'Requête trop courte (minimum 3 caractères).' });
  }

  if (trimmed.length > 400) {
    return res.status(400).json({ error: 'Requête trop longue (maximum 400 caractères).' });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: trimmed }]
    });

    const text = response.content[0]?.text || '';
    const result = JSON.parse(text);

    if (!result.titre || !result.outil || !result.prompt) {
      throw new Error('Champs manquants dans la réponse IA');
    }

    res.json(result);
  } catch (err) {
    if (err instanceof SyntaxError) {
      res.status(500).json({ error: 'Erreur de format dans la réponse IA. Réessayez.' });
    } else if (err.status === 429) {
      res.status(429).json({ error: 'Limite API atteinte. Réessayez dans quelques instants.' });
    } else {
      console.error('[Claude API Error]', err.message);
      res.status(500).json({ error: 'Impossible de générer le prompt. Réessayez.' });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Serveur Syndic Efficace démarré sur http://localhost:${PORT}`);
  console.log(`  ANTHROPIC_API_KEY : ${process.env.ANTHROPIC_API_KEY ? '✓ présente' : '✗ MANQUANTE'}`);
});
