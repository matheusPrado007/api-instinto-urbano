const mongoos = require("mongoose");

require("dotenv").config();

mongoos.set("strictQuery", true);

main().catch((err) => console.log(err));

async function main() {
  await mongoos.connect(
    process.env.MONGO_URL
  )
  console.log("Conectado com sucesso!");
}

module.exports = main;