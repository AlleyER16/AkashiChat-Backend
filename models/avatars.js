const { DESTRUCTION } = require("dns");
const mongoose = require("mongoose")
const schema = mongoose.Schema;

const AvatarsSchema = new schema({
    Path: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    AddedAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
}, {collection: "Avatar"});

const AvatarsModel = mongoose.model("Avatars", AvatarsSchema);

module.exports = AvatarsModel;