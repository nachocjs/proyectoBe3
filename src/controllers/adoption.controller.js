import adoptionService from '../services/adoption.service.js';

class AdoptionController {

  async adoptPet(req, res) {
    try {
      const { uid, pid } = req.params;

      const adoption = await adoptionService.adoptPet(uid, pid);

      return res.status(201).json({
        status: 'success',
        payload: adoption
      });

    } catch (err) {
      const status = err.status || 400;

      return res.status(status).json({
        status: 'error',
        message: err.message || err
      });
    }
  }

  async getAll(req, res) {
    try {
      const list = await adoptionService.getAllAdoptions();

      return res.status(200).json({
        status: 'success',
        payload: list
      });

    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message || err
      });
    }
  }

  async getById(req, res) {
    try {
      const { aid } = req.params;
      const adoption = await adoptionService.getAdoptionById(aid);

      if (!adoption) {
        return res.status(404).json({
          status: 'error',
          message: 'Adoption not found'
        });
      }

      return res.status(200).json({
        status: 'success',
        payload: adoption
      });

    } catch (err) {
      const status = err.status || 400;

      return res.status(status).json({
        status: 'error',
        message: err.message || err
      });
    }
  }

  async delete(req, res) {
    try {
      const { aid } = req.params;
      const result = await adoptionService.deleteAdoption(aid);

      if (!result) {
        return res.status(404).json({
          status: 'error',
          message: 'Adoption not found'
        });
      }

      return res.status(200).json({
        status: 'success',
        message: result.message
      });

    } catch (err) {
      const status = err.status || 400;

      return res.status(status).json({
        status: 'error',
        message: err.message || err
      });
    }
  }
}

export default new AdoptionController();