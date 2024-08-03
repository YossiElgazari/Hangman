const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('Word Routes', () => {
  const categories = ['Animals', 'Countries', 'Fruits', 'Food'];
  const difficulties = ['easy', 'medium', 'hard'];

  categories.forEach(category => {
    difficulties.forEach(difficulty => {
      it(`should get a ${difficulty} word from the ${category} category`, async () => {
        const response = await request(app).get(`/api/word?category=${category}&difficulty=${difficulty}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('category', category);
        expect(response.body).toHaveProperty('difficulty', difficulty);
        expect(response.body).toHaveProperty('word');
        expect(response.body).toHaveProperty('hint');
      });
    });
  });

  it('should get a word with random category and difficulty', async () => {
    const response = await request(app).get('/api/word?category=random&difficulty=random');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('category');
    expect(response.body).toHaveProperty('difficulty');
    expect(response.body).toHaveProperty('word');
    expect(response.body).toHaveProperty('hint');
  });
});
