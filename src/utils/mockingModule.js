import bcrypt from 'bcrypt';

export const generateMockPets = (count) => {
  const pets = [];

  for (let i = 0; i < count; i++) {
    pets.push({
      name: `Pet_${i}`,
      species: "Dog",
      age: Math.floor(Math.random() * 15) + 1
    });
  }
  return pets;
};

export const generateMockUsers = async (count) => {
  const users = [];
  const hashedPassword = await bcrypt.hash("coder123", 10);

  for (let i = 0; i < count; i++) {
    users.push({
      first_name: `User_${i}`,
      last_name: "Mock",
      email: `mock${i}@mail.com`,
      password: hashedPassword,
      role: Math.random() > 0.5 ? "user" : "admin",
      pets: []
    });
  }
  return users;
};