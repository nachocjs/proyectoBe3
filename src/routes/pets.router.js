import { Router } from 'express';
import {
  getAllPets,
  getOnePet,
  createOnePet,
  updateOnePet,
  deleteOnePet
} from '../controllers/pets.controller.js';

const router = Router();

router.get('/', getAllPets);
router.get('/:id', getOnePet);
router.post('/', createOnePet);
router.put('/:id', updateOnePet);
router.delete('/:id', deleteOnePet);

export default router;