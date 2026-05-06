import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/userRouter.js"
import cors from "cors"

dotenv.config();
const app = express()
app.use(cors());
app.use(express.json())

app.use('/auth', userRouter)

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`=========DATABASE CONNECTED========`);
        app.listen(port, () => {
            console.log(`Server started at http://localhost${port}`);
        })
    })
    .catch((error) => {
        console.log(error);

    })

