import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const connection = mongoose.connect(process.env.DB_URI)
/* {
    useNewUrlParser: true,
    useUnifiedTopology: true
} */
export default connection;