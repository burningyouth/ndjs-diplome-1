const { Schema, model } = require("mongoose");

const messageScheme = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  sentAt: {
    type: Date,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  readAt: {
    type: Date,
  },
});

const chatSchema = new Schema({
  users: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  messages: {
    type: [messageScheme],
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Chat = model("Chat", chatSchema);
const Message = model("Message", messageScheme);

const find = async (users) => {
  return await Chat.findOne({
    users,
  }).select("-__v");
};

const sendMessage = async ({ author, receiver, text }) => {
  const users = [author, receiver];
  const chat = await find(users);

  if (chat) {
    Chat.findByIdAndUpdate(chat._id, {
      messages: [
        ...chat.messages,
        new Message({
          author,
          text,
          sentAt: new Date(),
        }),
      ],
    });
  }
};

const getHistory = async (id) => {
  return await Chat.findById(id).select("messages");
};

module.exports = {
  find,
  sendMessage,
  getHistory,
};
