const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const session = require('express-session');
const User = require('./User');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'jkqhf9e8qf8',
    cookie: {
        maxAge: 5000
    }
}));

app.get('/', (req, res) => res.render('home'));

// Ai da dang nhap thanh
// Redirect toi /dangnhap
app.get('/private', (req, res) => {
    if (!req.session.daDangNhap) return res.redirect('/dangnhap');
    res.send('Manage your account');
});

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
    .then(() => {
        req.session.daDangNhap = true;
        res.send('Dang nhap thanh cong');
    })
    .catch(err => res.send(err.message));
});

app.listen(3000, () => console.log('Server started!'));