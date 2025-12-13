import UserModel from '../models/user.model.js';
import PetModel from '../models/pet.model.js';
import { generateMockUsers, generateMockPets } from '../utils/mockingModule.js';

export const mockPets = (amount = 50) => generateMockPets(amount);

export const mockUsers = async (amount = 50) =>
  await generateMockUsers(amount);

export const insertMockData = async (usersAmount, petsAmount) => {
  const users = await generateMockUsers(usersAmount);
  const pets = generateMockPets(petsAmount);

  const insertedUsers = await UserModel.insertMany(users);
  const insertedPets = await PetModel.insertMany(pets);

  return { insertedUsers, insertedPets };
};