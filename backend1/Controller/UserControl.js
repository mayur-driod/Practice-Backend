const User = require('../Model/UserModel');
const bcrypt = require('bcrypt');

const createUser = async (req,res)=>{
    try{
        const {name,email,organisation,password} = req.body;
        const userExist = await User.findOne({Email:email});
        if(userExist){
            return res.status(400).json({message:"The user already exists!"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(password,salt);

        const creator = await User.create({
            Name:name,
            Email:email,
            Organisation:organisation,
            Password:hashpass
        });
        res.status(201).json({
            message:"User successfully created!",
            user: {
            id: creator._id,
            name: creator.Name,
            email: creator.Email,
            organisation: creator.Organisation
        }})
    }
    catch(err){
        res.status(500).json({message:"Sorry there seems to be a bad request"})
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ Email: email });
        if (!userExist) {
            return res.status(400).json({ message: "The user does not exist!" });
        }

        const isMatch = await bcrypt.compare(password, userExist.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        res.status(200).json({
            message: "User successfully logged in!",
            user: {
                id: userExist._id,
                name: userExist.Name,
                email: userExist.Email,
                organisation: userExist.Organisation
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Sorry there seems to be a bad request" });
    }
}

module.exports = {createUser , loginUser}