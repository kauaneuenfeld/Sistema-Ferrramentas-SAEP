const express = require('express');
const cors = require('cors');
const connection = require('./db')

const server = express();
server.use(cors());
server.use(express.json());

server.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message })
        }
        return res.json(resultados);
    })
})

server.get('/produtos/ordenados', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO ORDER BY nome ASC';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message })
        }
        return res.json(resultados);
    })
})

server.get('/produtos/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT * FROM PRODUTO WHERE id_produto = ?';
    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message })
        }
        return res.json(resultados[0]);
    })
})


server.listen(8070, () => {
    console.log('Servidor rodando na porta 8070');
});