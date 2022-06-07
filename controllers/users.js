const AvatarsModel = require("../models/avatars");
const UsersModel = require("../models/users");

const { ChatModel } = require("../models/messaging");

const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

const create_profile = async (req, res) => {

    const {DisplayName, Avatar} = req.body;

    if(!DisplayName || !Avatar){
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({message: "Fill in all fields"});
    }

    const avatar_exists = await AvatarsModel.find({_id: Avatar}).countDocuments();

    if(!avatar_exists) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({message: "Error identifying avatar"});
    }

    const user = await UsersModel.create(req.body);

    if(!user){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Error creating profile. Try again"});
    }

    try{
        const token = jwt.sign({}, process.env.JWT_SECRET, {
            algorithm: process.env.JWT_ALGORITHM, 
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        res.json({message: "Profile created successfully", user});
    }catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Error creating profile. Try again"});
    }

}

const new_random_chat = async (req, res) => {

    const active_users_not_in_chat = await UsersModel.find({
        LastMessageTime : {
            $gt: Date.now() - 1800000
        }
    }).countDocuments();

    if(!active_users_not_in_chat){
        res.status(StatusCodes.NOT_FOUND).json({message: "Could not match with random person"}); return;
    }

    

}

const search_users = async (req, res) => {

    const { search } = req.query;

    const users = await UsersModel.find({
        DisplayName: new RegExp(search, "i"),
        LastMessageTime: {
            $gt: Date.now() - 1800000
        }
    });

    if(!users_search.length){
        res.status(StatusCodes.NOT_FOUND).json({message: "No search results"}); return;
    }

    res.status(StatusCodes.OK).json({message: "Results fetched successfully", users});

}

module.exports = {
    create_profile,
    new_random_chat,
    search_users
};