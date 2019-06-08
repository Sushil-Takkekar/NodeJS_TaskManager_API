const request = require('supertest');
const app = require('../src/express');  // contains express code without listen part
const user_data = require('./data/user_data');
const user_model_schema = require('../src/models/user_model');

const { gv, setupDummyDb } = require('./data/db');

/**
 * Always try to write a code within beforeEach/beforeAll block using plain db calls. 
 * As we are going to test our middle logic. 
 * Don't use middleware functions written to do the things.
 */

// convert it to beforeEach if needed
 beforeEach(setupDummyDb);

/****************/

// test create user request
test('Should create new user', async () => {
    const response = await request(app)
        .post('/users')
        .send(user_data.create_data)
        .expect(201);
    
    // Assertions about response
    expect(response.body).toMatchObject({
        user : {
            name: user_data.create_data.name,
            email: user_data.create_data.email,
        } 
    });
});

test('Should not create new user', async () => {
    await request(app)
        .post('/users')
        .send(user_data.create_data_incorrect)
        .expect(400);
});

/****************/

// test user login request
test('Should login existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send(user_data.login_data)
        .expect(200);

    // check whether token has been saved successfully to db or not
    const user = await user_model_schema.findById(response.body.user._id);
    expect(response.body.token).toBe(user.tokens[1].token);
});

// test un-authourized user login request
test('Should not login non-existing user', async () => {
    await request(app)
        .post('/users/login')
        .send(user_data.login_data_incorrect)
        .expect(401);
});

/****************/

// test user get profile request
test('Should get user profile', async () => {
    await request(app)
    .get('/users/me')
    .set({Authorization : `Bearer ${gv.token}`})
    .send()
    .expect(200);
});

// test user get profile request
test('Should not get user profile', async () => {
    await request(app)
    .get('/users/me')
    .set({Authorization : `Bearer abcd`})
    .send()
    .expect(401);
});

/****************/

test('Should upload avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set({Authorization: `Bearer ${gv.token}`})
        .attach('mypic', 'tests/data/profile.png')
        .expect(200);
    // confirm that image has uploaded
    const user = await user_model_schema.findById(gv._id);
    expect(user.avatar).toEqual(expect.any(Buffer));  // check if it is a buffer or not
});