// import library
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// create user schema
const keyStoreSchema = require("./keyStore");
const { createAccount, unlockAccount } = require("../utils/wallet");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 7,
    },
    role: {
      type: String,
      enum: ["Doctor", "Nurse", "Patient"],
      default: "Patient",
    },
    keyStore: [keyStoreSchema],
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true, strict: true }
);

// before user save if password change encrypt password
userSchema.pre("save", async function (next) {
  let user = this;
  if (user.keyStore.length == 0) {
    // const password = await bcrypt.hash(user.password, 8)
    user.keyStore = createAccount(user.username);
  }
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// use to generate token
userSchema.methods.generateAuthToken = async function () {
  let user = this;
  const secret = process.env.SECRET;
  const token = jwt.sign(
    {
      username: user.username,
      walletAddress: unlockAccount(user.keyStore, user.username)[0].address,
    },
    secret
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// use to check if user exist
userSchema.statics.findByCredentials = async (username, password) => {
  let user = await User.findOne({ username });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

// Hide data (Override user.toJSON()) private data
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.keyStore;
  return userObject;
};

// create model user from schema
const User = mongoose.model("User", userSchema);

// export module
module.exports = User;
