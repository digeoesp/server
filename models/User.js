const mongoose = require('mongoose');
const { Schema } = mongoose;

//we can add properties as we please
const userSchema = new Schema ({
    googleId: String
});

//to create an actual model class and tell mongoose that it needs to be aware that this new collection needs to be created
//first argument will be the name of the collection
//second argument is the userschema
mongoose.model('users', userSchema);