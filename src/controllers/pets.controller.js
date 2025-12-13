import {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet
} from '../services/pets.service.js';

export const getAllPets = async (req, res) => {
  try {
    const pets = await getPets();
    res.status(200).json({ status: 'success', payload: pets });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getOnePet = async (req, res) => {
  try {
    const pet = await getPetById(req.params.id);
    if (!pet)
      return res
        .status(404)
        .json({ status: 'error', message: 'Pet not found' });

    res.status(200).json({ status: 'success', payload: pet });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createOnePet = async (req, res) => {
  try {
    const created = await createPet(req.body);
    res.status(201).json({ status: 'success', payload: created });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateOnePet = async (req, res) => {
  try {
    const updated = await updatePet(req.params.id, req.body);
    if (!updated)
      return res
        .status(404)
        .json({ status: 'error', message: 'Pet not found' });

    res.status(200).json({ status: 'success', payload: updated });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteOnePet = async (req, res) => {
  try {
    const deleted = await deletePet(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ status: 'error', message: 'Pet not found' });

    res.status(200).json({ status: 'success', message: 'Pet deleted' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};