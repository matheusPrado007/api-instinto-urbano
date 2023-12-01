const expres = require("express");
const cors = require('cors')
const app = expres();
require("./db");

const routes = require("./routes/arteRoute");
require("dotenv").config();


app.use(cors({origin: '*'}));

app.use("/upload", routes);


const port = process.env.PORT || 3333;


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

 module.exports = app;