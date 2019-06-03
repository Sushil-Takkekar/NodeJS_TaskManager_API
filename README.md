# NodeJS_TaskManager_API
Contains implementation of JWT, Email sending, File uploads, MongoDB Atlas (Cloud)

### Quick run
``` bash
# Install all dependencies
$ npm install

# Run dev server
$ npm run dev

```

### This application exposes following APIs
``` bash
# User APIs
Create User      : POST   : {{url}}/users/
Login User       : POST   : {{url}}/users/login
Logout User      : POST   : {{url}}/users/logout
Get User Profile : GET    : {{url}}/users/me
Update User      : PATCH  : {{url}}/users/me
Delete User      : DELETE : {{url}}/users/me
Upload Avatar    : POST   : {{url}}/users/me/avatar
Get Avatar       : GET    : {{url}}/users/:id/avatar
Delete Avatar    : DELETE : {{url}}/users/me/avatar

# Task APIs
Create Task : POST   : {{url}}/tasks
Get Tasks   : GET    : {{url}}/tasks?completed=<true/false>&skip=<skip_count>&limit=<per_page_limit_count>&sortBy=<sortby_column_name>
Update Task : PATCH  : {{url}}/tasks/<task_id>
Delete Task : DELETE : {{url}}/tasks/<task_id>

Note : You can test this api using postman (ready-to-use requests collection is available under '/postman').
```

### Live Demo
API Link : https://task-manager-api-nodejs-mongo.herokuapp.com/
