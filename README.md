# Pokémon Node.js App

Une application Express.js pour explorer, capturer et visualiser des Pokémon, avec interface EJS moderne (glassmorphism), base SQLite, architecture modulaire et tests d'intégration.

## Fonctionnalités
- Liste tous les Pokémon depuis un fichier JSON ou une base SQLite
- Capture de Pokémon (persistant en base)
- Visualisation des Pokémon capturés (side-card dynamique)
- UI EJS stylée (glassmorphism, emoji, pills, responsive)
- API RESTful + Swagger UI (`/doc`)
- Architecture modulaire (routes, controllers, repositories, db)
- Tests d'intégration avec Vitest + Supertest
- Prêt pour le load-testing (Artillery)

## Installation

```sh
# Clone le repo
# Installe les dépendances
npm install
```

## Lancement

```sh
# Démarre en mode dev (hot reload)
npm run dev
# ou en mode prod
npm start
```

L'application sera accessible sur http://localhost:8080 (ou le port défini dans `PORT`).

## Variables d'environnement
- `PORT` : port d'écoute (défaut 8080)
- `DB_PATH` : chemin du pokedex JSON (défaut `src/data/pokedex.json`)

## Tests

```sh
# Lancer tous les tests d'intégration
npm test
# Mode interactif
npm run test:watch
```

## Structure du projet

```
src/
  index.js                # Entrée principale Express
  routes/                 # Définition des routes
  controllers/            # Logique métier
  repositories/           # Accès aux données (JSON/SQLite)
  data/                   # pokedex.json, database.sqlite
  templates/              # Vues EJS
  schema.js               # Validation JSON
swagger.json              # Documentation API
public/                   # (optionnel) fichiers statiques
```

## Load Testing

Utilise [Artillery](https://artillery.io/) avec le fichier `artillery.yml` pour simuler du trafic.

```sh
npx artillery run artillery.yml
```

## Ignorés par git
- `node_modules/`
- `src/data/database.sqlite`
- fichiers temporaires, logs, .env, etc. (voir `.gitignore`)

## Auteur
- Oceanekolau & contributors

## Licence
Voir `licence.md`.
