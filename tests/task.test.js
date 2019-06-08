const request = require('supertest');
const app = require('../src/express');  // contains express code without listen part
const task_data = require('./data/task_data');
const user_model_schema = require('../src/models/user_model');

const { gv, setupDummyDb } = require('./data/db');

/**
 * Always try to write a code within beforeEach/beforeAll block using plain db calls. 
 * As we are going to test our middle logic. 
 * Don't use middleware functions written to do the things.
 */

beforeEach(setupDummyDb);

test('Should create a task', async () => {
    await request(app)
        .post('/tasks')
        .set({Authorization : `Bearer ${gv.token}`})
        .send(task_data.create_data)
        .expect(201);
})