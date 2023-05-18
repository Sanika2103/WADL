import mongoose from "mongoose"
import bcrypt from "bcrypt"

const User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
});

User.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

User.statics.login = async function ({ username, password }) {
    try {
        const user = await this.findOne({ username })
        if (user) {
            return await bcrypt.compare(password, user.password) ? user : 2
        } else {
            return 1;
        }
    } catch (error) {
        console.log(error)
    }
}

export default mongoose.model("user", User);