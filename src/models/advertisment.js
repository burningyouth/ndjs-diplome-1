const { Schema, model } = require("mongoose");

const advertisementSchema = new Schema({
  shortText: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
});

const Advertisement = model("Advertisement", advertisementSchema);

const find = async ({ shortText, description, userId, tags }) => {
  return await Advertisement.find({
    shortText,
    description,
    userId,
    tags,
    isDeleted: false,
  }).select("-__v");
};

const create = async (data) => {
  const adv = new Advertisement(data);
  await adv.save();
  return adv;
};

const remove = async (id) => {
  return await Advertisement.findByIdAndUpdate(id, {
    isDeleted: true,
  }).select("-__v");
};

module.exports = {
  find,
  create,
  findByEmail,
  remove,
};
