const express = require("express");
const router = express.Router();
const uploadMiddlewareArte = require("../uploadMiddleware");
const arteController = require("../controllers/arteController");

// Rota de upload de imagem
router.post("/createArte", uploadMiddlewareArte.singleUpload, uploadMiddlewareArte.uploadToStorage, arteController.create);

router.get("/", arteController.findAll);

router.delete("/:id", arteController.remove);

module.exports = router;
