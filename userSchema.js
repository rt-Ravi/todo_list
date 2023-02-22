const mongoose = require("mongoose");
var jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    cpassword: {
        type: String,
        required: true
    },

    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],

    todoData: [
        
    ]

});

userSchema.methods.generateToken = async function () {
    try {

        let token = jwt.sign({ _id: this._id }, process.env.KEY);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;

    } catch (err) {
        console.log(err);
    }
}




const User = mongoose.model("USER", userSchema);

module.exports = User;