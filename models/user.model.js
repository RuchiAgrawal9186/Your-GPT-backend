const mongoose = require("mongoose")
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookie = require("cookie")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password length should be 8 character long"]
    },
    customerId: {
        type: String,
        default: ""
    },
    subscription: {
        type: String,
        default: ""
    }
}, {
    versionKey: false
})

  
//   module.exports = {
//     logoutModel
// }

// UserSchema.pre("save", async function (next) {
//     // for update

//     if (!this.isModified("password")) {
//         next()
//     }

//     const salt = await bycrypt.genSalt(10)
//     this.password = await bycrypt.hash(this.password, salt)
//     next()

// })

// // check match password

// UserSchema.methods.matchPassword = async function (password) {
//     return await bycrypt.compare(password, this.password)
// }

// //SIGN TOKEN

// UserSchema.methods.getSignToken = function (res) {
//     const accessToken = jwt.sign({ id: this._id }, process.env.secret, { expiresIn: process.env.access_expire })
//     const refereshToken = jwt.sign({ id: this._id }, process.env.refreshToken, { expiresIn: process.env.refresh_expire })
//     res.cookie("refreshToken", `${refereshToken}`, { maxAge: 86400 * 700, httpOnly: true })
// }

const UserModel = mongoose.model("users", UserSchema)

module.exports = {
    UserModel
}