const AvatarsModel = require("../models/avatars");

const get_all_avatars = async(req, res) => {

    const avatars = await AvatarsModel.find({});

    res.json({message: "Avatars fetched successfully", avatars});

}

module.exports = {get_all_avatars};