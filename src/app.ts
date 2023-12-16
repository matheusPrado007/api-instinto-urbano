import express from 'express';
import cors from 'cors';
import './db';

import arteRoutes from './routes/arteRoute';
import userRoutes from './routes/userRoute';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
const corsOptions = {
  origin: ['http://localhost:3000', 'http://192.168.2.121:3000'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/upload', arteRoutes);
app.use('/upload', userRoutes);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

export default app;
