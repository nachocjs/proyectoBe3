import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./config/db.js";

import mocksRouter from "./routes/mocks.router.js";
import petsRouter from "./routes/pets.router.js";
import usersRouter from "./routes/users.router.js";
import adoptionRouter from './routes/adoption.router.js';
import { swaggerDocs } from './config/swagger.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
connectMongoDB();

// Rutas
app.use("/api/mocks", mocksRouter);
app.use("/api/pets", petsRouter);
app.use("/api/users", usersRouter);
app.use('/api/adoption', adoptionRouter);

// Ruta base
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

// Documentación Swagger
swaggerDocs(app);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Ruta no encontrada" });
});

// Servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en puerto ${PORT}`));