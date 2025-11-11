import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../mocks/mockingModule.js';
import UserModel from '../dao/models/user.model.js';
import PetModel from '../dao/models/pet.model.js';

const router = Router();

// GET /api/mocks/mockingpets
router.get('/mockingpets', (req, res) => {
  const pets = generateMockPets(50);
  res.status(200).json({ status: 'success', payload: pets });
});

// GET /api/mocks/mockingusers
router.get('/mockingusers', async (req, res) => {
  const users = await generateMockUsers(50);
  res.status(200).json({ status: 'success', payload: users });
});

// POST /api/mocks/generateData
router.post('/generateData', async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const generatedUsers = await generateMockUsers(users);
    const generatedPets = generateMockPets(pets);

    const insertedUsers = await UserModel.insertMany(generatedUsers);
    const insertedPets = await PetModel.insertMany(generatedPets);

    res.status(201).json({
      status: 'success',
      message: `Inserted ${insertedUsers.length} users and ${insertedPets.length} pets.`,
      usersInserted: insertedUsers.length,
      petsInserted: insertedPets.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
});

export default router;