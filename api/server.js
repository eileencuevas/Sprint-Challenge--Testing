const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());

server.post('/games/', async (req, res) => {
    const { title, genre, releaseYear } = req.body;

    try {
        const ids = await db('games').insert({title, genre, releaseYear});

        res.status(201).json(ids);
    } catch (err) {
        console.log(err);
        res.status(422).json({ error: 'missing title and/or genre for game.' })
    }
})

module.exports = server;