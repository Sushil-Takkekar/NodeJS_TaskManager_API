const express = require('express');
const router = new express.Router();
const tasks = require('../db_operations/tasks_operations');
const auth = require('../middleware/auth');

// create new task
router.post('/tasks', auth, (req, res) => {
    tasks.create_task({
        ...req.body,
        owner: req.user._id
    }).then((data) => {
        res.status(201).send(data);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// get all tasks (filter allowed => /tasks?completed=false)
router.get('/tasks', auth, (req, res) => {
    const params = {
        owner : req.user._id,
        status : req.query.completed,
        limit : parseInt(req.query.limit), // used for pagination
        skip : parseInt(req.query.skip), // used for pagination
        sortBy : req.query.sortBy
    }
    tasks.get_all_tasks(params).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// get single task
router.get('/tasks/:id', auth, (req, res) => {
    tasks.get_task(req.params.id, req.user._id).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// update single task
router.patch('/tasks/:id', auth, (req, res) => {
    tasks.update_task(req.params.id, req.user._id, req.body).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// delete single task
router.delete('/tasks/:id', auth, (req, res) => {
    tasks.delete_task(req.params.id, req.user._id).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

module.exports = router;