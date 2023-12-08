const express = require("express");
const router = express.Router();
const uploadMiddlewareArte = require("../uploadMiddleware");
const arteController = require("../controllers/arteController");
const authMiddleware = require('../middleware/authMiddleware');
const jwtSrvice = require('../auth/jwtService');

// Rota de upload de imagem
router.post("/createArte",authMiddleware.authenticateToken, uploadMiddlewareArte.singleUpload, uploadMiddlewareArte.uploadToStorage, arteController.create);

router.get("/artes",authMiddleware.authenticateToken, arteController.findAll);

router.put("/updatearte/:id",authMiddleware.authenticateToken, uploadMiddlewareArte.singleUpload, uploadMiddlewareArte.updateToStorage, arteController.update);


router.delete("/deletearte/:id",authMiddleware.authenticateToken, arteController.remove);

module.exports = router;
