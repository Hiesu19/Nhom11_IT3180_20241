const bcrypt = require("bcrypt");
const User = require("../models/User");

class UserController {
    //GET get ALL USERs
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //DELETE user
    async deleteUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json("DELETE successfully !");
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = new UserController();
