const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const User = require('./User');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => res.render('home'));

app.get('/dangky', (req, res) => res.render('dangky'));
app.get('/dangnhap', (req, res) => res.render('dangnhap'));

app.post('/dangky', parser, (req, res) => {
    const { email, password, name, phone } = req.body;
    User.signUp(email, password, name, phone)
    .then(() => res.send('Dang ky thanh cong'))
    .catch(err => res.send(err.message));
});

app.post('/dangnhap', parser, (req, res) => {
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(() => res.send('Dang nhap thanh cong'))
    .catch(err => res.send(err.message));
});

app.listen(3000, () => console.log('Server started!'));