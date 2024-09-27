import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const databasePostgres = new DatabasePostgres();

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});

// ENDPOINTS (CRUD):

// CREATE
server.post('/livros', async (request, reply) => {
    const body = request.body;
    await databasePostgres.createLivro(body);
    return reply.status(201).send();
});

// READ (Get all livros)
server.get('/livros', async () => {
    const livros = await databasePostgres.listLivros();
    return livros;
});

// READ (Get a specific livro by ID)
server.get('/livros/:id', async (request, reply) => {
    const livroID = request.params.id;
    const livro = await databasePostgres.getlivroById(livroID);
    if (!livro) {
        return reply.status(404).send({ error: 'livro not found' });
    }
    return livro;
});

// UPDATE
server.put('/livros/:id', async (request, reply) => {
    const livroID = request.params.id;
    const body = request.body;
    await databasePostgres.updateLivro(livroID, body);
   
    return reply.status(204).send();
});

// DELETE
server.delete('/livros/:id', async (request, reply) => {
    const livroID = request.params.id;
    const deleted = await databasePostgres.deleteLivro(livroID);

    return reply.status(204).send();
});

// Start server
server.listen({
    port: 3333
}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server is running at ${address}`);
});
