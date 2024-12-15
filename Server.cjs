const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para leer las tareas
app.get('/tasks', (req, res) => {
    const data = JSON.parse(fs.readFileSync('tasks.json', 'utf-8'));
    res.json(data);
});

// Ruta para crear una tarea
app.post('/tasks', (req, res) => {
    const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf-8'));
    const newTask = { id: Date.now(), ...req.body };
    tasks.push(newTask);
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
    res.status(201).json(newTask);
});

// Ruta para actualizar una tarea
app.put('/tasks/:id', (req, res) => {
    const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf-8'));
    const taskIndex = tasks.findIndex(task => task.id == req.params.id);
    if (taskIndex === -1) return res.status(404).json({ message: 'Tarea no encontrada' });

    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
    res.json(tasks[taskIndex]);
});

// Ruta para eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
    let tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf-8'));
    tasks = tasks.filter(task => task.id != req.params.id);
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
    res.json({ message: 'Tarea eliminada' });
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));