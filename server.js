const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let topics = []; // Array para almacenar temas
let opinions = []; // Array para almacenar opiniones

// Endpoint para obtener todos los temas
app.get('/topics', (req, res) => {
    res.json(topics);
});

// Endpoint para crear un nuevo tema
app.post('/topics', (req, res) => {
    const newTopic = {
        id: topics.length + 1,
        title: req.body.title
    };
    topics.push(newTopic);
    res.status(201).json(newTopic);
});

// Endpoint para obtener opiniones por tema
app.get('/opinions', (req, res) => {
    const topicId = parseInt(req.query.topicId);
    const filteredOpinions = opinions.filter(opinion => opinion.topicId === topicId);
    console.log(`Opiniones para el tema ${topicId}:`, filteredOpinions); // Debugging
    res.json(filteredOpinions);
});

// Endpoint para crear una nueva opinión
app.post('/opinions', (req, res) => {
    const opinion = {
        topicId: parseInt(req.body.topicId), // Asegúrate de convertir a número
        content: req.body.content
    };
    opinions.push(opinion);
    console.log('Nueva opinión añadida:', opinion); // Debugging
    console.log('Todas las opiniones:', opinions); // Debugging
    res.status(201).json(opinion);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
