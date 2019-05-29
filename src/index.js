const express = require('express');
require('./db/mongoose'); // establish the db connection
const user_route = require('./routers/users-route');
const task_route = require('./routers/tasks-route');

const app = express();
const PORT = process.env.PORT;
const site_maintenance_flag = process.env.SITE_MAINTENANCE_FLAG;

// express middleware
app.use((req, res, next) => {
    if(site_maintenance_flag==false) {
        res.status(503).send('Site under maintenance ! Come back later.');
    }else {
        next();
    }
});

// set this to accept request-data in json format and make it available in req.body
app.use(express.json());

app.use(user_route);
app.use(task_route);

app.listen(PORT, () => {
    console.log('Web-server started at port '+PORT);
});
