const Vault = require("../models/Vault");
const { encrypt, decrypt } = require("../utils/crypto");
const hashPassword = require("../utils/passwordHash");

const SECRET = process.env.JWT_SECRET; // reuse securely

// ADD password
exports.addPassword = async (req, res) => {
  try {
    const { website, username, password, folderId } = req.body;

    const encrypted = encrypt(password, SECRET);
    const passwordHash = hashPassword(password);

    const isWeak = (password) => {
      return (
        password.length < 8 ||
        /^[a-zA-Z]+$/.test(password) ||
        /^[0-9]+$/.test(password)
      );
    };
    const weak = isWeak(password);

    const vault = await Vault.create({
      userId: req.user.userId,
      folderId,
      website,
      username,
      encryptedPassword: encrypted.encryptedData,
      iv: encrypted.iv,
      authTag: encrypted.authTag,
      passwordHash,
      isWeak: weak,
    });

    res.status(201).json(vault);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET passwords (without decrypting)
exports.getPasswords = async (req, res) => {
  try {
    const { folderId } = req.query;

    if (!folderId) {
      return res.status(400).json({ message: "folderId is required" });
    }

    const passwords = await Vault.find({
      userId: req.user.userId,
      folderId,
    }).select("-encryptedPassword -iv -authTag");

    res.json(passwords);
  } catch (err) {
    console.error("GET PASSWORDS ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
// DECRYPT one password
exports.decryptPassword = async (req, res) => {
  try {
    const vault = await Vault.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!vault) {
      return res.status(404).json({ message: "Not found" });
    }

    const decrypted = decrypt(
      vault.encryptedPassword,
      SECRET,
      vault.iv,
      vault.authTag,
    );
    vault.lastAccessedAt = new Date();
    await vault.save();

    res.json({ password: decrypted });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.toggleFavorite = async (req, res) => {
  try {
    const vault = await Vault.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!vault) {
      return res.status(404).json({ message: "Not found" });
    }

    vault.isFavorite = !vault.isFavorite;
    await vault.save();

    res.json({
      message: "Favorite updated",
      isFavorite: vault.isFavorite,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getFavorites = async (req, res) => {
  const favorites = await Vault.find({
    userId: req.user.userId,
    isFavorite: true,
  }).select("-encryptedPassword -iv -authTag");

  res.json(favorites);
};
exports.getRecent = async (req, res) => {
  const recent = await Vault.find({
    userId: req.user.userId,
  })
    .sort({ lastAccessedAt: -1 })
    .limit(10)
    .select("-encryptedPassword -iv -authTag");

  res.json(recent);
};
