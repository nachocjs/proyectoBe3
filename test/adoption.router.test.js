import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';  
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import UserModel from '../src/models/user.model.js';
import PetModel from '../src/models/pet.model.js';
import AdoptionModel from '../src/models/adoption.model.js';

dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;

describe('Adoption Routes', () => {
  let adoptionId;
  let testUser;
  let testPet;

  before(async () => {
    // Conexión a la base de datos de TEST
    await mongoose.connect(process.env.URI_MONGODB);

    // Limpieza previa
    await AdoptionModel.deleteMany({});
    await UserModel.deleteMany({});
    await PetModel.deleteMany({});

    // Crear User real
    testUser = await UserModel.create({
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "1234"
    });

    // Crear Pet real
    testPet = await PetModel.create({
      name: "Firulais",
      type: "dog"
    });
  });

  after(async () => {
    await AdoptionModel.deleteMany({});
    await UserModel.deleteMany({});
    await PetModel.deleteMany({});
    await mongoose.disconnect();
  });

  describe('POST /api/adoption/:uid/:pid', () => {
    it('should adopt a pet and return status 201', async () => {
      const res = await chai.request(app)
        .post(`/api/adoption/${testUser._id}/${testPet._id}`);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('status').equal('success');
      expect(res.body).to.have.property('payload');
      adoptionId = res.body.payload._id;
    });

    it('should return an error if user or pet does not exist', async () => {
      const res = await chai.request(app)
        .post('/api/adoption/invalid_uid/invalid_pid');

      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal('error');
    });
  });

  describe('GET /api/adoption', () => {
    it('should get all adoptions', async () => {
      const res = await chai.request(app).get('/api/adoption');
      
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('status').equal('success');
      expect(res.body.payload).to.be.an('array');
      expect(res.body.payload.length).to.be.greaterThan(0);
    });
  });

  describe('GET /api/adoption/:aid', () => {
    it('should get adoption by ID', async () => {
      const res = await chai.request(app).get(`/api/adoption/${adoptionId}`);
      
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.payload._id).to.equal(adoptionId);
    });

    it('should return error if adoption is not found', async () => {
      const res = await chai.request(app).get('/api/adoption/invalid_id');
      
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal('error');
    });
  });

  describe('DELETE /api/adoption/:aid', () => {
    it('should delete adoption by ID', async () => {
      const res = await chai.request(app).delete(`/api/adoption/${adoptionId}`);
      
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.message).to.equal('Adoption deleted');
    });

    it('should return error if adoption is not found to delete', async () => {
      const res = await chai.request(app).delete('/api/adoption/invalid_id');
      
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal('error');
    });
  });
});