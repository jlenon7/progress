const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:1@stack10@1@cluster0-uagp0.mongodb.net/stack10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Liberando o acesso a API de outras portas com o Cors
app.use(cors());

// Para produção;
// app.use(cors({ origin: 'http://localhost:3000' }));

// Setando para qual linguagem o express vai entender
app.use(express.json());
app.use(routes);

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de pârametros:

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-relacional)



app.listen(3333);