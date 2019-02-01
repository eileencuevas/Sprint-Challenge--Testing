const request = require('supertest');
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);
const server = require('./server');

describe('server.js tests', () => {
    afterEach(() => {
        db.truncate();
    });

    describe('POST /games endpoint', () => {
        it('should return status code of 422 if there is no title in body', async () => {
            const noTitle = { genre: 'RPG' };

            let response = await request(server).post('/games/').send(noTitle);

            expect(response.status).toBe(422);
        });

        it('should return a status code of 422 if no genre is in the body', async () => {
            const noGenre = { title: 'Pokemon: Diamond Version' };

            let response = await request(server).post('/games/').send(noGenre);

            expect(response.status).toBe(422);
        });

        it('should return a status code of 201 if game was sucessfully inserted into db', async () => {
            const newGame = { title: 'Pokemon: Diamond Version', genre: 'RPG' };

            let response = await request(server).post('/games/').send(newGame);

            expect(response.status).toBe(201);
        });

        it('should return an array of the ids of the sucessfully inserted games', async () => {
            const newGame = { title: 'Pokemon: Diamond Version', genre: 'RPG' };

            let response = await request(server).post('/games/').send(newGame);

            expect(response.body).toEqual([1]);
        });
    });
});