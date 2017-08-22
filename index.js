const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => res.render('home'));

app.get('/dangky', (req, res) => res.render('dangky'));

app.get('/dangnhap', (req, res) => res.render('dangnhap'));

app.listen(3000, () => console.log('Server started!'));