const request = require('supertest');
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);
const server = require('./server');

describe('server.js tests', () => {
    afterEach(() => {
        db('games').truncate();
    });

    describe('GET /games endpoint', () => {
        it('should return an empty array if no games are stored', async () => {
           let response = await request(server).get('/games/');

           expect(response.body).toEqual([]);
        });

        it('should return an array of games if games are stored', async () => {
            const newGame = { title: 'Pokemon: Black Version', genre: 'RPG' };

            let response = await request(server).post('/games/').send(newGame);
            response = await request(server).get('/games/');

            expect(response.body).toEqual([{ id: 1, title: 'Pokemon: Black Version', genre: 'RPG', releaseYear: null }]);
        });

        it('should return a status code of 200 upon successful GET', async () => {
            const newGame = { title: 'Pokemon: White Version', genre: 'RPG' };

            let response = await request(server).post('/games/').send(newGame);
            response = await request(server).get('/games/');

            expect(response.status).toBe(200);
        });
    });

    describe('POST /games endpoint', () => {
        it('should return status code of 422 if there is no title in body', async () => {
            const noTitle = { genre: 'RPG' };

            let response = await request(server).post('/games/').send(noTitle);

            expect(response.status).toBe(422);
        });

        it('should return a status code of 422 if no genre is in the body', async () => {
            const noGenre = { title: 'Pokemon: Black 2 Version' };

            let response = await request(server).post('/games/').send(noGenre);

            expect(response.status).toBe(422);
        });

        it('should return a status code of 201 if game was sucessfully inserted into db', async () => {
            const newGame = { title: 'Pokemon: Black 2 Version', genre: 'RPG', releaseYear: null };

            let response = await request(server).post('/games/').send(newGame);

            expect(response.status).toBe(201);
        });

        it('should return an array of the ids of the sucessfully inserted games', async () => {
            const newGame = { title: 'Pokemon: White 2 Version', genre: 'RPG' };

            let response = await request(server).post('/games/').send(newGame);

            expect(response.body).toEqual([4]);
        });
    });
});