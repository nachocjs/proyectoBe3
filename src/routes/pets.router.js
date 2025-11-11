import { Router } from 'express';
import PetModel from '../dao/models/pet.model.js';

const router = Router();

//Obtener todas las mascotas
router.get('/', async (req, res) => {
  try {
    const pets = await PetModel.find();
    res.status(200).json({ status: 'success', payload: pets });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

//Obtener mascota por id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await PetModel.findById(id);
    if (!pet) return res.status(404).json({ status: 'error', message: 'Pet not found' });
    res.status(200).json({ status: 'success', payload: pet });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

//Crear una mascota
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const created = await PetModel.create(data);
    res.status(201).json({ status: 'success', payload: created });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

//Actualizar mascota
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await PetModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ status: 'error', message: 'Pet not found' });
    res.status(200).json({ status: 'success', payload: updated });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

//Eliminar mascota
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PetModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Pet not found' });
    res.status(200).json({ status: 'success', message: 'Pet deleted' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;