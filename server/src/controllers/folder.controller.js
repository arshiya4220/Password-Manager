const Folder = require("../models/Folder");

// CREATE folder
exports.createFolder = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Folder name required" });
    }

    const folder = await Folder.create({
      name,
      userId: req.user.userId,
    });

    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET all folders for user
exports.getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.user.userId });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};