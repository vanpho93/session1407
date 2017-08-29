const express = require('express');
const cookieParser = require('cookie-parser');
const { sign, verify } = require('jsonwebtoken');

const SK = 'q2uery9qejdiuqh2rf';

const app = express();
app.use(cookieParser());


app.get('/muave', (req, res) => {
    // jwt { daMuaVe: true } -> luu vao cookie
    sign({ daMuaVe: true }, SK, (err, token) => {
        if (err) return res.send(err.message);
        res.cookie('token', token);
        res.send('Ban da mua ve');
    });
});

app.get('/vaorap', (req, res) => {
    // Ai da mua ve -> send welcome
    // -> Ban phai mua ve
    const { token } = req.cookies;
    if (!token) return res.send('Ban phai mua ve');
    verify(token, SK, (err) => {
        if (err) return res.send(err.message);
        res.send('Welcome');
    });
});

app.listen(3000, () => console.log('Server started!'));