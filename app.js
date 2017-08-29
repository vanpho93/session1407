const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
// midleware - function 

// app.use((req, res, next) => {
//     res.send('CHAO');
// });

const logger = (req, res, next) => {
    console.log(req.ip);
    next();
}

app.get('/', logger, (req, res) => res.send('HELLO'));

app.get('/cookie', (req, res) => {
    res.cookie('token', '982847817284371843728');
    res.send('Da luu');
});

app.get('/show', (req, res) => {
    console.log(req.cookies);
    res.send('Da luu');
});

app.listen(3000, () => console.log('Server started!'));