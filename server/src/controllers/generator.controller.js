const generatePassword = require("../utils/passwordGenerator");

exports.generate = (req, res) => {
  try {
    const password = generatePassword(req.body);
    res.json({ password });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};