const express = require('express');

const app = express();

// midleware - function 

// app.use((req, res, next) => {
//     res.send('CHAO');
// });

const logger = (req, res, next) => {
    console.log(req.ip);
    next();
}

app.get('/', logger, (req, res) => res.send('HELLO'));

app.listen(3000, () => console.log('Server started!'));