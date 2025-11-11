import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Generar usuarios falsos
export const generateMockUsers = async (numUsers = 50) => {
  const users = [];

  for (let i = 0; i < numUsers; i++) {
    const hashedPassword = await hashPassword('coder123');
    users.push({
      _id: faker.database.mongodbObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: faker.helpers.arrayElement(['user', 'admin']),
      pets: [],
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      __v: 0
    });
  }

  return users;
};

// Generar mascotas falsas
export const generateMockPets = (numPets = 50) => {
  const pets = [];

  for (let i = 0; i < numPets; i++) {
    pets.push({
      _id: faker.database.mongodbObjectId(),
      name: faker.animal.dog(),
      specie: faker.animal.type(),
      adopted: faker.datatype.boolean(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      __v: 0
    });
  }

  return pets;
};