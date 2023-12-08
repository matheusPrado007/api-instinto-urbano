const expres = require("express");
const cors = require('cors')
const app = expres();
require("./db");

const routes = require("./routes/arteRoute");
const routesUser = require("./routes/userRoute");
require("dotenv").config();


app.use(cors({origin: '*'}));
app.use(expres.json());
app.use(expres.urlencoded({ extended: true }));

app.use("/upload", routes);
app.use("/upload", routesUser);


const port = process.env.PORT || 3333;


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

 module.exports = app;