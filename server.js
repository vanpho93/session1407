const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'jkqhf9e8qf8'
}));

app.get('/', (req, res) => res.send('Hello'));

app.get('/muave', (req, res) => {
    req.session.daMuaVe = true;
    res.send('Ban da mua ve');
});

app.get('/vaorap', (req, res) => {
    const { daMuaVe } = req.session;
    res.send(daMuaVe ? 'Welcome' : 'Ban phai mua ve');
});

app.listen(3000, () => console.log('Server started!'));
