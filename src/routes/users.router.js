import { Router } from 'express';
import UserModel from '../dao/models/user.model.js';

const router = Router();

//Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ status: 'success', payload: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

//Obtener usuario por id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
    res.status(200).json({ status: 'success', payload: user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

//Crear usuario
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const created = await UserModel.create(data);
    res.status(201).json({ status: 'success', payload: created });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

//Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ status: 'error', message: 'User not found' });
    res.status(200).json({ status: 'success', payload: updated });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

//Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'User not found' });
    res.status(200).json({ status: 'success', message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;