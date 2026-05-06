import authModel from "../models/authModel.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()
const tokenKey = process.env.TOKEN_KEY


// Regiseration

export const userRegisteration = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const name = await authModel.findOne({ username })
        if (name) {
            return res.json("Name already taken");
        }
        const userEmail = await authModel.findOne({ email })
        if (userEmail) {
            return res.json("Eamil is already taken plase choose another one")
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const users = await authModel.create({
            username,
            email,
            password: hashedPassword
        })
        res.json("Registeration successfully..")

    } catch (error) {
        res.json({ error })
    }
}


//Login


export const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await authModel.findOne({ email })
        if (!user) {
            return res.json({ error: "User not registered" })
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.json({ error: "Invalid credentials" })
        }
        const token = jwt.sign({ userId: user._id, email }, tokenKey)
        res.json({ message: "Login successfully..", token })
    } catch (error) {
        res.json({ error })

    }
}






//crud-operations

export const addUser = async (req, res) => {
    const users = req.body
    try {
        const creatUser = await userModel.create(users)
        res.json({ message: "User created successfully", creatUser })
    } catch (error) {
        res.json({ error })
        console.log(error);

    }
}

export const allUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.json({ data: users })
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const userUpdate = async (req, res) => {
    try {
        const update = await userModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        )
        res.json({ message: "user update successfully" })
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const userDelete = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.json({ message: "User delete successfully" })
    } catch (error) {
        res.json({ message: error.message })
    }
}