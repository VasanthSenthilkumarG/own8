var  mongoose = require("mongoose");
var  Schema = mongoose.Schema;

var  userSchema = new  Schema(
    {
        name: {
            type:  String
        },
        phoneNumber: {
            type:  Number,
            unique:  true,
            required:  true
        },
    },
    { timestamps:  true }
);

module.exports = mongoose.model("User", userSchema);