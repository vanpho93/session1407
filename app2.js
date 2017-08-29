const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());


app.get('/muave', (req, res) => {
    // jwt { daMuaVe: true } -> luu vao cookie
});

app.get('/vaorap', (req, res) => {
    // Ai da mua ve -> send welcome
    // -> Ban phai mua ve
});

app.listen(3000, () => console.log('Server started!'));