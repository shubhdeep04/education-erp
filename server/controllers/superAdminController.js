const User = require("../models/User");

exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    res.json({
      success: true,
      totalUsers,
      message: "Super Admin Dashboard",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  res.json({ message: "Create User API" });
};

exports.updateUser = async (req, res) => {
  res.json({ message: "Update User API" });
};

exports.deleteUser = async (req, res) => {
  res.json({ message: "Delete User API" });
};