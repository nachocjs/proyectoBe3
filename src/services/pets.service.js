import PetModel from '../models/pet.model.js';

export const getPets = () => PetModel.find();

export const getPetById = (id) => PetModel.findById(id);

export const createPet = (data) => PetModel.create(data);

export const updatePet = (id, data) =>
  PetModel.findByIdAndUpdate(id, data, { new: true });

export const deletePet = (id) => PetModel.findByIdAndDelete(id);