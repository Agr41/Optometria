const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate= require('mongoose-paginate-v2')
const bcrypt = require('bcrypt')


// -------------- SCHEMA -------------- //
const userSchema = new Schema({
    username: String,
    password: String,
    role: String,
    Nombre: String,
    ApellidoPaterno:String,
    ApellidoMaterno:String,
    language:String

});
userSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
    })
    })

userSchema.plugin(mongoosePaginate);

// -------------- MODEL -------------- //
const User = mongoose.model("User", userSchema);

module.exports = User