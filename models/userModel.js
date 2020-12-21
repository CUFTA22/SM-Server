const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 15,
    },
    password: { type: String, required: true },
    isAdmin: { type: String, required: true, default: false },
    imageURL: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);

    this.password = passwordHash;
    next();
  });
});

module.exports = User = mongoose.model("users", userSchema);
