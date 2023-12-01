"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const arteController_1 = require("../controllers/arteController");
const uploadMiddleware_1 = require("../uploadMiddleware");
const router = express_1.default.Router();
router.post('/create', uploadMiddleware_1.upload.single('file'), uploadMiddleware_1.uploadToStorage, arteController_1.create);
router.get('/', arteController_1.findAll);
router.delete('/:id', arteController_1.remove);
exports.default = router;
