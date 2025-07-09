import express from "express";
import process, { exit } from "node:process";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' with { type: 'json' };
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from 'url';
import { insertCapturedPokemon } from "./repositories/capturedPokemonRepository.js";
import capturedPokemonRoutes from "./routes/capturedPokemonRoutes.js";
import pokemonRoutes from "./routes/pokemonRoutes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

process.on("SIGINT", (code) => {
  console.log("Process exit SIGINT ", code);
  exit(code);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
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

app.use((req, res, next) => {
  req.insertCapturedPokemon = insertCapturedPokemon;
  next();
});

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(express.json())
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  console.log(`Swagger-UI is available at http://localhost:${process.env.PORT}/doc`);
});
