import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("strictQuery", true);

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    } as object);
    console.log("Conectado com sucesso!");
  } catch (error) {
    console.error("Erro de conexão com o banco de dados:", error);
  }
}

export default main;
