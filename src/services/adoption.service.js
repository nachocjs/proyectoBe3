import AdoptionModel from '../models/adoption.model.js';
import UserModel from '../models/user.model.js';
import PetModel from '../models/pet.model.js';

class AdoptionService {
  // Create adoption: mark pet adopted, push pet ref to user.pets, save adoption doc
  async adoptPet(userId, petId) {
    const user = await UserModel.findById(userId);
    if (!user) throw { status: 404, message: 'User not found' };

    const pet = await PetModel.findById(petId);
    if (!pet) throw { status: 404, message: 'Pet not found' };
    if (pet.adopted) throw { status: 400, message: 'Pet already adopted' };

    // update pet
    pet.adopted = true;
    await pet.save();

    // add pet to user.pets if not present
    if (!user.pets.some(id => id.toString() === pet._id.toString())) {
      user.pets.push(pet._id);
      await user.save();
    }

    const adoption = await AdoptionModel.create({ owner: user._id, pet: pet._id });
    return adoption;
  }

  async getAllAdoptions() {
    return AdoptionModel.find().populate('owner').populate('pet').lean();
  }

  async getAdoptionById(id) {
    const adoption = await AdoptionModel.findById(id).populate('owner').populate('pet');
    if (!adoption) throw { status: 404, message: 'Adoption not found' };
    return adoption;
  }

  async deleteAdoption(id) {
    const adoption = await AdoptionModel.findById(id);
    if (!adoption) throw { status: 404, message: 'Adoption not found' };

    // unmark pet adopted and remove pet from user.pets
    const pet = await PetModel.findById(adoption.pet);
    if (pet) {
      pet.adopted = false;
      await pet.save();
    }

    const user = await UserModel.findById(adoption.owner);
    if (user) {
      user.pets = user.pets.filter(pid => pid.toString() !== adoption.pet.toString());
      await user.save();
    }

    await AdoptionModel.findByIdAndDelete(id);
    return { message: 'Adoption deleted' };
  }
}

export default new AdoptionService();