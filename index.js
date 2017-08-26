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
        maxAge: 500000
    }
}));

const requireLogin = (req, res, next) => {
    if (!req.session.daDangNhap) return res.redirect('/dangnhap');
    next();
};

const redirectIfLoggedIn = (req, res, next) => {
    if (req.session.daDangNhap) return res.redirect('/private');
    next();
};

app.get('/', (req, res) => res.render('home'));

// Ai da dang nhap thanh
// Redirect toi /dangnhap
app.get('/private', requireLogin, (req, res) => {
    res.send('Manage your account');
});

app.get('/dangky', redirectIfLoggedIn, (req, res) => res.render('dangky'));
app.get('/dangnhap', redirectIfLoggedIn, (req, res) => res.render('dangnhap'));

app.post('/dangky', redirectIfLoggedIn, parser, (req, res) => {
    const { email, password, name, phone } = req.body;
    User.signUp(email, password, name, phone)
    .then(() => res.send('Dang ky thanh cong'))
    .catch(err => res.send(err.message));
});

app.post('/dangnhap', redirectIfLoggedIn, parser, (req, res) => {
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(() => {
        req.session.daDangNhap = true;
        res.send('Dang nhap thanh cong');
    })
    .catch(err => res.send(err.message));
});

app.listen(3000, () => console.log('Server started!'));