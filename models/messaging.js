const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ChatSchema = new schema({
    User1: {
        type: mongoose.Types.ObjectId,
        ref: "Users._id",
        required: true
    },
    User2: {
        type: mongoose.Types.ObjectId,
        ref: "Users._id",
        required: true
    },
    LastMessageTime: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    Timestamp: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
}, {collection: "Chat"});

const ChatModel = mongoose.model("Chat", ChatSchema);


const MessagesSchema = new schema({
    From: {
        type: mongoose.Types.ObjectId,
        ref: "Users._id",
        required: true
    },
    To: {
        type: mongoose.Types.ObjectId,
        ref: "Users._id",
        required: true
    },
    Message: {
        type: String,
        required: true,
        trim: true
    },
    Read: {
        type: Number,
        required: true,
        enum: [0, 1],
        default: 0
    },
    Timestamp: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
}, {collection: "Messages"});

const MessagesModel = mongoose.model("Messages", MessagesSchema);

mongoose.exports = {
    ChatModel,
    MessagesModel
};