import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import authModel from "../models/authModel.js"

dotenv.config()
const key = process.env.TOKEN_KEY
export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.json({ error: "No token provided" })
        }
        const decoded = jwt.verify(token, key)
        const user = await authModel.findById(decoded.userId).select("-password")
        if (!user) {
            return res.json({ error: "User not found" })
        }

        req.user=user
        next()
    } catch (error) {
        res.json(error)
    }
}