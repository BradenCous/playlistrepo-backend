const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToObject(row) {
  return {
    id: row.id,  
    name: row.name,
    data: row.data,

  };
}	

app.get('/playlists', (request, response) => {
  const query = 'SELECT id,  name, data FROM playlist WHERE is_deleted = 0';
  connection.query(query, (error, rows) => {
    response.send({
      ok: true,
      playlists: rows.map(rowToObject),
    });
  });
});

app.get('/playlists/:id', (request, response) => {
  const query = 'SELECT id,  name, data FROM playlist WHERE is_deleted = 0';
  const params = [request.params.id];
  connection.query(query, params, (error, rows) => {
    response.send({
      ok: true,
      playlists: rows.map(rowToObject),
    });	    
  });	  
});

app.post('/playlists', (request, response) => {
  const query = 'INSERT INTO playlist(name, data) VALUES(?, ?)';
  const params = [request.body.name, request.body.data];
  connection.query(query, params, (error, result) => {
    response.send({
      ok: true,
      id: result.insertID,
    });
  });
});

app.patch('/playlists/:id', (request, response) => {
  const query = 'UPDATE playlist SET name = ?, data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  const params = [request.body.name, request.body.data, request.params.id];
  connection.query(query, params, (error, result) => {
    response.send({
      ok: true,
    });
  });
});

app.delete('/playlists/:id', (request, response) => {
  const query = 'UPDATE playlist SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
  const params = [request.params.id];
  connection.query(query, params, (error, result) => {
    response.send({
      ok: true,
    });
  });
});

const port = 5443;
app.listen(port, () => {
  console.log(`We're live on port ${port}!`);
});	
