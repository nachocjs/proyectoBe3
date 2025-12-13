import { Router } from 'express';
import adoptionController from '../controllers/adoption.controller.js';

const router = Router();

router.post('/:uid/:pid', adoptionController.adoptPet.bind(adoptionController));
router.get('/', adoptionController.getAll.bind(adoptionController));
router.get('/:aid', adoptionController.getById.bind(adoptionController));
router.delete('/:aid', adoptionController.delete.bind(adoptionController));

export default router;