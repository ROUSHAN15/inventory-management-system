import User from "../models/User.js";

export const addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
