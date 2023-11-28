import express from 'express';
import { create, findAll, remove } from '../controllers/arteController';
import{  uploadToStorage, upload }from '../uploadMiddleware'

const router = express.Router();

router.post('/create', upload.single('file'), uploadToStorage, create);
router.get('/', findAll);
router.delete('/:id', remove);

export default router;