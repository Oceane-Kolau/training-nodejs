import express from "express";
import process, { exit } from "node:process";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' with { type: 'json' };
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from 'url';
import capturedPokemonRoutes from "./routes/capturedPokemonRoutes.js";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import db from './db.js';
import { seedPokemonsFromJSON } from './seedPokemons.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

process.on("SIGINT", (code) => {
  console.log("Process exit SIGINT ", code);
  exit(code);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("💥 Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.error(err, origin);
});
process.on("exit", (code) => {
  console.log("Process exit with code: ", code);
  exit(code);
});

// Définir le moteur de vue sur EJS
app.set('view engine', 'ejs').set('views', path.join(__dirname, 'templates'));


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(express.json())
  // this middleware generates a unique correlation ID for each request
  // and logs the request method, URL, and correlation ID
  // it also sets the correlation ID in the response header
  // if the query parameter 'debug' is present, it will enable debugging mode
  // and pause the execution for debugging purposes
  // otherwise, it will log that debugging mode is off
  // and continue to the next middleware
  .use((req, res, next) => {
    req.correlationId = crypto.randomUUID();
    console.log(`Request received with Correlation ID: ${req.correlationId}`);
    res.setHeader("X-Correlation-ID", req.correlationId);
    next();
  })
  .use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}, Correlation ID: ${req.correlationId}`);
    next();
  })
  .use((req, res, next) => {
    if (req.query.debug) {
      console.log(`Debug mode is ON for request with Correlation ID: ${req.correlationId}`);
      debugger;
    } else {
      console.log(`Debug mode is OFF for request with Correlation ID: ${req.correlationId}`);
      next();
    }
  });

app.use("/pokemon", pokemonRoutes);
app.use("/capturedPokemon", capturedPokemonRoutes);
app.use((err, req, res, next) => {
  console.error('💥 Express error:', err);
  res.status(500).send('Internal Server Error');
});


if (process.env.NODE_ENV !== 'test') {
  // On force l'import de db.js AVANT le seed
  // (db est importé ci-dessus, ce qui crée les tables)
  seedPokemonsFromJSON().then(() => {
    console.log('🌱 Pokémons seeded successfully');
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
      console.log(`📄 Swagger-UI is available at http://localhost:${port}/doc`);
    });
  }).catch((err) => {
    console.error('💥 Erreur lors du seed des pokémons:', err);
    process.exit(1);
  });
}

export default app;
