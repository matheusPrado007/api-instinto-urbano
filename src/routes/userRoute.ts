const expressUser = require("express");
const routerUser = expressUser.Router();
const uploadMiddleware = require("../uploadMiddleware");
const UserController = require("../controllers/userController");

// Rota de upload de imagem
routerUser.post("/createUser", uploadMiddleware.multipleUpload, uploadMiddleware.uploadToStorageMultiple, UserController.create);

routerUser.get("/users", UserController.findAll);

routerUser.delete("/:id", UserController.remove);

module.exports = routerUser;