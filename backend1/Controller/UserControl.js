const User = require('../Model/UserModel');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { Name, Email, Organisation, Password } = req.body;
        const userExist = await User.findOne({ Email: Email });
        if (userExist) {
            return res.status(400).json({ message: "The user already exists!" });
        }
        const salt = await bcrypt.genSalt(10);
        console.log('Password:', Password); //Password log
        console.log('Salt:', salt); //salt log
        const hashpass = await bcrypt.hash(Password, salt);

        const creator = await User.create({
            Name: Name,
            Email: Email,
            Organisation: Organisation,
            Password: hashpass
        });
        res.status(201).json({
            message: "User successfully created!",
            user: {
                id: creator._id,
                Name: creator.Name,
                Email: creator.Email,
                Organisation: creator.Organisation
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Sorry there seems to be a bad request" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const userExist = await User.findOne({ Email: Email });
        if (!userExist) {
            return res.status(400).json({ message: "The user does not exist!" });
        }

        const isMatch = await bcrypt.compare(Password, userExist.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        res.status(200).json({
            message: "User successfully logged in!",
            user: {
                id: userExist._id,
                Name: userExist.Name,
                Email: userExist.Email,
                Organisation: userExist.Organisation
            }
        });
    } catch (err) {
        console.log(err); 
        res.status(500).json({ message: "Sorry there seems to be a bad request" });
    }
}

module.exports = { createUser, loginUser }