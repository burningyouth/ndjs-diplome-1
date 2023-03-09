const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
  },
});

const User = model("User", userSchema);

const create = async (data) => {
  const user = new User(data);
  await user.save();
  return user;
};

const findByEmail = async (email) => {
  try {
    return await User.findOne({
      email,
    }).select("-__v");
  } catch (e) {
    return null;
  }
};

module.exports = {
  create,
  findByEmail,
};
