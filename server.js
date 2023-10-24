const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

let lastRandomIndex = -1; // Inicializa el último índice a un valor que no exista

app.get('/random-joke', (req, res) => {
  // Lee el archivo JSON de chistes
  fs.readFile('jokes.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer los chistes.');
      return;
    }

    const chistes = JSON.parse(data);
    
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * chistes.length);
    } while (randomIndex === lastRandomIndex);

    lastRandomIndex = randomIndex;

    const randomJoke = chistes[randomIndex];

    res.json({ joke: randomJoke });
  });
});

app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});
