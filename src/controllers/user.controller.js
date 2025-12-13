import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../services/user.service.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json({ status: 'success', payload: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user)
      return res.status(404).json({ status: 'error', message: 'User not found' });

    res.status(200).json({ status: 'success', payload: user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createOneUser = async (req, res) => {
  try {
    const created = await createUser(req.body);
    res.status(201).json({ status: 'success', payload: created });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateOneUser = async (req, res) => {
  try {
    const updated = await updateUser(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({ status: 'error', message: 'User not found' });

    res.status(200).json({ status: 'success', payload: updated });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteOneUser = async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.id);
    if (!deleted)
      return res.status(404).json({ status: 'error', message: 'User not found' });

    res.status(200).json({ status: 'success', message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};