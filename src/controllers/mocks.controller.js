import {
  mockPets,
  mockUsers,
  insertMockData
} from '../services/mocks.service.js';

export const getMockPets = (req, res) => {
  const pets = mockPets(50);
  res.status(200).json({ status: 'success', payload: pets });
};

export const getMockUsers = async (req, res) => {
  const users = await mockUsers(50);
  res.status(200).json({ status: 'success', payload: users });
};

export const generateData = async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const { insertedUsers, insertedPets } = await insertMockData(users, pets);

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
};