const Vault = require("../models/Vault");

exports.securityHealth = async (req, res) => {
  const passwords = await Vault.find({ userId: req.user.userId });

  const hashMap = {};
  let reused = 0;

  passwords.forEach((p) => {
    hashMap[p.passwordHash] = (hashMap[p.passwordHash] || 0) + 1;
  });

  reused = Object.values(hashMap).filter((c) => c > 1).length;

  res.json({
    total: passwords.length,
    reused,
  });
};