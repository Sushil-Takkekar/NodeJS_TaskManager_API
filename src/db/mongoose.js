const mongoose = require('mongoose');
const validator = require('validator');

const db_name = process.env.DB_NAME;
const db_url = process.env.DB_URL+db_name;

// connect to db
mongoose.connect(db_url,{ 
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to db !');
}).catch((err) => {
    console.log('Error: Failed to connect to db !');
});

/** 
 * Operations related to tasks collection 
 **/
// define schema
// const Task_schema = mongoose.model('Task', {
//     description: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// });

// // prepare data according to schema
// const new_task = new Task_schema({
//     description: ' Update software  '
// });

// // insert data into db
// new_task.save().then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// });
