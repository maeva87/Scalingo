const express = require('express');
const pool = require('./db');
const app = express();

/**
 * PARTIE C: VARIABLES D'ENVIRONNEMENT
 * Tu dois afficher MESSAGE_BIENVENUE et DEBUG ici.
 */
app.get('/', (req, res) => {
  const message = "Tu dois compléter";
  const debug = "Tu dois compléter";

  res.send(`
    <h1>${message}</h1>
    <p>Debug mode: ${debug}</p>
    <hr>
    <a href="/health">Santé</a> | <a href="/db">Base de données</a>
  `);
});

/**
 * PARTIE A: ROUTE /HEALTH
 */
app.get('/health', (req, res) => {
  res.json({ status: 'Pas OK' });
});

/**
 * PARTIE E: POSTGRESQL
 * Tu dois implémenter une lecture ou écriture en base.
 */
app.get('/db', async (req, res) => {
  try {
    // Exemple de requête: await pool.query('SELECT NOW()');
    res.send("Route /db : Tu dois compléter l'implémentation !");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = app;
