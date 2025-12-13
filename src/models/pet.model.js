import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  specie:  { type: String, required: true },
  adopted: { type: Boolean, default: false }
}, {
  timestamps: true
});

const PetModel = mongoose.model('Pet', petSchema);
export default PetModel;