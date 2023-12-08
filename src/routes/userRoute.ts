const expressUser = require("express");
const routerUser = expressUser.Router();
const uploadMiddleware = require("../uploadMiddleware");
const UserController = require("../controllers/userController");
const token = require('../middleware/authMiddleware');
const UserRoute = require('../models/User');


routerUser.post('/login', UserController.loginPost);
// Rota de upload de imagem
routerUser.post("/createUser", uploadMiddleware.multipleUploadStorage, uploadMiddleware.updateToStorageMultiple, UserController.create);

routerUser.get("/users", token.authenticateToken, UserController.findAll);

routerUser.put("/updateUser/:id", uploadMiddleware.multipleUploadStorage, uploadMiddleware.updateToStorageMultiple, UserController.update);

routerUser.delete("/user/:id", UserController.remove);

module.exports = routerUser;