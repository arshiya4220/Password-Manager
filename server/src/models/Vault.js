const mongoose = require("mongoose");

const vaultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
    website: String,
    username: String,
    encryptedPassword: String,
    iv: String,
    authTag: String,
    isFavorite: {
      type: Boolean,
      default: false,
    },
    lastAccessedAt: {
      type: Date,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    isWeak: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Vault", vaultSchema);
