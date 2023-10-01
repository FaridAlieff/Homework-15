const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

const dbPath = './db.json';

app.get('/tasks', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Fayl oxuna bilmir.' });
      return;
    }

    const tasks = JSON.parse(data);
    res.json(tasks);
  });
});

app.post('/tasks', (req, res) => {
  const task = req.body;

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Fayl oxuna bilmir.' });
      return;
    }

    const tasks = JSON.parse(data);
    tasks.push(task);

    fs.writeFile(dbPath, JSON.stringify(tasks, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Fayl yazıla bilmir.' });
        return;
      }

      res.json(task);
    });
  });
});

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const newStatus = req.body.status;

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Fayl oxuna bilmir.' });
      return;
    }

    const tasks = JSON.parse(data);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      res.status(404).json({ error: 'Task tapılmadı.' });
      return;
    }

    tasks[taskIndex].status = newStatus;

    fs.writeFile(dbPath, JSON.stringify(tasks, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Fayl yazıla bilmir.' });
        return;
      }

      res.json(tasks[taskIndex]);
    });
  });
});

app.listen(3000, () => {
  console.log('Server 3000 portunda işləyir.');
});
