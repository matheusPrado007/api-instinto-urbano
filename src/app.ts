import express from "express";
import cors from 'cors';
import "./db";
import routes from "./routes/arteRoute";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors({ origin: '*' }));
app.use("/upload", routes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

