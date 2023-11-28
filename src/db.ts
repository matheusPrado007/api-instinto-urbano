import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("strictQuery", true);

async function main() {
  await mongoose.connect(process.env.MONGO_URL as string);
  console.log("Conectado com sucesso!");
}

export default main;

