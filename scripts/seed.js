require('dotenv').config();
const pool = require('../src/db');

/**
 * PARTIE E: ONE-OFF TASK (SEED)
 * Tu dois implémenter un script qui insère des données.
 * Ce script sera lancé via: scalingo run npm run seed
 */
async function runSeed() {
  console.log("Démarrage du script de seed...");

  try {
    // TODO: Tu dois compléter l'insertion de données
    console.log("Seed non implémenté ! Tu dois compléter cette partie.");

    process.exit(0);
  } catch (error) {
    console.error("Erreur lors du seed:", error);
    process.exit(1);
  }
}

runSeed();
