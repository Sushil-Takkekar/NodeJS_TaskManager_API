const express = require('express');
const router = new express.Router();
const users = require('../db_operations/users_operations');
const auth = require('../middleware/auth');
const file_upload = require('../middleware/file_upload');

// create new user
router.post('/users', (req, res) => {
    users.create_user(req.body).then((data) => {
        res.status(201).send(data);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// login user
router.post('/users/login', async (req, res) => {
    try {
        const user = await users.login_user(req.body.email, req.body.password);
        res.send(user);
    }catch(err) {
        res.status(401).send({ error: err+"" });
    }
});

// logout user
router.post('/users/logout', auth, async (req, res) => {
    try {
        const result = await users.logout_user(req.user, req.token);
        res.send(result);
    }catch(err) {
        res.status(500).send({ error: err+"" });
    }
});

// get user profile
router.get('/users/me', auth, async (req, res) => {
    try {
        const data = await users.get_user(req.user._id);
        res.status(200).send(data);
    }catch(err) {
        res.status(500).send(err);
    }
});

// get single user (written using async-await)
// router.get('/users/:id', auth, async (req, res) => {
//     try {
//         const data = await users.get_user(req.params.id);
//         res.status(200).send(data);
//     }catch(err) {
//         res.status(500).send(err);
//     }
// });

// update user
router.patch('/users/me', auth, async (req, res) => {
    try {
        const data = await users.update_user(req.user._id, req.body);
        res.status(200).send(data);
    }catch(err) {
        res.status(500).send(err);
    }
});

// delete user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await users.delete_user(req.user._id);
        res.status(200).send({ msg: 'User '+req.user.email+' deleted successfully !' });
    }catch(e) {
        res.status(500).send();
    }
});

// upload avatar
router.post('/users/me/avatar', auth, file_upload.single('mypic'), async (req, res) => {
    try {
        await users.upload_avatar(req.user, req.file);
        res.status(200).send({ msg: 'Profile picture uploaded successfully !' });
    }catch(e) {
        res.status(500).send();
    }
}, (error, req, res, next) => {
    res.status(400).send({ Error : error.message });
});

// delete avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        await users.delete_avatar(req.user);
        res.status(200).send({ msg: 'Profile picture removed successfully !' });
    }catch(e) {
        res.status(500).send();
    }
}, (error, req, res, next) => {
    res.status(400).send({ Error : error.message });
});


// get avatar
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await users.get_avatar(req.params.id);
        if(!user)
            return res.status(404).send({ Error : 'Avatar not found !' });
        res.set('content-type', 'image/png');   // set header to return image in response
        res.send(user.avatar); // send image in response
    }catch(e) {
        res.status(500).send({ Error : 'Something went wrong !' });
    }
});

module.exports = router;