const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UsersSchema = new schema({
    DisplayName: {
        type: String,
        required: true,
        trim: true
    },
    Avatar: {
        type: mongoose.Types.ObjectId,
        ref: "Avatar._id",
        required: true
    },
    LastMessageTime: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    AddedAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
}, {collection: "Users"});

const UsersModel = mongoose.model("Users", UsersSchema);

module.exports = UsersModel;