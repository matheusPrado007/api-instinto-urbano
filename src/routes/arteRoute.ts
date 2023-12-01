const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../uploadMiddleware");
const arteController = require("../controllers/arteController");

// Rota de upload de imagem
router.post("/create", uploadMiddleware.upload.single("file"), uploadMiddleware.uploadToStorage, arteController.create);

router.get("/", arteController.findAll);

router.delete("/:id", arteController.remove);

module.exports = router;
