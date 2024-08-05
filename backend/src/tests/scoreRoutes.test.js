const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');
const Score = require('../models/scoreModel');

beforeAll(async () => {
  // Connect to the MongoDB database before running tests
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  // Close the MongoDB connection and the server after tests are done
  await mongoose.connection.close();
  server.close();
});

describe('Score Routes', () => {
  let createdUsernames = [];

  afterEach(async () => {
    // Delete any scores created during tests
    await Score.deleteMany({ username: { $in: createdUsernames } });
    createdUsernames = [];
  });

  it('should get scores', async () => {
    const newScore = { username: 'test_user_get_scores', score: 100 };
    await Score.create(newScore);
    createdUsernames.push(newScore.username);

    // Test the GET /api/scores route
    const response = await request(app).get('/api/scores');
    expect(response.statusCode).toBe(200);
    expect(response.body.scores).toBeInstanceOf(Array);
    const user = response.body.scores.find(u => u.username === newScore.username);
    expect(user).toHaveProperty('username', newScore.username);
    expect(user).toHaveProperty('score', newScore.score);
  });

  it('should add a score', async () => {
    const newScore = { username: 'new_user_add_score', score: 150 };
    createdUsernames.push(newScore.username);

    // Test the POST /api/scores route for adding a score
    const response = await request(app)
      .post('/api/scores')
      .send(newScore);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('username', newScore.username);
    expect(response.body).toHaveProperty('score', newScore.score);
  });

  it('should not add a score with an invalid username', async () => {
    const newScore = { username: 'invalid_user!', score: 100 };

    // Test validation for invalid username
    const response = await request(app)
      .post('/api/scores')
      .send(newScore);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should not add a score without a username', async () => {
    const newScore = { score: 100 };

    // Test validation for missing username
    const response = await request(app)
      .post('/api/scores')
      .send(newScore);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Username is required');
  });

  it('should not add a score with a profane username', async () => {
    const newScore = { username: 'JustsomeBadWord2135@#!56', score: 100 };

    // Test validation for profane username
    const response = await request(app)
      .post('/api/scores')
      .send(newScore);
    expect(response.statusCode).toBe(400);
  });
});
