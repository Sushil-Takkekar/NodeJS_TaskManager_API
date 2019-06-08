const user_model_schema = require('../../src/models/user_model');
const task_model_schema = require('../../src/models/task_model');
const bcrypt = require('bcryptjs');
const user_data = require('./user_data');

const gv = {
    _id : undefined,
    token : ''
}

const setupDummyDb = async () => {
    try {
        // empty the db
        await user_model_schema.deleteMany();
        await task_model_schema.deleteMany();

        // create new dummy user
        const user_schema = new user_model_schema(user_data.new_user_data);
        const h_pwd = await bcrypt.hash(user_schema.password, 7);
        user_schema.password = h_pwd;
        await user_schema.save();

        // login dummy user
        const user = await user_model_schema.findOne({ email:user_data.new_user_data.email });
        const token = await user.generateAuthToken();
        user.tokens.push({ token });
        await user_model_schema.findByIdAndUpdate(user._id , user, { new: true, runValidators: true});
        gv.token = token;   // set token globally
        gv._id = user._id;

    }catch(e) {
        console.log('----------------------------------------------');
        console.log(e);
        console.log('----------------------------------------------');
    }
}

module.exports = {
    gv,
    setupDummyDb
}