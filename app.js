const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

const db = new sqlite3.Database('database.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS contatos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, mensagem TEXT)");
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
  const { nome, email, mensagem } = req.body;

  console.log(`Nome: ${nome}, Email: ${email}, Mensagem: ${mensagem}`);

  const stmt = db.prepare("INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)");
  stmt.run(nome, email, mensagem);
  stmt.finalize();

  res.send('Formulário enviado com sucesso!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});