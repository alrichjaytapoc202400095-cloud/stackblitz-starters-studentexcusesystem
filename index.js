const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Simple Database (Array)
let data = [
    { id: 1, studentName: "Juan", reason: "Sick", status: "Pending" }
];

// GET - Read
app.get('/excuses', (req, res) => {
    res.json(data);
});

// POST - Create
app.post('/excuses', (req, res) => {
    const newItem = { id: Date.now(), ...req.body, status: "Pending" };
    data.push(newItem);
    res.json(newItem);
});

// PUT - Update
app.put('/excuses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = { ...data[index], ...req.body };
        res.json(data[index]);
    } else {
        res.status(404).send("Not found");
    }
});

// DELETE - Delete
app.delete('/excuses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    data = data.filter(item => item.id !== id);
    res.send("Deleted");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));