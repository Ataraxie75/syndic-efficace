const PROMPTS = [
  // ─── PARCOURS 1 : EMAILS ───────────────────────────────────────────────────
  {
    id: "email-001", parcours: "emails", parcoursLabel: "Traiter mes emails rapidement",
    workflow: "Triage du matin", titre: "Résumé de fil complexe", outil: "Outlook",
    niveau: "Essentiel",
    contexte: "Un fil de 15 mails sur un sinistre dégât des eaux en cours impliquant copropriétaires, assureur et plombier.",
    user_story: "Vous arrivez le matin face à un fil interminable. Copilot résume les points clés, identifie les actions en attente et vous indique qui a dit quoi. Vous reprenez la main en 2 minutes.",
    prompt: "Résume ce fil de discussion en identifiant : 1) le problème principal, 2) les actions déjà prises par chaque intervenant, 3) ce qui reste à faire et par qui, 4) les points de blocage éventuels. Utilise des bullet points, sois factuel et concis.",
    gain: "15 min", garde_fou: null, gratuit: true
  },
  {
    id: "email-002", parcours: "emails", parcoursLabel: "Traiter mes emails rapidement",
    workflow: "Triage du matin", titre: "Détection des urgences", outil: "Outlook",
    niveau: "Essentiel",
    contexte: "Boîte de réception avec 47 nouveaux emails reçus depuis hier soir.",
    user_story: "Parmi des dizaines d'emails, Copilot repère ceux qui nécessitent une action immédiate. Vous traitez d'abord ce qui compte vraiment.",
    prompt: "Analyse mes emails non lus et classe-les en trois catégories : URGENT (action requise aujourd'hui), IMPORTANT (à traiter cette semaine), INFO (aucune action requise). Pour chaque email urgent, indique l'expéditeur, le sujet et l'action attendue en une ligne.",
    gain: "10 min", garde_fou: null, gratuit: true
  },
  {
    id: "email-003", parcours: "emails", parcoursLabel: "Traiter mes emails rapidement",
    workflow: "Triage du matin", titre: "Priorisation intelligente par immeuble", outil: "Outlook",
    niveau: "Avancé",
    contexte: "Gestionnaire de 12 copropriétés avec des emails entrants en provenance de multiples résidences.",
    user_story: "Copilot organise vos emails par immeuble et par niveau de criticité. Vous visualisez en un coup d'œil quelle résidence demande votre attention prioritaire ce matin.",
    prompt: "Analyse mes emails non lus et groupe-les par nom de copropriété (identifiable dans l'objet ou le corps du mail). Pour chaque copropriété, liste les emails par ordre de priorité décroissante et indique le niveau d'urgence global (Rouge/Orange/Vert). Synthétise en une phrase la situation de chaque immeuble.",
    gain: "20 min", garde_fou: "Vérifie que le regroupement par immeuble est correct avant d'agir — Copilot peut se tromper sur les noms similaires.", gratuit: false
  },
  {
    id: "email-004", parcours: "emails", parcoursLabel: "Traiter mes emails rapidement",
    workflow: "Triage du matin", titre: "Extraction automatique des tâches", outil: "Outlook",
    niveau: "Avancé",
    contexte: "Fil de correspondance dense entre plusieurs parties sur un chantier de ravalement de façade.",
    user_story: "Copilot extrait toutes les tâches engagées implicitement ou explicitement dans vos échanges. Rien ne passe entre les mailles.",
    prompt: "Lis l'ensemble de ce fil de messages et extrais toutes les tâches mentionnées, promises ou implicites. Pour chaque tâche : indique QUI doit faire QUOI, avant QUELLE échéance (si mentionnée), et si elle est déjà faite ou encore en attente. Présente le résultat sous forme de tableau à 4 colonnes : Responsable | Tâche | Échéance | Statut.",
    gain: "25 min", garde_fou: "Relis la liste extraite — certaines tâches peuvent avoir été annulées ou reformulées dans les échanges suivants.", gratuit: false
  },
  {
    id: "email-005", parcours: "emails", parcoursLabel: "Traiter mes emails rapidement",
    workflow: "Rédaction de réponses", titre: "Réponse à une réclamation copropriétaire", outil: "Outlook",
    niveau: "Essentiel",
    contexte: "M. Martin, copropriétaire au 3ème étage, se plaint de l'état des parties communes depuis plusieurs semaines.",
    user_story: "Vous recevez une réclamation agressive. Copilot rédige une réponse professionnelle qui accuse réception, rappelle les démarches en cours et fixe un délai de retour. Vous gardez le ton sans perdre de temps.",
    prompt: "Rédige une réponse email professionnelle à cette réclamation de copropriétaire. Le ton doit être courtois mais ferme. Inclus : 1) un accusé de réception de la demande, 2) un rappel de ce qui a déjà été fait ou engagé, 3) les prochaines étapes avec un délai réaliste, 4) une formule de politesse adaptée. Évite tout engagement juridique ou financier non validé.",
    gain: "12 min", garde_fou: null, gratuit: true
  },
  {
    id: "email-006", parcours: "emails", parcoursLabel: "Traiter mes emails rapidement",
    workflow: "Rédaction de réponses", titre: "Réponse à une demande d'intervention", outil: "Outlook",
    niveau: "Essentiel",
    contexte: "Un copropriétaire signale une fuite d'eau dans sa cave et demande une intervention rapide.",
    user_story: "Copilot rédige une réponse qui rassure le copropriétaire, confirme la prise en charge et décrit la procédure. Vous envoyez en un clic.",
    prompt: "Rédige un email de réponse à cette demande d'intervention technique. Inclus : 1) confirmation de la prise en compte du signalement avec la date et l'heure, 2) description des premières actions engagées (contact prestataire, visite programmée), 3) délai estimé d'intervention, 4) coordonnées de contact en cas d'urgence. Ton professionnel et rassurant.",
    gain: "10 min", garde_fou: null, gratuit: true
  },
  {
    id: "email-007", parcours: "emails", parcoursLabel: "Traiter mes emails rapidement",
    workflow: "Rédaction de réponses", titre: "Réponse diplomatique à un conflit de voisinage", outil: "Outlook",
    niveau: "Avancé",
    contexte: "Deux copropriétaires s'opposent sur l'usage d'une place de parking. Les deux ont écrit au gestionnaire.",
    user_story: "Situation tendue entre deux copropriétaires. Copilot rédige une réponse neutre qui ne prend pas parti, rappelle le règlement de copropriété et propose une médiation. Vous désamorcez sans vous exposer.",
    prompt: "Rédige deux emails distincts : un pour chaque copropriétaire en conflit. Chaque email doit : 1) accuser réception de leur message sans valider leur version des faits, 2) rappeler que le règlement de copropriété fait foi, 3) indiquer que le gestionnaire reste neutre et facilitateur, 4) proposer une réunion de médiation ou un arbitrage par le conseil syndical. Évite tout jugement ou prise de position.",
    gain: "20 min", garde_fou: "Ne pas envoyer avant relecture — s'assurer que les deux emails sont bien distincts et qu'aucun détail de l'un n'apparaît dans l'autre.", gratuit: false
  },
  {
    id: "email-008", parcours: "emails", parcoursLabel: "Traiter mes emails rapidement",
    workflow: "Rédaction de réponses", titre: "Email de synthèse multi-destinataires", outil: "Outlook",
    niveau: "Avancé",
    contexte: "Fin de chantier de rénovation de l'ascenseur impliquant l'entreprise, le bureau de contrôle, l'assureur et le conseil syndical.",
    user_story: "Copilot rédige un email unique adapté à chaque destinataire avec les informations qui les concernent. Vous communiquez efficacement sans répétition ni oubli.",
    prompt: "À partir de ce compte-rendu de fin de chantier, rédige un email de synthèse destiné à plusieurs parties : l'entreprise (points de réserve à lever), le bureau de contrôle (date de visite de réception), l'assureur (déclaration de réception), le conseil syndical (bilan et prochaines étapes). Chaque section doit être clairement identifiée avec son destinataire et ne contenir que les informations qui le concernent.",
    gain: "30 min", garde_fou: "Vérifie que les informations confidentielles (coûts, litiges) ne sont pas partagées avec les mauvais destinataires.", gratuit: false
  },
  {
    id: "email-009", parcours: "emails", parcoursLabel: "Traiter mes emails rapidement",
    workflow: "Suivi et relances", titre: "Relance prestataire sans réponse", outil: "Outlook",
    niveau: "Essentiel",
    contexte: "Le plombier missionné il y a 10 jours pour un devis de remplacement de colonne n'a toujours pas répondu.",
    user_story: "Copilot rédige une relance ferme mais courtoise qui rappelle le contexte et fixe une échéance claire. Vous maintenez la pression sans agressivité.",
    prompt: "Rédige un email de relance à destination d'un prestataire qui n'a pas répondu à une demande de devis envoyée il y a 10 jours. Rappelle : 1) la date et l'objet de la demande initiale, 2) l'urgence de la situation pour la copropriété, 3) un délai de réponse maximum de 48h, 4) les conséquences d'un non-retour (mise en concurrence, sélection d'un autre prestataire). Ton ferme et professionnel.",
    gain: "8 min", garde_fou: null, gratuit: true
  },
  {
    id: "email-010", parcours: "emails", parcoursLabel: "Traiter mes emails rapidement",
    workflow: "Suivi et relances", titre: "Résumé des emails en attente de réponse", outil: "Outlook",
    niveau: "Essentiel",
    contexte: "Gestionnaire avec 30+ emails envoyés sans réponse sur les 3 dernières semaines.",
    user_story: "Copilot identifie tous vos emails sans réponse et les classe par ancienneté. Vous savez immédiatement qui relancer en priorité.",
    prompt: "Analyse ma boîte d'envoi des 3 dernières semaines et identifie tous les emails qui n'ont pas reçu de réponse. Pour chaque email sans réponse, indique : l'expéditeur, le sujet, la date d'envoi et le nombre de jours sans réponse. Classe par ancienneté décroissante et signale les plus critiques (>7 jours) avec un indicateur visuel.",
    gain: "15 min", garde_fou: null, gratuit: true
  },
  {
    id: "email-011", parcours: "emails", parcoursLabel: "Traiter mes emails rapidement",
    workflow: "Suivi et relances", titre: "Suivi des engagements pris par email", outil: "Outlook",
    niveau: "Avancé",
    contexte: "Gestionnaire qui a pris de nombreux engagements par email auprès de copropriétaires sur le dernier mois.",
    user_story: "Copilot extrait tous les engagements que vous avez pris dans vos emails envoyés. Vous vérifiez ceux qui ont été tenus et ceux qui sont en retard.",
    prompt: "Analyse mes emails envoyés ce mois-ci et identifie tous les engagements que j'ai pris : promesses de rappel, délais annoncés, actions promises. Pour chaque engagement : date de la promesse, destinataire, contenu de l'engagement, délai annoncé, et statut (tenu/en attente/dépassé). Classe par statut et ancienneté.",
    gain: "20 min", garde_fou: "Certains engagements peuvent avoir été modifiés dans des échanges ultérieurs — vérifie les fils complets avant de considérer un engagement comme manqué.", gratuit: false
  },
  {
    id: "email-012", parcours: "emails", parcoursLabel: "Traiter mes emails rapidement",
    workflow: "Suivi et relances", titre: "Modèle de relance escaladée", outil: "Outlook",
    niveau: "Avancé",
    contexte: "Prestataire qui ignore les relances depuis 3 semaines sur un dossier d'étanchéité urgent.",
    user_story: "La situation s'enlise. Copilot rédige une relance de dernier recours avec mise en demeure implicite et escalade vers la direction du prestataire.",
    prompt: "Rédige une relance de niveau 3 (dernier recours) à destination d'un prestataire qui n'a pas répondu à deux relances précédentes. Le mail doit : 1) récapituler la chronologie des tentatives de contact, 2) signifier clairement que c'est le dernier recours avant action formelle, 3) être adressé à la direction de l'entreprise en copie, 4) fixer un ultimatum de 24h, 5) mentionner les recours possibles (résiliation, mise en cause, signalement aux organismes professionnels). Ton ferme et documenté.",
    gain: "15 min", garde_fou: "Faire relire par le responsable avant envoi — ce type d'email peut avoir des implications contractuelles.", gratuit: false
  },

  // ─── PARCOURS 2 : AG ───────────────────────────────────────────────────────
  {
    id: "ag-001", parcours: "ag", parcoursLabel: "Préparer une AG de A à Z",
    workflow: "Convocation et ordre du jour", titre: "Rédaction de la convocation", outil: "Word",
    niveau: "Essentiel",
    contexte: "AG annuelle d'une copropriété de 24 lots à convoquer dans les délais légaux (21 jours minimum).",
    user_story: "Copilot rédige la convocation complète et conforme à la loi, avec l'ensemble des mentions obligatoires. Vous gagnez du temps tout en sécurisant le formalisme.",
    prompt: "Rédige une convocation d'assemblée générale ordinaire de copropriété conforme à la loi du 10 juillet 1965 et au décret du 17 mars 1967. Inclus : 1) les mentions légales obligatoires (date, heure, lieu), 2) la liste des pouvoirs joints, 3) la mention du droit de voter par correspondance, 4) les modalités de consultation des pièces. Laisse des espaces à compléter pour les informations spécifiques à la copropriété.",
    gain: "45 min", garde_fou: null, gratuit: true
  },
  {
    id: "ag-002", parcours: "ag", parcoursLabel: "Préparer une AG de A à Z",
    workflow: "Convocation et ordre du jour", titre: "Structuration de l'ordre du jour", outil: "Word",
    niveau: "Essentiel",
    contexte: "AG avec 12 points à traiter : approbation des comptes, budget, travaux d'isolation, renouvellement de contrats.",
    user_story: "Copilot organise les points dans l'ordre logique et réglementaire, en séparant les résolutions ordinaires et celles à majorité qualifiée. Votre AG se déroule sans accroc procédural.",
    prompt: "À partir de cette liste de points à traiter, structure un ordre du jour d'AG conforme aux règles de majorité : 1) commence par les approbations comptables, 2) classe les résolutions par type de majorité (art. 24, 25, 26), 3) numérotise chaque résolution, 4) ajoute les questions diverses en fin de séance. Pour chaque résolution, précise la majorité requise et justifie brièvement.",
    gain: "30 min", garde_fou: null, gratuit: true
  },
  {
    id: "ag-003", parcours: "ag", parcoursLabel: "Préparer une AG de A à Z",
    workflow: "Convocation et ordre du jour", titre: "Vérification de conformité légale", outil: "Copilot Studio",
    niveau: "Avancé",
    contexte: "Convocation et ordre du jour rédigés, à vérifier avant envoi pour éviter toute contestation.",
    user_story: "Copilot passe en revue votre convocation et signale chaque point potentiellement non conforme à la législation. Vous envoyez en toute sérénité.",
    prompt: "Analyse ce document de convocation d'AG et vérifie sa conformité avec la loi du 10 juillet 1965 et le décret du 17 mars 1967. Vérifie spécifiquement : 1) les délais de convocation respectés, 2) la présence de toutes les annexes obligatoires, 3) la formulation des résolutions (clarté, faisabilité du vote), 4) les majorités indiquées pour chaque résolution, 5) les mentions légales. Produis un rapport de conformité avec les points valides (✓) et les points à corriger (⚠).",
    gain: "60 min", garde_fou: "Ce contrôle est indicatif. Pour les copropriétés complexes ou en cas de doute, consulter un avocat spécialisé.", gratuit: false
  },
  {
    id: "ag-004", parcours: "ag", parcoursLabel: "Préparer une AG de A à Z",
    workflow: "Convocation et ordre du jour", titre: "Synthèse des résolutions à voter", outil: "Word",
    niveau: "Avancé",
    contexte: "AG avec 15 résolutions dont 3 travaux importants et 2 renouvellements de contrats à expliquer aux copropriétaires.",
    user_story: "Copilot produit une fiche de synthèse claire pour chaque résolution : ce qui est proposé, pourquoi, ce que ça coûte. Les copropriétaires votent en connaissance de cause.",
    prompt: "Pour chacune des résolutions listées, rédige une fiche explicative d'une demi-page maximum comprenant : 1) ce qui est proposé en termes simples, 2) la raison de cette résolution (obligation légale, urgence, optimisation), 3) l'impact financier pour un lot moyen, 4) les risques en cas de refus, 5) la recommandation du conseil syndical si disponible. Ton pédagogique et neutre.",
    gain: "90 min", garde_fou: null, gratuit: false
  },
  {
    id: "ag-005", parcours: "ag", parcoursLabel: "Préparer une AG de A à Z",
    workflow: "Préparation des documents", titre: "Résumé du budget prévisionnel", outil: "Excel",
    niveau: "Essentiel",
    contexte: "Budget prévisionnel de 180 000€ avec 23 lignes de charges à présenter aux copropriétaires.",
    user_story: "Copilot transforme votre tableau comptable en résumé lisible. Les copropriétaires comprennent où va leur argent sans se perdre dans les lignes.",
    prompt: "Analyse ce tableau de budget prévisionnel et produis un résumé synthétique : 1) total des charges par grande catégorie (entretien courant, charges de personnel, assurances, honoraires, travaux), 2) comparaison avec le budget N-1 en montant et en pourcentage, 3) les 5 postes les plus importants, 4) l'évolution de la quote-part pour un lot de 1000 tantièmes. Présente en format lisible pour un non-comptable.",
    gain: "40 min", garde_fou: null, gratuit: true
  },
  {
    id: "ag-006", parcours: "ag", parcoursLabel: "Préparer une AG de A à Z",
    workflow: "Préparation des documents", titre: "Fiche récapitulative par résolution", outil: "Word",
    niveau: "Essentiel",
    contexte: "Résolution de travaux de ravalement de façade estimés à 95 000€ avec 3 devis comparatifs.",
    user_story: "Copilot rédige une fiche de présentation claire qui compare les offres et présente la recommandation. Les copropriétaires votent informés.",
    prompt: "Rédige une fiche de présentation pour cette résolution de travaux. Inclus : 1) description des travaux en termes simples, 2) tableau comparatif des 3 devis (entreprise, montant HT, délai, garanties), 3) recommandation motivée du conseil syndical, 4) modalités de financement (fonds propres, emprunt, subvention ANAH), 5) quote-part indicative pour différents types de lots. Maximum 2 pages, format A4.",
    gain: "35 min", garde_fou: null, gratuit: true
  },
  {
    id: "ag-007", parcours: "ag", parcoursLabel: "Préparer une AG de A à Z",
    workflow: "Préparation des documents", titre: "Tableau comparatif des devis travaux", outil: "Excel",
    niveau: "Avancé",
    contexte: "4 devis reçus pour le remplacement de la chaudière collective, avec des prestations différentes à comparer.",
    user_story: "Copilot structure une grille de comparaison objective qui va au-delà du prix : délais, garanties, références, certifications. Vous présentez une analyse complète.",
    prompt: "Crée un tableau comparatif des devis pour ce marché de travaux. Les critères de comparaison doivent inclure : 1) prix total HT et TTC, 2) délai d'exécution, 3) durée de garantie (pièces, main d'œuvre, résultat), 4) certifications et qualifications (RGE, QualiPAC, etc.), 5) modalités de paiement, 6) références similaires, 7) notes de bas de page sur les exclusions. Calcule un score pondéré sur 100 en attribuant des poids : prix 40%, délai 20%, garanties 25%, certifications 15%.",
    gain: "50 min", garde_fou: "Vérifier les références et certifications directement auprès des organismes — ne pas se fier uniquement aux déclarations des prestataires.", gratuit: false
  },
  {
    id: "ag-008", parcours: "ag", parcoursLabel: "Préparer une AG de A à Z",
    workflow: "Préparation des documents", titre: "Note explicative travaux", outil: "Word",
    niveau: "Avancé",
    contexte: "Travaux de mise en conformité ascenseur obligatoires avant le 31 décembre de l'année, avec obligation légale à expliquer.",
    user_story: "Copilot rédige une note pédagogique qui explique l'obligation légale, les risques de non-conformité et le calendrier. Les copropriétaires comprennent l'urgence sans sentiment de contrainte.",
    prompt: "Rédige une note d'information à destination des copropriétaires sur ces travaux obligatoires. La note doit : 1) expliquer le cadre légal en termes simples, 2) décrire les risques concrets en cas de non-respect (amendes, mise hors service, responsabilité), 3) présenter le calendrier des travaux, 4) rassurer sur la qualité des prestataires sélectionnés, 5) répondre aux 5 questions les plus fréquentes des copropriétaires. Ton pédagogique, sans jargon juridique.",
    gain: "40 min", garde_fou: null, gratuit: false
  },
  {
    id: "ag-009", parcours: "ag", parcoursLabel: "Préparer une AG de A à Z",
    workflow: "Compte-rendu et suites", titre: "Rédaction du PV d'AG", outil: "Word",
    niveau: "Essentiel",
    contexte: "AG de 3h avec 12 résolutions votées, 24 copropriétaires présents ou représentés, notes prises.",
    user_story: "Vos notes de réunion sont brutes et désorganisées. Copilot structure un PV complet et conforme aux exigences légales en quelques minutes.",
    prompt: "À partir de ces notes d'assemblée générale, rédige le procès-verbal officiel conforme aux exigences légales. Le PV doit inclure : 1) en-tête avec date, heure, lieu, copropriété, 2) liste de présence avec tantièmes représentés, 3) vérification du quorum, 4) pour chaque résolution : numéro, intitulé, résultat du vote (pour/contre/abstention en tantièmes), adoption ou rejet, 5) signature du président de séance. Formulation neutre et factuelle.",
    gain: "90 min", garde_fou: null, gratuit: true
  },
  {
    id: "ag-010", parcours: "ag", parcoursLabel: "Préparer une AG de A à Z",
    workflow: "Compte-rendu et suites", titre: "Extraction des décisions prises", outil: "Word",
    niveau: "Essentiel",
    contexte: "PV d'AG de 12 pages avec des décisions imbriquées dans le corps du texte.",
    user_story: "Copilot extrait uniquement les décisions actionnables du PV et les présente sous forme de liste de tâches. Vous savez exactement quoi faire dès le lendemain de l'AG.",
    prompt: "Lis ce procès-verbal d'assemblée générale et extrais toutes les décisions prises qui nécessitent une action du syndic. Pour chaque décision : 1) résolution concernée, 2) action concrète à mener, 3) responsable désigné si mentionné, 4) délai ou échéance si indiqué, 5) budget alloué si voté. Présente sous forme de liste de tâches priorisée par urgence.",
    gain: "30 min", garde_fou: null, gratuit: true
  },
  {
    id: "ag-011", parcours: "ag", parcoursLabel: "Préparer une AG de A à Z",
    workflow: "Compte-rendu et suites", titre: "Plan d'action post-AG", outil: "Word",
    niveau: "Avancé",
    contexte: "AG clôturée avec 8 résolutions adoptées nécessitant des actions dans les semaines et mois suivants.",
    user_story: "Copilot transforme les décisions de l'AG en plan d'action détaillé avec jalons et responsables. Vous pilotez l'exécution des décisions sans rien oublier.",
    prompt: "À partir des résolutions adoptées lors de cette AG, construis un plan d'action sur 12 mois. Pour chaque action : 1) description précise de l'action, 2) date de début et date limite, 3) responsable (syndic, CS, prestataire), 4) dépendances avec d'autres actions, 5) budget alloué, 6) indicateur de succès. Organise par trimestre et signale les jalons critiques. Format tableau Excel-compatible.",
    gain: "60 min", garde_fou: null, gratuit: false
  },
  {
    id: "ag-012", parcours: "ag", parcoursLabel: "Préparer une AG de A à Z",
    workflow: "Compte-rendu et suites", titre: "Email d'envoi du PV aux copropriétaires", outil: "Outlook",
    niveau: "Avancé",
    contexte: "PV finalisé à envoyer aux 24 copropriétaires dans le délai légal d'un mois suivant l'AG.",
    user_story: "Copilot rédige l'email d'accompagnement du PV avec un résumé des décisions clés. Les copropriétaires comprennent les suites sans lire les 15 pages.",
    prompt: "Rédige un email d'envoi du procès-verbal d'AG à l'ensemble des copropriétaires. L'email doit : 1) rappeler la date et l'objet de l'AG, 2) résumer en 5 points les décisions les plus importantes en langage simple, 3) mentionner le délai de contestation légal (2 mois), 4) indiquer comment accéder aux documents complémentaires, 5) donner les coordonnées pour toute question. Ton professionnel et accessible. PV joint en pièce jointe.",
    gain: "25 min", garde_fou: "Rappeler aux copropriétaires le délai de contestation de 2 mois sans le minimiser.", gratuit: false
  },

  // ─── PARCOURS 3 : SINISTRE ─────────────────────────────────────────────────
  {
    id: "sinistre-001", parcours: "sinistre", parcoursLabel: "Gérer un sinistre de bout en bout",
    workflow: "Déclaration et ouverture du dossier", titre: "Rédaction de la déclaration de sinistre", outil: "Word",
    niveau: "Essentiel",
    contexte: "Dégât des eaux en parties communes au 2ème étage, découvert un lundi matin, origine inconnue.",
    user_story: "Copilot rédige une déclaration de sinistre complète et structurée pour l'assureur. Vous gagnez du temps sur la paperasse et assurez la complétude du dossier.",
    prompt: "Rédige une déclaration de sinistre pour dégât des eaux destinée à l'assureur de la copropriété. Inclus : 1) identification de la copropriété (à compléter), 2) date et heure de découverte, 3) description factuelle des dommages constatés, 4) origine supposée sans spéculation, 5) mesures conservatoires déjà prises, 6) liste des parties prenantes (copropriétaires impactés, prestataires contactés), 7) demande d'ouverture de dossier et désignation d'expert. Style factuel, sans interprétation.",
    gain: "45 min", garde_fou: null, gratuit: true
  },
  {
    id: "sinistre-002", parcours: "sinistre", parcoursLabel: "Gérer un sinistre de bout en bout",
    workflow: "Déclaration et ouverture du dossier", titre: "Email à l'assureur", outil: "Outlook",
    niveau: "Essentiel",
    contexte: "Sinistre déclaré, en attente de confirmation de l'assureur et désignation d'un expert.",
    user_story: "Copilot rédige l'email d'accompagnement de la déclaration avec toutes les pièces requises et les questions clés. Votre dossier est complet dès le premier envoi.",
    prompt: "Rédige un email à l'assureur pour accompagner la déclaration de sinistre. L'email doit : 1) référencer le numéro de contrat et la copropriété, 2) résumer le sinistre en 3 lignes, 3) lister les pièces jointes (déclaration, photos, constats), 4) demander explicitement la désignation d'un expert et un délai d'intervention, 5) indiquer les coordonnées du gestionnaire comme point de contact unique. Ton professionnel et factuel.",
    gain: "15 min", garde_fou: null, gratuit: true
  },
  {
    id: "sinistre-003", parcours: "sinistre", parcoursLabel: "Gérer un sinistre de bout en bout",
    workflow: "Déclaration et ouverture du dossier", titre: "Fiche récapitulative sinistre", outil: "Word",
    niveau: "Avancé",
    contexte: "Sinistre complexe impliquant 3 lots privatifs, les parties communes et deux assureurs différents.",
    user_story: "Copilot crée une fiche de suivi centralisée dès l'ouverture du dossier. Tous les intervenants disposent du même référentiel. Vous évitez les malentendus.",
    prompt: "Crée une fiche récapitulative de sinistre qui servira de référentiel tout au long du dossier. La fiche doit contenir : 1) identification du sinistre (référence, date, type, localisation), 2) parties impliquées avec coordonnées, 3) compagnies d'assurance concernées avec numéros de dossier, 4) chronologie des événements, 5) état des dommages par zone/lot, 6) interventions réalisées et à venir, 7) statut du dossier et prochaine action. Format structuré, mise à jour facilitée.",
    gain: "60 min", garde_fou: null, gratuit: false
  },
  {
    id: "sinistre-004", parcours: "sinistre", parcoursLabel: "Gérer un sinistre de bout en bout",
    workflow: "Déclaration et ouverture du dossier", titre: "Analyse des responsabilités", outil: "Copilot Studio",
    niveau: "Avancé",
    contexte: "Fuite provenant d'un lot privatif qui a endommagé les parties communes et deux autres lots. Trois assureurs en jeu.",
    user_story: "Copilot analyse la situation et indique qui est responsable de quoi selon les règles de la copropriété. Vous évitez les erreurs de prise en charge.",
    prompt: "Analyse cette situation de sinistre et détermine la répartition des responsabilités. En t'appuyant sur la loi du 10 juillet 1965, identifie : 1) qui est responsable de l'origine du sinistre, 2) quelles parties sont en charge des dommages en parties communes, 3) quelles parties sont en charge des dommages en parties privatives, 4) quelle assurance doit intervenir en premier, 5) les recours possibles entre les parties. Présente sous forme de tableau responsabilité/assurance/action.",
    gain: "75 min", garde_fou: "Cette analyse est indicative. En cas de litige ou de sinistre complexe, faire appel à un expert judiciaire ou un avocat.", gratuit: false
  },
  {
    id: "sinistre-005", parcours: "sinistre", parcoursLabel: "Gérer un sinistre de bout en bout",
    workflow: "Suivi des interventions", titre: "Relance expert/assureur", outil: "Outlook",
    niveau: "Essentiel",
    contexte: "L'expert mandaté par l'assureur ne s'est pas manifesté depuis 3 semaines malgré les relances téléphoniques.",
    user_story: "Copilot rédige une relance écrite formelle qui documente les tentatives antérieures et fixe un ultimatum. Vous créez une traçabilité utile en cas de litige.",
    prompt: "Rédige un email de relance formelle à l'assureur et son expert concernant l'absence d'intervention sur ce sinistre. L'email doit : 1) rappeler la chronologie des contacts précédents (dates et modes de contact), 2) souligner l'aggravation potentielle des dommages en cas de retard supplémentaire, 3) demander une date d'expertise ferme sous 48h, 4) mentionner que la copropriété se réserve le droit d'agir pour préserver ses intérêts, 5) être envoyé en copie à la direction de la compagnie. Ton ferme et documenté.",
    gain: "20 min", garde_fou: null, gratuit: true
  },
  {
    id: "sinistre-006", parcours: "sinistre", parcoursLabel: "Gérer un sinistre de bout en bout",
    workflow: "Suivi des interventions", titre: "Résumé du fil de correspondance", outil: "Outlook",
    niveau: "Essentiel",
    contexte: "Dossier sinistre de 4 mois avec 60+ emails échangés avec l'assureur, l'expert, l'entreprise et les copropriétaires.",
    user_story: "Copilot synthétise 4 mois de correspondance en une timeline claire. Vous retrouvez l'essentiel en 5 minutes pour préparer une réunion ou une relance.",
    prompt: "Résume ce fil de correspondance sur un dossier sinistre. Produis : 1) une timeline chronologique des événements clés, 2) l'état actuel du dossier en 5 phrases, 3) les engagements pris par chaque partie et leur statut, 4) les points de blocage actuels, 5) la prochaine action requise et par qui. Format : résumé exécutif d'une page maximum.",
    gain: "30 min", garde_fou: null, gratuit: true
  },
  {
    id: "sinistre-007", parcours: "sinistre", parcoursLabel: "Gérer un sinistre de bout en bout",
    workflow: "Suivi des interventions", titre: "Email aux copropriétaires impactés", outil: "Outlook",
    niveau: "Avancé",
    contexte: "Trois copropriétaires dont les appartements sont impactés par le sinistre attendent une mise à jour.",
    user_story: "Copilot rédige une communication claire et rassurante pour les copropriétaires, sans dévoiler d'informations sensibles sur les responsabilités en cours d'instruction.",
    prompt: "Rédige un email de mise à jour destiné aux copropriétaires dont les lots sont impactés par le sinistre. L'email doit : 1) résumer l'avancement du dossier sans mentionner les responsabilités en cours d'instruction, 2) indiquer les prochaines étapes et délais estimés, 3) répondre aux questions fréquentes (quand les travaux commencent-ils, qui paie, puis-je rester dans mon appartement), 4) rassurer sans faire de promesses que vous ne pouvez pas tenir, 5) indiquer le canal de communication pour les questions. Ton empathique et professionnel.",
    gain: "25 min", garde_fou: "Ne jamais mentionner les responsabilités avant que l'expert ait rendu son rapport — cela peut avoir des conséquences juridiques.", gratuit: false
  },
  {
    id: "sinistre-008", parcours: "sinistre", parcoursLabel: "Gérer un sinistre de bout en bout",
    workflow: "Suivi des interventions", titre: "Journal de suivi des interventions", outil: "Word",
    niveau: "Avancé",
    contexte: "Sinistre avec 5 prestataires différents intervenus ou à intervenir sur des postes distincts.",
    user_story: "Copilot structure un journal de suivi multi-prestataires avec toutes les interventions, leurs statuts et leurs coûts. Vous pilotez le chantier de réparation comme un chef de projet.",
    prompt: "Crée un journal de suivi des interventions pour ce sinistre. Pour chaque prestataire et intervention prévue ou réalisée, consigne : 1) nom du prestataire et contact, 2) nature de l'intervention, 3) date planifiée et date réalisée, 4) statut (à planifier/en cours/terminé/validé), 5) coût estimé et coût facturé, 6) observations et réserves éventuelles. Ajoute une ligne de total des coûts et un indicateur d'avancement global en pourcentage.",
    gain: "40 min", garde_fou: null, gratuit: false
  },
  {
    id: "sinistre-009", parcours: "sinistre", parcoursLabel: "Gérer un sinistre de bout en bout",
    workflow: "Clôture et archivage", titre: "Rapport de clôture sinistre", outil: "Word",
    niveau: "Essentiel",
    contexte: "Sinistre terminé après 6 mois, toutes les réparations effectuées et validées, indemnisations reçues.",
    user_story: "Copilot rédige le rapport de clôture complet qui documente le dossier de A à Z. Votre copropriété a une trace complète et opposable.",
    prompt: "Rédige un rapport de clôture de sinistre complet. Le rapport doit inclure : 1) récapitulatif du sinistre (nature, date, localisation, étendue), 2) chronologie détaillée du traitement, 3) liste des intervenants et leurs rôles, 4) travaux réalisés avec dates et montants, 5) indemnisations reçues et leur affectation, 6) solde financier final pour la copropriété, 7) enseignements et recommandations préventives. Ton factuel, format archivable.",
    gain: "60 min", garde_fou: null, gratuit: true
  },
  {
    id: "sinistre-010", parcours: "sinistre", parcoursLabel: "Gérer un sinistre de bout en bout",
    workflow: "Clôture et archivage", titre: "Récapitulatif des coûts", outil: "Excel",
    niveau: "Essentiel",
    contexte: "Sinistre avec 12 factures de prestataires, 2 indemnisations d'assurance et des frais divers à réconcilier.",
    user_story: "Copilot consolide tous les coûts et indemnisations dans un tableau de synthèse. Vous présentez un bilan financier clair au conseil syndical.",
    prompt: "Crée un tableau récapitulatif financier de ce sinistre. Structure le tableau avec : 1) colonne Dépenses (prestataire, nature, date, montant HT, montant TTC), 2) colonne Recettes (assureur, nature, date, montant), 3) solde net par catégorie de dommages, 4) solde global (reste à charge copropriété), 5) répartition du reste à charge par lot si applicable. Ajoute des totaux et sous-totaux, format compatible Excel.",
    gain: "45 min", garde_fou: null, gratuit: true
  },
  {
    id: "sinistre-011", parcours: "sinistre", parcoursLabel: "Gérer un sinistre de bout en bout",
    workflow: "Clôture et archivage", titre: "Lettre de clôture à l'assureur", outil: "Word",
    niveau: "Avancé",
    contexte: "Indemnisation reçue mais incomplète — désaccord sur l'évaluation de certains postes de dommages.",
    user_story: "Copilot rédige une lettre de contestation argumentée de l'indemnisation, avec les pièces justificatives nécessaires. Vous défendez les intérêts de la copropriété.",
    prompt: "Rédige une lettre formelle de contestation de l'indemnisation proposée par l'assureur. La lettre doit : 1) accuser réception de l'indemnisation et en rappeler le montant, 2) détailler poste par poste les écarts entre l'indemnisation et les coûts réels justifiés, 3) joindre en référence les factures et devis contradictoires, 4) demander une révision de l'indemnisation ou la désignation d'un expert contradictoire, 5) fixer un délai de réponse de 15 jours. Ton ferme, argumenté, sans agressivité.",
    gain: "50 min", garde_fou: "Faire valider la lettre par un expert en assurance ou un avocat avant envoi en cas de montants importants.", gratuit: false
  },
  {
    id: "sinistre-012", parcours: "sinistre", parcoursLabel: "Gérer un sinistre de bout en bout",
    workflow: "Clôture et archivage", titre: "Archivage et indexation du dossier", outil: "Copilot Studio",
    niveau: "Avancé",
    contexte: "Dossier sinistre clos avec 45 documents (emails, factures, rapports, photos) à archiver pour 10 ans.",
    user_story: "Copilot propose un plan de classement et génère les noms de fichiers normalisés. Votre dossier est retrouvable en 30 secondes dans 5 ans.",
    prompt: "Propose un plan d'archivage structuré pour ce dossier de sinistre clos. Crée : 1) une arborescence de dossiers logique (déclaration, expertises, travaux, assurance, correspondance, clôture), 2) une convention de nommage des fichiers (AAAMMJJ_TYPE_DESCRIPTION_VERSION), 3) un index Excel listant tous les documents avec : nom, type, date, auteur, résumé en une ligne, localisation dans l'arborescence, 4) les délais de conservation réglementaires par type de document. Format réutilisable pour d'autres sinistres.",
    gain: "90 min", garde_fou: null, gratuit: false
  },

  // ─── PARCOURS 4 : IMPAYES ──────────────────────────────────────────────────
  {
    id: "impayes-001", parcours: "impayes", parcoursLabel: "Relancer et suivre mes impayés",
    workflow: "Détection et premier contact", titre: "Identification des comptes en retard", outil: "Excel",
    niveau: "Essentiel",
    contexte: "Situation comptable mensuelle avec 8 copropriétaires en retard de paiement sur une résidence de 35 lots.",
    user_story: "Copilot analyse votre situation comptable et liste tous les comptes en retard avec leur niveau de risque. Vous savez où agir en priorité.",
    prompt: "Analyse ce tableau de situation comptable et identifie tous les copropriétaires avec un solde débiteur. Pour chaque compte en retard : 1) nom et numéro de lot, 2) montant du retard, 3) ancienneté du retard (en jours depuis la première échéance impayée), 4) nombre d'appels de fonds manqués, 5) niveau de risque (Vert <60j, Orange 60-180j, Rouge >180j). Trie par niveau de risque décroissant et calcule le total des impayés.",
    gain: "30 min", garde_fou: null, gratuit: true
  },
  {
    id: "impayes-002", parcours: "impayes", parcoursLabel: "Relancer et suivre mes impayés",
    workflow: "Détection et premier contact", titre: "Premier courrier de relance amiable", outil: "Word",
    niveau: "Essentiel",
    contexte: "Copropriétaire avec 2 mois de retard, première relance, pas d'antécédent particulier.",
    user_story: "Copilot rédige un premier courrier de relance courtois et factuel. Vous maintenez la relation tout en formalisant la démarche.",
    prompt: "Rédige un premier courrier de relance amiable pour impayé de charges de copropriété. Le courrier doit : 1) rappeler le montant dû et les échéances concernées, 2) inviter le copropriétaire à régulariser dans les 15 jours, 3) proposer un contact pour trouver une solution amiable si difficulté passagère, 4) rappeler les conséquences d'un défaut de paiement persistant, 5) donner les coordonnées bancaires pour le paiement. Ton courtois mais ferme. Éviter le jargon juridique.",
    gain: "15 min", garde_fou: null, gratuit: true
  },
  {
    id: "impayes-003", parcours: "impayes", parcoursLabel: "Relancer et suivre mes impayés",
    workflow: "Détection et premier contact", titre: "Email de relance personnalisé", outil: "Outlook",
    niveau: "Avancé",
    contexte: "Copropriétaire habituellement à jour qui présente un premier retard suite à un changement de situation professionnelle.",
    user_story: "Copilot rédige une relance empathique et personnalisée qui préserve la relation. Vous proposez des solutions adaptées à la situation.",
    prompt: "Rédige un email de relance personnalisé pour un copropriétaire habituellement à jour qui présente un premier retard. L'email doit : 1) faire référence à son historique de paiement positif, 2) exprimer une compréhension pour une éventuelle difficulté passagère, 3) proposer trois options : paiement immédiat, échéancier sur 3 mois, entretien téléphonique pour trouver une solution, 4) fixer un délai de réponse de 8 jours, 5) maintenir un ton chaleureux et non-accusateur.",
    gain: "20 min", garde_fou: null, gratuit: false
  },
  {
    id: "impayes-004", parcours: "impayes", parcoursLabel: "Relancer et suivre mes impayés",
    workflow: "Détection et premier contact", titre: "Analyse du profil de paiement", outil: "Excel",
    niveau: "Avancé",
    contexte: "Copropriétaire avec historique de 3 ans de paiements irréguliers — parfois en retard, parfois en avance.",
    user_story: "Copilot analyse le comportement de paiement sur 3 ans et identifie les patterns. Vous adaptez votre stratégie de relance à l'historique.",
    prompt: "Analyse cet historique de paiements sur 3 ans et produis un profil de comportement de paiement. Identifie : 1) le nombre moyen de jours de retard par trimestre, 2) les périodes de l'année à risque élevé, 3) la tendance (amélioration, dégradation, stable), 4) le montant cumulé des pénalités potentielles non appliquées, 5) une recommandation de stratégie de relance adaptée à ce profil. Inclus un graphique d'évolution des retards.",
    gain: "40 min", garde_fou: null, gratuit: false
  },
  {
    id: "impayes-005", parcours: "impayes", parcoursLabel: "Relancer et suivre mes impayés",
    workflow: "Escalade et mise en demeure", titre: "Lettre de mise en demeure", outil: "Word",
    niveau: "Essentiel",
    contexte: "Copropriétaire avec 4 mois de retard malgré deux relances amiables restées sans réponse.",
    user_story: "Copilot rédige une mise en demeure formelle et juridiquement solide. Vous passez à l'étape suivante en sécurisant votre position.",
    prompt: "Rédige une lettre de mise en demeure pour impayé de charges de copropriété, à envoyer en recommandé avec accusé de réception. La lettre doit : 1) rappeler les relances précédentes et leurs dates, 2) détailler le montant exact dû (capital + pénalités au taux légal), 3) mettre en demeure de régler sous 8 jours, 4) informer des suites en cas de non-paiement (injonction de payer, saisie), 5) mentionner la possibilité d'inscription d'hypothèque légale spéciale. Langue juridique appropriée mais compréhensible.",
    gain: "20 min", garde_fou: "Vérifier le calcul des pénalités avec votre service comptable avant envoi.", gratuit: true
  },
  {
    id: "impayes-006", parcours: "impayes", parcoursLabel: "Relancer et suivre mes impayés",
    workflow: "Escalade et mise en demeure", titre: "Synthèse du dossier impayé", outil: "Word",
    niveau: "Essentiel",
    contexte: "Dossier d'impayé de 6 mois à préparer pour décision du conseil syndical sur les suites à donner.",
    user_story: "Copilot structure une synthèse complète du dossier prête à présenter au conseil syndical. La décision est prise en connaissance de cause.",
    prompt: "Rédige une synthèse du dossier d'impayé à présenter au conseil syndical. La synthèse doit inclure : 1) identification du copropriétaire et du lot, 2) chronologie complète des impayés et des relances effectuées, 3) montant total dû avec décomposition (charges courantes, provisions, pénalités), 4) réponses ou explications fournies par le copropriétaire, 5) options recommandées avec leurs avantages et inconvénients (échéancier, procédure judiciaire, vente forcée), 6) avis du gestionnaire. Format décisionnel, une page.",
    gain: "30 min", garde_fou: null, gratuit: true
  },
  {
    id: "impayes-007", parcours: "impayes", parcoursLabel: "Relancer et suivre mes impayés",
    workflow: "Escalade et mise en demeure", titre: "Préparation du dossier pour avocat", outil: "Word",
    niveau: "Avancé",
    contexte: "Décision prise de recourir à la procédure judiciaire après échec des relances amiables.",
    user_story: "Copilot structure le dossier complet à transmettre à l'avocat avec toutes les pièces et chronologie. Vous réduisez les allers-retours et les honoraires.",
    prompt: "Prépare un dossier synthétique à transmettre à l'avocat pour procédure en recouvrement. Le dossier doit contenir : 1) fiche récapitulative du copropriétaire et du lot (tantièmes, situation locative), 2) tableau de la créance avec décomposition précise, 3) chronologie des relances avec preuves (dates d'envoi, AR), 4) historique de la relation (échanges, promesses faites), 5) liste des pièces jointes (règlement de copropriété, relevé de compte, courriers), 6) questions spécifiques à poser à l'avocat. Format transmissible directement.",
    gain: "60 min", garde_fou: "Le dossier transmis à l'avocat engage la copropriété — faire valider par le CS avant envoi.", gratuit: false
  },
  {
    id: "impayes-008", parcours: "impayes", parcoursLabel: "Relancer et suivre mes impayés",
    workflow: "Escalade et mise en demeure", titre: "Email de notification au CS", outil: "Outlook",
    niveau: "Avancé",
    contexte: "Passage en phase contentieuse d'un dossier important — le conseil syndical doit être informé et consulté.",
    user_story: "Copilot rédige l'email de notification au CS avec toutes les informations nécessaires à la décision. Le CS est informé sans être noyé dans les détails.",
    prompt: "Rédige un email au conseil syndical pour les informer du passage en phase contentieuse d'un dossier d'impayé. L'email doit : 1) résumer le dossier en 5 lignes (qui, combien, depuis quand, démarches effectuées), 2) expliquer pourquoi les voies amiables sont épuisées, 3) présenter les options contentieuses disponibles avec leurs coûts et délais estimés, 4) demander une validation pour engager la procédure choisie, 5) indiquer le délai dans lequel la décision est nécessaire. Ton informatif et décisionnel.",
    gain: "20 min", garde_fou: null, gratuit: false
  },
  {
    id: "impayes-009", parcours: "impayes", parcoursLabel: "Relancer et suivre mes impayés",
    workflow: "Suivi contentieux", titre: "Journal de suivi des procédures", outil: "Word",
    niveau: "Essentiel",
    contexte: "3 dossiers contentieux en cours simultanément à des stades différents de la procédure.",
    user_story: "Copilot structure un journal de suivi centralisé pour tous vos dossiers contentieux. Vous ne ratez aucune échéance procédurale.",
    prompt: "Crée un journal de suivi pour les procédures contentieuses en cours. Pour chaque dossier : 1) identifiant du dossier (copropriétaire, lot, référence), 2) montant de la créance actualisé, 3) stade de la procédure (injonction de payer, opposition, saisie, vente), 4) avocat mandaté et référence dossier cabinet, 5) dernière action et date, 6) prochaine échéance et action requise, 7) probabilité de recouvrement estimée. Tableau mis à jour mensuellement.",
    gain: "30 min", garde_fou: null, gratuit: true
  },
  {
    id: "impayes-010", parcours: "impayes", parcoursLabel: "Relancer et suivre mes impayés",
    workflow: "Suivi contentieux", titre: "Rapport mensuel des impayés", outil: "Excel",
    niveau: "Essentiel",
    contexte: "Copropriété de 45 lots avec un taux d'impayés de 8% à présenter au conseil syndical chaque mois.",
    user_story: "Copilot génère le rapport mensuel des impayés avec indicateurs clés et évolution. Le CS prend le pouls de la situation financière en un coup d'œil.",
    prompt: "Génère un rapport mensuel des impayés pour présentation au conseil syndical. Le rapport doit inclure : 1) montant total des impayés au [date] vs mois précédent, 2) nombre de copropriétaires en retard et répartition par stade (amiable/mise en demeure/contentieux), 3) top 3 des dossiers les plus importants, 4) encaissements du mois et taux de recouvrement, 5) prévision des encaissements attendus, 6) actions engagées ce mois et résultats. Format tableau de bord, visuel et synthétique.",
    gain: "25 min", garde_fou: null, gratuit: true
  },
  {
    id: "impayes-011", parcours: "impayes", parcoursLabel: "Relancer et suivre mes impayés",
    workflow: "Suivi contentieux", titre: "Plan de remboursement échelonné", outil: "Word",
    niveau: "Avancé",
    contexte: "Copropriétaire de bonne foi avec une dette de 4 500€ qui propose de rembourser en 12 mensualités.",
    user_story: "Copilot rédige une convention d'échéancier formalisée et juridiquement opposable. Vous sécurisez l'accord et facilitez le suivi.",
    prompt: "Rédige une convention d'échéancier de remboursement pour une dette de charges de copropriété. La convention doit inclure : 1) identification des parties, 2) reconnaissance de la dette (montant, origine, période), 3) tableau d'échéancier mensuel avec dates et montants, 4) clause de déchéance du terme en cas de retard de paiement, 5) modalités de paiement acceptées, 6) mention que cet accord ne constitue pas une renonciation aux poursuites si non-respect, 7) signatures. Style juridique adapté, document opposable.",
    gain: "35 min", garde_fou: "Faire valider la convention par l'avocat référent avant signature si le montant dépasse 3 000€.", gratuit: false
  },
  {
    id: "impayes-012", parcours: "impayes", parcoursLabel: "Relancer et suivre mes impayés",
    workflow: "Suivi contentieux", titre: "Analyse de l'exposition financière", outil: "Excel",
    niveau: "Avancé",
    contexte: "Fin d'exercice — analyse des impayés pour évaluer le risque réel sur les comptes de la copropriété.",
    user_story: "Copilot calcule l'exposition financière réelle en tenant compte des probabilités de recouvrement. Le CS prend ses décisions budgétaires sur la base de données fiables.",
    prompt: "Analyse les dossiers d'impayés en cours et produis une évaluation de l'exposition financière nette. Pour chaque dossier : 1) montant brut de la créance, 2) stade de la procédure, 3) probabilité de recouvrement estimée (%), 4) montant net probable, 5) coûts de procédure engagés et à venir. En synthèse : total des créances brutes, total net probable, provisions recommandées, impact sur la trésorerie. Recommandation sur les provisions à passer en charges exceptionnelles.",
    gain: "60 min", garde_fou: "Les probabilités de recouvrement sont des estimations — les valider avec votre avocat pour chaque dossier.", gratuit: false
  },

  // ─── PARCOURS 5 : REUNIONS ─────────────────────────────────────────────────
  {
    id: "reunions-001", parcours: "reunions", parcoursLabel: "Animer et restituer mes réunions",
    workflow: "Préparation de la réunion", titre: "Ordre du jour réunion CS", outil: "Word",
    niveau: "Essentiel",
    contexte: "Réunion mensuelle du conseil syndical avec 5 sujets récurrents et 3 sujets ponctuels à traiter.",
    user_story: "Copilot structure un ordre du jour complet et minuté pour votre réunion CS. La réunion démarre sans improvisation.",
    prompt: "Rédige un ordre du jour structuré pour une réunion du conseil syndical. Pour chaque point : 1) numéro et intitulé clair, 2) durée estimée, 3) objectif (information, décision, validation), 4) documents nécessaires à préparer, 5) responsable de présentation. Inclus les points d'ouverture (validation du PV précédent) et de clôture (prochaine réunion). Durée totale : 2h maximum. Format convocation + ordre du jour en un document.",
    gain: "20 min", garde_fou: null, gratuit: true
  },
  {
    id: "reunions-002", parcours: "reunions", parcoursLabel: "Animer et restituer mes réunions",
    workflow: "Préparation de la réunion", titre: "Fiches briefing participants", outil: "Word",
    niveau: "Essentiel",
    contexte: "Réunion avec un prestataire technique et deux membres du CS pour discuter d'un projet de rénovation.",
    user_story: "Copilot prépare une fiche de contexte pour chaque participant. Tout le monde arrive avec le même niveau d'information.",
    prompt: "Prépare des fiches de briefing pour les participants à cette réunion. Pour chaque participant : 1) rôle dans la réunion (décideur, expert, observateur), 2) informations contextuelles qu'ils doivent connaître, 3) points sur lesquels leur avis est attendu, 4) questions qu'ils pourraient poser et éléments de réponse. En commun : contexte général du projet, enjeux de la réunion, décisions attendues à l'issue. Format : une fiche par participant, une page maximum chacune.",
    gain: "30 min", garde_fou: null, gratuit: true
  },
  {
    id: "reunions-003", parcours: "reunions", parcoursLabel: "Animer et restituer mes réunions",
    workflow: "Préparation de la réunion", titre: "Présentation synthétique du dossier", outil: "Word",
    niveau: "Avancé",
    contexte: "Présentation d'un projet de travaux de 120 000€ au conseil syndical — dossier technique de 40 pages.",
    user_story: "Copilot transforme un dossier technique complexe en présentation claire et décisionnelle pour les membres du CS. Vous communiquez efficacement sans noyer votre audience.",
    prompt: "À partir de ce dossier technique, rédige une présentation de 5 slides maximum pour le conseil syndical. Chaque slide doit couvrir : 1) contexte et problème à résoudre, 2) solution proposée et alternatives écartées, 3) budget détaillé et comparaison des offres, 4) planning et impact sur les copropriétaires, 5) décision demandée et prochaines étapes. Style : titre + 5 bullets maximum par slide, données chiffrées en valeur et pourcentage. Pas de jargon technique.",
    gain: "60 min", garde_fou: null, gratuit: false
  },
  {
    id: "reunions-004", parcours: "reunions", parcoursLabel: "Animer et restituer mes réunions",
    workflow: "Préparation de la réunion", titre: "Checklist pré-réunion", outil: "Word",
    niveau: "Avancé",
    contexte: "Réunion CS importante avec visite de site, présentation de prestataires et vote sur un budget exceptionnel.",
    user_story: "Copilot génère une checklist complète des préparatifs à effectuer avant la réunion. Rien n'est oublié le jour J.",
    prompt: "Génère une checklist de préparation complète pour cette réunion de conseil syndical. Organise par catégorie : 1) documents (liste des pièces à préparer et délai), 2) logistique (salle, matériel, accès), 3) participants (convocations, confirmations, accueils), 4) prestataires invités (briefing, matériel de présentation), 5) vote (feuilles de vote, quorum, règle de majorité applicable). Délais indicatifs pour chaque action : J-15, J-7, J-2, J-1, Jour J. Format checklist avec cases à cocher.",
    gain: "25 min", garde_fou: null, gratuit: false
  },
  {
    id: "reunions-005", parcours: "reunions", parcoursLabel: "Animer et restituer mes réunions",
    workflow: "Animation en temps réel", titre: "Résumé en temps réel de la discussion", outil: "Teams",
    niveau: "Essentiel",
    contexte: "Réunion en visioconférence Teams avec 8 participants, débat sur l'attribution d'un marché de nettoyage.",
    user_story: "Copilot capture la transcription Teams et produit un résumé structuré en temps réel. Vous gardez le fil même pendant les discussions animées.",
    prompt: "À partir de la transcription de cette réunion Teams, produis un résumé structuré en temps réel. Pour chaque point de l'ordre du jour abordé : 1) synthèse des positions exprimées par chaque participant, 2) arguments clés pour et contre, 3) points d'accord et désaccords identifiés, 4) décisions prises ou à prendre. Signal les moments clés avec un horodatage. Format : note de réunion en temps réel, actualisable.",
    gain: "45 min", garde_fou: null, gratuit: true
  },
  {
    id: "reunions-006", parcours: "reunions", parcoursLabel: "Animer et restituer mes réunions",
    workflow: "Animation en temps réel", titre: "Capture des décisions et votes", outil: "Teams",
    niveau: "Essentiel",
    contexte: "Réunion CS avec 5 votes à formaliser, participants présents et votes par procuration.",
    user_story: "Copilot extrait et formalise chaque décision prise pendant la réunion avec son résultat de vote. Votre PV est déjà à moitié rédigé à la fin de la réunion.",
    prompt: "Extrait de la transcription de cette réunion toutes les décisions et votes. Pour chaque décision : 1) intitulé exact de la résolution ou décision, 2) résultat du vote (pour/contre/abstention avec noms si disponibles), 3) adoption ou rejet, 4) conditions ou réserves émises, 5) suite à donner et responsable désigné. Format tableau utilisable directement dans le PV. Classe par ordre chronologique.",
    gain: "30 min", garde_fou: null, gratuit: true
  },
  {
    id: "reunions-007", parcours: "reunions", parcoursLabel: "Animer et restituer mes réunions",
    workflow: "Animation en temps réel", titre: "Génération des actions assignées", outil: "Teams",
    niveau: "Avancé",
    contexte: "Réunion de 2h avec de nombreuses actions décidées, certaines implicites dans la discussion.",
    user_story: "Copilot extrait toutes les actions de la réunion, y compris celles non formellement votées mais acceptées. Rien ne passe entre les mailles.",
    prompt: "À partir de la transcription de cette réunion, extrais l'intégralité des actions identifiées, qu'elles aient été explicitement décidées ou implicitement acceptées. Pour chaque action : 1) description précise de l'action, 2) responsable assigné, 3) délai mentionné ou estimé, 4) ressources nécessaires, 5) critère de succès. Distingue les actions fermes des actions conditionnelles. Présente sous forme de liste de tâches assignable directement dans un outil de suivi.",
    gain: "35 min", garde_fou: "Valider la liste d'actions avec les participants avant distribution — certaines actions implicites peuvent être mal interprétées.", gratuit: false
  },
  {
    id: "reunions-008", parcours: "reunions", parcoursLabel: "Animer et restituer mes réunions",
    workflow: "Animation en temps réel", titre: "Rapport d'avancement des actions précédentes", outil: "Teams",
    niveau: "Avancé",
    contexte: "Début de réunion mensuelle CS — revue des 12 actions décidées lors de la réunion précédente.",
    user_story: "Copilot compare les actions décidées le mois dernier avec les updates fournis en réunion. Vous identifiez immédiatement les retards et les blocages.",
    prompt: "À partir du compte-rendu de la réunion précédente et des informations partagées lors de cette réunion, produis un rapport d'avancement des actions. Pour chaque action du mois précédent : 1) description de l'action, 2) responsable, 3) statut (Fait / En cours / Retardé / Annulé), 4) commentaire sur l'avancement, 5) si retardé : raison et nouvelle échéance. Calcule un taux d'avancement global et identifie les actions critiques non tenues.",
    gain: "25 min", garde_fou: null, gratuit: false
  },
  {
    id: "reunions-009", parcours: "reunions", parcoursLabel: "Animer et restituer mes réunions",
    workflow: "Restitution", titre: "Compte-rendu de réunion CS", outil: "Word",
    niveau: "Essentiel",
    contexte: "Réunion de 2h avec notes brutes à transformer en compte-rendu formel pour archivage.",
    user_story: "Copilot transforme vos notes brutes en compte-rendu structuré et professionnel. Vous archivez un document clair et exploitable.",
    prompt: "À partir de ces notes de réunion, rédige un compte-rendu officiel du conseil syndical. Le document doit inclure : 1) en-tête (date, lieu, participants présents et excusés), 2) rappel des points de l'ordre du jour, 3) pour chaque point : résumé de la discussion, décisions prises et votes si applicable, 4) actions à mener avec responsables et délais, 5) date de la prochaine réunion. Ton neutre et factuel. Format archivable.",
    gain: "50 min", garde_fou: null, gratuit: true
  },
  {
    id: "reunions-010", parcours: "reunions", parcoursLabel: "Animer et restituer mes réunions",
    workflow: "Restitution", titre: "Email de suivi aux participants", outil: "Outlook",
    niveau: "Essentiel",
    contexte: "Réunion terminée — envoi des actions et décisions aux participants dans les 24h.",
    user_story: "Copilot rédige l'email de suivi post-réunion avec les actions de chacun. Chaque participant sait ce qu'il doit faire.",
    prompt: "Rédige un email de suivi post-réunion à destination des participants. L'email doit : 1) remercier les participants et résumer l'esprit de la réunion en 2 phrases, 2) lister les décisions clés prises, 3) présenter le tableau des actions avec responsable et délai pour chaque action, 4) rappeler la date de la prochaine réunion, 5) indiquer où trouver le compte-rendu complet. Ton professionnel et dynamique. Objet : '[Copropriété X] Suivi réunion CS du [date]'.",
    gain: "15 min", garde_fou: null, gratuit: true
  },
  {
    id: "reunions-011", parcours: "reunions", parcoursLabel: "Animer et restituer mes réunions",
    workflow: "Restitution", titre: "Tableau de bord des actions en cours", outil: "Excel",
    niveau: "Avancé",
    contexte: "Accumulation d'actions sur 3 mois de réunions CS — besoin d'une vision consolidée.",
    user_story: "Copilot consolide toutes les actions des 3 derniers mois dans un tableau de bord unique. Vous pilotez l'exécution des décisions du CS avec précision.",
    prompt: "Crée un tableau de bord consolidé de toutes les actions issues des 3 dernières réunions du CS. Le tableau doit permettre : 1) filtrage par responsable, par statut, par thème, 2) visualisation de l'ancienneté de chaque action, 3) alertes automatiques pour les actions en retard (coloration rouge si dépassée), 4) calcul du taux d'avancement par responsable et global, 5) espace pour commentaires de mise à jour. Format Excel avec mise en forme conditionnelle et filtres actifs.",
    gain: "45 min", garde_fou: null, gratuit: false
  },
  {
    id: "reunions-012", parcours: "reunions", parcoursLabel: "Animer et restituer mes réunions",
    workflow: "Restitution", titre: "Rapport mensuel des décisions CS", outil: "Word",
    niveau: "Avancé",
    contexte: "Bilan trimestriel à présenter aux copropriétaires sur l'activité du conseil syndical.",
    user_story: "Copilot produit un rapport clair et accessible sur les décisions du CS du trimestre. Vous renforcez la confiance des copropriétaires dans la gestion.",
    prompt: "Rédige un rapport trimestriel de l'activité du conseil syndical à destination des copropriétaires. Le rapport doit inclure : 1) résumé des réunions tenues (dates, sujets), 2) décisions importantes prises avec leur justification, 3) avancement des travaux et projets en cours, 4) situation financière synthétique, 5) prochains sujets à l'agenda du CS. Ton transparent et pédagogique. Maximum 2 pages. À publier sur l'extranet ou envoyer par email.",
    gain: "40 min", garde_fou: null, gratuit: false
  },

  // ─── PARCOURS 6 : ECHEANCES ────────────────────────────────────────────────
  {
    id: "echeances-001", parcours: "echeances", parcoursLabel: "Suivre mes échéances réglementaires",
    workflow: "Veille et calendrier", titre: "Calendrier réglementaire annuel", outil: "Excel",
    niveau: "Essentiel",
    contexte: "Début d'année — besoin de planifier toutes les obligations réglementaires de l'ensemble du portefeuille.",
    user_story: "Copilot génère le calendrier complet des obligations réglementaires pour votre copropriété. Vous ne ratez aucune échéance légale sur l'année.",
    prompt: "Génère un calendrier annuel des obligations réglementaires pour une copropriété de taille moyenne. Pour chaque obligation : 1) nature de l'obligation (contrôle périodique, document à produire, déclaration), 2) base légale simplifiée, 3) fréquence et prochaine échéance, 4) prestataire type en charge, 5) délai de préparation recommandé. Couvre : ascenseurs, extincteurs, colonnes sèches, VMC, chaufferie, DPE collectif, DTG, AG, comptes. Format tableau Excel avec alertes de couleur par trimestre.",
    gain: "90 min", garde_fou: null, gratuit: true
  },
  {
    id: "echeances-002", parcours: "echeances", parcoursLabel: "Suivre mes échéances réglementaires",
    workflow: "Veille et calendrier", titre: "Alerte des échéances du mois", outil: "Outlook",
    niveau: "Essentiel",
    contexte: "Début de mois — besoin de vérifier quelles obligations arrivent à échéance dans les 30 prochains jours.",
    user_story: "Copilot identifie toutes les obligations qui arrivent dans les 30 prochains jours sur votre portefeuille. Vous planifiez vos actions avant que les échéances ne soient dépassées.",
    prompt: "À partir de ce calendrier réglementaire, identifie toutes les obligations arrivant à échéance dans les 30 prochains jours. Pour chaque échéance : 1) nature de l'obligation, 2) date limite, 3) copropriété concernée, 4) action requise et par qui, 5) statut (à initier / en cours / prestataire contacté). Classe par urgence et signal en rouge les obligations dépassées ou à moins de 7 jours. Génère automatiquement les emails de relance prestataires si nécessaire.",
    gain: "30 min", garde_fou: null, gratuit: true
  },
  {
    id: "echeances-003", parcours: "echeances", parcoursLabel: "Suivre mes échéances réglementaires",
    workflow: "Veille et calendrier", titre: "Analyse des non-conformités", outil: "Copilot Studio",
    niveau: "Avancé",
    contexte: "Audit interne — vérification de la conformité réglementaire de l'ensemble du parc géré.",
    user_story: "Copilot analyse l'état de conformité de votre portefeuille et identifie les non-conformités. Vous traitez les risques avant qu'ils ne deviennent des problèmes.",
    prompt: "Analyse cet état des contrôles réglementaires et identifie toutes les non-conformités. Pour chaque non-conformité : 1) nature de l'obligation manquante ou en retard, 2) copropriété concernée, 3) durée du retard, 4) risque juridique et financier associé, 5) action corrective prioritaire et délai. Classe par niveau de risque (critique/élevé/modéré) et produis un plan de remise en conformité priorisé. Estime le coût de remédiation global.",
    gain: "120 min", garde_fou: "Les risques juridiques mentionnés sont indicatifs — consulter un conseil juridique pour les situations critiques.", gratuit: false
  },
  {
    id: "echeances-004", parcours: "echeances", parcoursLabel: "Suivre mes échéances réglementaires",
    workflow: "Veille et calendrier", titre: "Veille réglementaire automatisée", outil: "Copilot Studio",
    niveau: "Avancé",
    contexte: "Évolutions législatives fréquentes en copropriété — besoin de suivre les nouvelles obligations.",
    user_story: "Copilot surveille les évolutions réglementaires et vous alerte des nouvelles obligations applicables à votre portefeuille. Vous anticipez avant d'être en infraction.",
    prompt: "Analyse les dernières évolutions réglementaires en copropriété publiées récemment et identifie celles qui s'appliquent à notre portefeuille. Pour chaque évolution : 1) nature et texte de référence, 2) date d'entrée en vigueur, 3) copropriétés concernées selon leurs caractéristiques, 4) obligations nouvelles créées, 5) actions à mener et délais. Produis une note de veille mensuelle synthétique à partager avec l'équipe de gestion.",
    gain: "60 min", garde_fou: "Valider les évolutions réglementaires identifiées avec une source officielle (Légifrance) avant de modifier vos procédures.", gratuit: false
  },
  {
    id: "echeances-005", parcours: "echeances", parcoursLabel: "Suivre mes échéances réglementaires",
    workflow: "Préparation des documents réglementaires", titre: "Rédaction du carnet d'entretien", outil: "Word",
    niveau: "Essentiel",
    contexte: "Copropriété de 1975 sans carnet d'entretien à jour — obligation légale à régulariser.",
    user_story: "Copilot rédige un carnet d'entretien structuré et conforme aux obligations légales. Votre copropriété dispose enfin d'un document réglementaire complet.",
    prompt: "Rédige un carnet d'entretien de copropriété conforme à l'article 18 de la loi du 10 juillet 1965. Le document doit inclure : 1) identification de l'immeuble (adresse, année de construction, nombre de lots), 2) historique des travaux réalisés sur les 10 dernières années, 3) contrats d'entretien en cours avec prestataires et échéances, 4) garanties en cours, 5) références des diagnostics et études réglementaires, 6) calendrier prévisionnel des travaux. Format conforme, mise à jour annuelle recommandée.",
    gain: "120 min", garde_fou: null, gratuit: true
  },
  {
    id: "echeances-006", parcours: "echeances", parcoursLabel: "Suivre mes échéances réglementaires",
    workflow: "Préparation des documents réglementaires", titre: "Fiche de contrôle périodique", outil: "Word",
    niveau: "Essentiel",
    contexte: "Contrôle annuel de l'installation de chauffage collectif — besoin d'une fiche de suivi standardisée.",
    user_story: "Copilot génère une fiche de contrôle standardisée pour chaque type d'équipement. Vos contrôles sont documentés et archivés de manière homogène.",
    prompt: "Crée une fiche de contrôle périodique pour une installation de chauffage collectif. La fiche doit contenir : 1) identification de l'équipement (marque, modèle, date d'installation, numéro de série), 2) liste des points de contrôle obligatoires avec cases à cocher, 3) mesures relevées (pression, température, rendement), 4) observations et anomalies constatées, 5) actions correctives préconisées avec délai, 6) signatures du technicien et du gestionnaire, 7) date du prochain contrôle. Format A4, réutilisable.",
    gain: "30 min", garde_fou: null, gratuit: true
  },
  {
    id: "echeances-007", parcours: "echeances", parcoursLabel: "Suivre mes échéances réglementaires",
    workflow: "Préparation des documents réglementaires", titre: "Rapport DTG simplifié", outil: "Word",
    niveau: "Avancé",
    contexte: "Copropriété de plus de 10 ans devant réaliser son Diagnostic Technique Global obligatoire.",
    user_story: "Copilot rédige la trame du rapport DTG à compléter avec le bureau d'études. Vous réduisez le coût de la prestation et accélérez le processus.",
    prompt: "Rédige la trame d'un Diagnostic Technique Global (DTG) conforme à la loi ALUR. Le document doit inclure : 1) analyse de l'état apparent des parties communes et équipements collectifs, 2) état de la situation du syndicat vis-à-vis des obligations légales, 3) analyse des améliorations possibles de la gestion technique, 4) liste des travaux nécessaires à 10 ans avec estimation budgétaire, 5) plan pluriannuel de travaux synthétique. Trame avec sections à compléter par le bureau d'études technique.",
    gain: "90 min", garde_fou: "Le DTG doit être réalisé par un professionnel qualifié — cette trame est un support préparatoire, non un substitut.", gratuit: false
  },
  {
    id: "echeances-008", parcours: "echeances", parcoursLabel: "Suivre mes échéances réglementaires",
    workflow: "Préparation des documents réglementaires", titre: "Note d'information légale copropriétaires", outil: "Word",
    niveau: "Avancé",
    contexte: "Nouvelle obligation de DPE collectif imposée par la loi Climat et Résilience à communiquer aux copropriétaires.",
    user_story: "Copilot rédige une note d'information claire sur la nouvelle obligation légale. Les copropriétaires sont informés sans panique et comprennent les enjeux.",
    prompt: "Rédige une note d'information à destination des copropriétaires sur cette nouvelle obligation réglementaire. La note doit : 1) expliquer l'obligation en termes simples (quoi, pourquoi, pour qui), 2) préciser le calendrier d'application et les délais, 3) décrire ce que le syndic va mettre en œuvre, 4) informer sur les conséquences d'un non-respect, 5) répondre aux questions fréquentes. Ton pédagogique, sans alarmisme. Maximum une page. À annexer à la prochaine convocation d'AG.",
    gain: "35 min", garde_fou: null, gratuit: false
  },
  {
    id: "echeances-009", parcours: "echeances", parcoursLabel: "Suivre mes échéances réglementaires",
    workflow: "Alertes et suivi", titre: "Relance prestataire contrôle", outil: "Outlook",
    niveau: "Essentiel",
    contexte: "L'entreprise de maintenance ascenseur n'a pas effectué la vérification semestrielle obligatoire dans les délais.",
    user_story: "Copilot rédige une relance formelle qui documente le retard et ses implications réglementaires. Vous maintenez la pression en créant une traçabilité.",
    prompt: "Rédige un email de relance au prestataire de maintenance pour un contrôle réglementaire non effectué dans les délais. L'email doit : 1) rappeler la nature du contrôle obligatoire et sa base légale, 2) indiquer la date à laquelle il aurait dû être effectué, 3) souligner la responsabilité du syndic et du prestataire en cas d'incident, 4) demander une date d'intervention ferme sous 72h, 5) mentionner qu'un signalement à l'organisme de certification sera fait en cas de non-réponse. Ton ferme et documenté.",
    gain: "12 min", garde_fou: null, gratuit: true
  },
  {
    id: "echeances-010", parcours: "echeances", parcoursLabel: "Suivre mes échéances réglementaires",
    workflow: "Alertes et suivi", titre: "Tableau de bord des contrôles", outil: "Excel",
    niveau: "Essentiel",
    contexte: "Portefeuille de 8 copropriétés — suivi des contrôles réglementaires de l'ensemble du parc.",
    user_story: "Copilot génère un tableau de bord de conformité pour tout votre portefeuille. Vous pilotez les contrôles de manière proactive.",
    prompt: "Crée un tableau de bord de suivi des contrôles réglementaires pour un portefeuille de copropriétés. Colonnes : Copropriété | Type de contrôle | Base légale | Périodicité | Dernier contrôle | Prochain contrôle | Prestataire | Statut | Observations. Lignes : tous les contrôles obligatoires (ascenseur, extincteurs, colonne sèche, VMC, électricité parties communes, gaz, chauffage, DPE). Mise en forme conditionnelle : vert (>3 mois), orange (1-3 mois), rouge (<1 mois ou dépassé).",
    gain: "60 min", garde_fou: null, gratuit: true
  },
  {
    id: "echeances-011", parcours: "echeances", parcoursLabel: "Suivre mes échéances réglementaires",
    workflow: "Alertes et suivi", titre: "Rapport de conformité annuel", outil: "Word",
    niveau: "Avancé",
    contexte: "Bilan annuel de conformité réglementaire à présenter en AG pour démontrer le sérieux de la gestion.",
    user_story: "Copilot rédige le rapport de conformité annuel complet. Vous démontrez votre professionnalisme aux copropriétaires avec des données fiables.",
    prompt: "Rédige un rapport annuel de conformité réglementaire à destination des copropriétaires. Le rapport doit présenter : 1) tous les contrôles et vérifications effectués dans l'année, 2) résultats et observations pour chaque contrôle, 3) travaux de mise en conformité réalisés, 4) points de non-conformité en cours de traitement, 5) planification des contrôles de l'année suivante. Ton transparent et factuel. Chiffres et dates précis. Format présentable en AG.",
    gain: "75 min", garde_fou: null, gratuit: false
  },
  {
    id: "echeances-012", parcours: "echeances", parcoursLabel: "Suivre mes échéances réglementaires",
    workflow: "Alertes et suivi", titre: "Plan pluriannuel de mise en conformité", outil: "Word",
    niveau: "Avancé",
    contexte: "Copropriété des années 80 avec plusieurs mises en conformité à planifier sur 5 ans et à financer.",
    user_story: "Copilot structure un plan pluriannuel de mise en conformité avec budget et priorisation. Le CS dispose d'une feuille de route claire pour les 5 prochaines années.",
    prompt: "Élabore un plan pluriannuel de mise en conformité réglementaire sur 5 ans. Pour chaque action : 1) nature de la mise en conformité, 2) base réglementaire, 3) urgence (immédiate / 1 an / 2-3 ans / 4-5 ans), 4) coût estimé, 5) source de financement possible (trésorerie, emprunt, subvention), 6) prestataire type recommandé. Synthèse budgétaire par année et plan de financement global. Présentation décisionnelle pour l'AG.",
    gain: "120 min", garde_fou: "Les estimations budgétaires sont indicatives — obtenir des devis réels avant de voter le financement.", gratuit: false
  },

  // ─── PARCOURS 7 : PORTEFEUILLE ─────────────────────────────────────────────
  {
    id: "portefeuille-001", parcours: "portefeuille", parcoursLabel: "Piloter mon portefeuille",
    workflow: "Tableau de bord mensuel", titre: "Synthèse de portefeuille", outil: "Excel",
    niveau: "Essentiel",
    contexte: "Gestionnaire gérant 10 copropriétés — besoin d'une vue consolidée mensuelle de l'état du portefeuille.",
    user_story: "Copilot consolide les indicateurs clés de toutes vos copropriétés dans un tableau de bord unique. Vous pilotez votre portefeuille en 10 minutes.",
    prompt: "Crée un tableau de bord mensuel consolidé pour un portefeuille de copropriétés. Pour chaque résidence, indique : 1) taux d'impayés (%), 2) nombre de sinistres ouverts, 3) budget consommé vs prévu (%), 4) nombre d'actions en retard, 5) prochaine échéance critique. En synthèse : top 3 des copropriétés à surveiller, indicateurs globaux du portefeuille, charge de travail estimée du mois. Format Excel avec tableau de bord visuel et sparklines.",
    gain: "60 min", garde_fou: null, gratuit: true
  },
  {
    id: "portefeuille-002", parcours: "portefeuille", parcoursLabel: "Piloter mon portefeuille",
    workflow: "Tableau de bord mensuel", titre: "Top des copropriétés à risque", outil: "Excel",
    niveau: "Essentiel",
    contexte: "Fin de mois — identification des copropriétés qui nécessitent une attention particulière la semaine suivante.",
    user_story: "Copilot classe vos copropriétés par niveau de risque global. Vous allouez votre temps là où c'est le plus critique.",
    prompt: "Analyse les données de mon portefeuille et classe les copropriétés par niveau de risque global. Le score de risque doit combiner : taux d'impayés (30%), sinistres ouverts (20%), conformité réglementaire (20%), conflits copropriétaires en cours (15%), budget consommé (15%). Pour chaque copropriété : score de risque sur 100, niveau (Rouge/Orange/Vert), top 3 des facteurs de risque, action prioritaire recommandée. Trie par score décroissant.",
    gain: "30 min", garde_fou: null, gratuit: true
  },
  {
    id: "portefeuille-003", parcours: "portefeuille", parcoursLabel: "Piloter mon portefeuille",
    workflow: "Tableau de bord mensuel", titre: "Analyse de la charge de travail", outil: "Excel",
    niveau: "Avancé",
    contexte: "Gestionnaire débordé — besoin de quantifier sa charge pour argumenter un recrutement ou une réorganisation.",
    user_story: "Copilot quantifie votre charge de travail par copropriété et par type de tâche. Vous avez des données objectives pour dialoguer avec votre direction.",
    prompt: "Analyse ma charge de travail sur le portefeuille ce mois-ci. Pour chaque copropriété, estime le temps passé par catégorie : emails et appels (h), gestion administrative (h), suivi prestataires (h), réunions et AG (h), sinistres et contentieux (h). Calcule : total par copropriété, total par catégorie, ratio charge/honoraires, copropriétés déficitaires en temps. Comparaison avec les normes sectorielles (lots/gestionnaire). Recommandations de priorisation ou délestage.",
    gain: "45 min", garde_fou: null, gratuit: false
  },
  {
    id: "portefeuille-004", parcours: "portefeuille", parcoursLabel: "Piloter mon portefeuille",
    workflow: "Tableau de bord mensuel", titre: "KPIs de performance du portefeuille", outil: "Excel",
    niveau: "Avancé",
    contexte: "Revue trimestrielle avec la direction — présentation des KPIs de performance du portefeuille géré.",
    user_story: "Copilot calcule et visualise les KPIs clés de votre portefeuille. Vous présentez vos résultats avec des données objectives et comparables.",
    prompt: "Calcule les KPIs de performance de mon portefeuille pour la revue trimestrielle. Indicateurs à calculer : 1) taux de recouvrement des charges (%), 2) délai moyen de traitement des sinistres (jours), 3) taux de conformité réglementaire (%), 4) satisfaction copropriétaires si données disponibles, 5) taux de renouvellement des contrats syndic, 6) ratio incidents/lots géré. Pour chaque KPI : valeur actuelle, valeur trimestre précédent, évolution, benchmark sectoriel si disponible. Visualisation graphique recommandée.",
    gain: "50 min", garde_fou: null, gratuit: false
  },
  {
    id: "portefeuille-005", parcours: "portefeuille", parcoursLabel: "Piloter mon portefeuille",
    workflow: "Reporting clients", titre: "Rapport mensuel au CS", outil: "Word",
    niveau: "Essentiel",
    contexte: "Rapport mensuel de gestion à envoyer au conseil syndical de chaque copropriété.",
    user_story: "Copilot rédige le rapport mensuel de gestion structuré et complet. Le CS est informé sans être noyé dans les détails.",
    prompt: "Rédige un rapport mensuel de gestion destiné au conseil syndical. Le rapport doit couvrir : 1) faits marquants du mois (incidents, sinistres, travaux), 2) situation financière (encaissements, dépenses, solde de trésorerie), 3) état des impayés avec évolution, 4) suivi des prestataires et contrats (renouvellements, incidents), 5) échéances du mois suivant, 6) points nécessitant une décision du CS. Maximum 2 pages. Ton professionnel et synthétique.",
    gain: "40 min", garde_fou: null, gratuit: true
  },
  {
    id: "portefeuille-006", parcours: "portefeuille", parcoursLabel: "Piloter mon portefeuille",
    workflow: "Reporting clients", titre: "Email de compte rendu mensuel", outil: "Outlook",
    niveau: "Essentiel",
    contexte: "Email mensuel récapitulatif à envoyer à chaque président de CS ou contact principal.",
    user_story: "Copilot rédige l'email mensuel de compte rendu en moins de 5 minutes. Votre communication client est régulière et professionnelle.",
    prompt: "Rédige un email mensuel de compte rendu de gestion à destination du président du conseil syndical. L'email doit : 1) objet clair avec le mois concerné, 2) résumé exécutif en 5 bullets (faits marquants, situation financière, points d'attention), 3) invitation à consulter le rapport complet en pièce jointe, 4) question ou point nécessitant une réponse ou décision, 5) disponibilité pour un appel si besoin. Ton chaleureux et professionnel. Maximum 20 lignes.",
    gain: "15 min", garde_fou: null, gratuit: true
  },
  {
    id: "portefeuille-007", parcours: "portefeuille", parcoursLabel: "Piloter mon portefeuille",
    workflow: "Reporting clients", titre: "Présentation bilan annuel", outil: "Word",
    niveau: "Avancé",
    contexte: "Fin d'exercice — bilan annuel complet à présenter en AG pour valoriser la gestion.",
    user_story: "Copilot structure la présentation du bilan annuel de gestion. Vous valorisez votre travail avec des données concrètes et présentables.",
    prompt: "Rédige la présentation du bilan annuel de gestion à présenter en AG. La présentation doit couvrir : 1) rappel des engagements pris en début d'année et leur réalisation, 2) faits marquants de l'exercice (sinistres traités, travaux réalisés, conformités obtenues), 3) bilan financier de l'exercice (budget vs réalisé, impayés, trésorerie), 4) actions menées pour améliorer la vie de la copropriété, 5) perspectives pour l'année suivante. Ton positif et factuel. Format convaincant pour les copropriétaires.",
    gain: "90 min", garde_fou: null, gratuit: false
  },
  {
    id: "portefeuille-008", parcours: "portefeuille", parcoursLabel: "Piloter mon portefeuille",
    workflow: "Reporting clients", titre: "Note de transparence financière", outil: "Word",
    niveau: "Avancé",
    contexte: "Demande de transparence d'un copropriétaire sur l'utilisation des fonds de la copropriété.",
    user_story: "Copilot rédige une note de transparence claire et documentée qui répond aux interrogations sans exposer la copropriété. Vous gagnez la confiance tout en protégeant les informations sensibles.",
    prompt: "Rédige une note de transparence financière en réponse à une demande de copropriétaire. La note doit : 1) récapituler le budget approuvé en AG et les postes principaux, 2) présenter les dépenses réelles du semestre avec justifications, 3) expliquer les écarts significatifs entre budget et réalisé, 4) détailler l'état de la trésorerie et des provisions, 5) informer sur les droits de consultation des documents comptables. Ton transparent et pédagogique, sans excès de détail sur les prestataires.",
    gain: "35 min", garde_fou: "Ne jamais divulguer les informations personnelles des autres copropriétaires (montants individuels d'impayés, identités).", gratuit: false
  },
  {
    id: "portefeuille-009", parcours: "portefeuille", parcoursLabel: "Piloter mon portefeuille",
    workflow: "Anticipation et planification", titre: "Détection des points chauds émergents", outil: "Copilot Studio",
    niveau: "Essentiel",
    contexte: "Veille mensuelle sur les signaux faibles du portefeuille avant qu'ils ne deviennent des problèmes.",
    user_story: "Copilot analyse les données du portefeuille et détecte les signaux faibles. Vous intervenez avant que les situations ne s'aggravent.",
    prompt: "Analyse les données de mon portefeuille (emails, impayés, sinistres, retards) et identifie les signaux faibles émergents. Un signal faible peut être : augmentation des emails d'un copropriétaire, premier retard de paiement d'un bon payeur, prestataire qui tarde à répondre, copropriété dont les charges dérapent. Pour chaque signal : nature, copropriété concernée, données observées, risque potentiel à 3 mois, action préventive recommandée.",
    gain: "40 min", garde_fou: null, gratuit: true
  },
  {
    id: "portefeuille-010", parcours: "portefeuille", parcoursLabel: "Piloter mon portefeuille",
    workflow: "Anticipation et planification", titre: "Plan d'action mensuel priorisé", outil: "Word",
    niveau: "Essentiel",
    contexte: "Début de mois — organisation de la charge de travail sur les 4 prochaines semaines.",
    user_story: "Copilot organise votre charge de travail du mois par semaine et par priorité. Vous commencez le mois avec un plan clair.",
    prompt: "À partir des actions en cours, des échéances et des alertes de mon portefeuille, génère un plan d'action mensuel organisé par semaine. Pour chaque semaine : top 5 des priorités, actions à planifier (réunions, visites, appels), documents à produire, échéances réglementaires à traiter. En synthèse : charge estimée par semaine (nombre d'actions), identification de la semaine la plus chargée, recommandations d'anticipation. Format agenda actionnable.",
    gain: "25 min", garde_fou: null, gratuit: true
  },
  {
    id: "portefeuille-011", parcours: "portefeuille", parcoursLabel: "Piloter mon portefeuille",
    workflow: "Anticipation et planification", titre: "Simulation budgétaire", outil: "Excel",
    niveau: "Avancé",
    contexte: "Préparation des budgets prévisionnels pour les 5 AG de l'automne prochain.",
    user_story: "Copilot génère des simulations budgétaires automatisées basées sur l'historique et les tendances. Vous préparez 5 budgets en une matinée.",
    prompt: "Crée un modèle de simulation budgétaire pour la préparation des budgets prévisionnels. Le modèle doit : 1) partir du budget N-1 comme base, 2) appliquer automatiquement les indices d'évolution (énergie, main d'œuvre, assurance) avec sources, 3) intégrer les nouvelles dépenses connues (travaux votés, nouveaux contrats), 4) calculer l'impact sur les appels de fonds par lot, 5) permettre de tester des scénarios (hausse/baisse de 5, 10, 15%). Format Excel avec paramètres modifiables en haut du tableau et résultats automatiques.",
    gain: "120 min", garde_fou: null, gratuit: false
  },
  {
    id: "portefeuille-012", parcours: "portefeuille", parcoursLabel: "Piloter mon portefeuille",
    workflow: "Anticipation et planification", titre: "Rapport de prévision annuelle", outil: "Word",
    niveau: "Avancé",
    contexte: "Janvier — préparation du plan de charge annuel et des enjeux à venir pour chaque copropriété.",
    user_story: "Copilot rédige le rapport de prévision annuelle par copropriété. Vous anticipez les enjeux de l'année et planifiez vos ressources en conséquence.",
    prompt: "Rédige un rapport de prévision annuelle pour le portefeuille. Pour chaque copropriété : 1) principaux enjeux de l'année (travaux planifiés, renouvellements de contrats, AG complexe, situation conflictuelle), 2) charge de travail estimée en comparaison avec l'année précédente, 3) risques identifiés et mesures préventives, 4) opportunités (optimisation, renégociation, amélioration de la relation). En synthèse portefeuille : top 3 des copropriétés prioritaires, ressources nécessaires, objectifs de performance. Format stratégique, une page par copropriété.",
    gain: "90 min", garde_fou: null, gratuit: false
  }
];

// Constantes utiles
const PARCOURS_CONFIG = [
  { id: "emails", label: "Traiter mes emails rapidement", situation: "Vous êtes submergé d'emails dès le matin", outil: "Outlook", gain: "2h/jour" },
  { id: "ag", label: "Préparer une AG de A à Z", situation: "L'AG approche et vous avez 12 résolutions à préparer", outil: "Word", gain: "1 jour" },
  { id: "sinistre", label: "Gérer un sinistre de bout en bout", situation: "Un dégât des eaux vient d'être signalé", outil: "Outlook", gain: "3h/dossier" },
  { id: "impayes", label: "Relancer et suivre mes impayés", situation: "8 comptes en retard à gérer ce mois-ci", outil: "Excel", gain: "1h/semaine" },
  { id: "reunions", label: "Animer et restituer mes réunions", situation: "Réunion CS dans 2 jours, rien n'est préparé", outil: "Teams", gain: "45 min/réunion" },
  { id: "echeances", label: "Suivre mes échéances réglementaires", situation: "Vous gérez 8 copropriétés avec des contrôles partout", outil: "Excel", gain: "2h/mois" },
  { id: "portefeuille", label: "Piloter mon portefeuille", situation: "10 copropriétés à piloter, impossible d'avoir une vue d'ensemble", outil: "Excel", gain: "3h/mois" }
];

const OUTILS = ["Outlook", "Word", "Teams", "Excel", "Copilot Studio"];
