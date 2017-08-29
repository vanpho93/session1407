const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const { sign, verify } = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const SK = 'k3h2f98afyqfqsdf';
const User = require('./User');

const app = express();

app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => res.render('home'));

const refreshToken = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.redirect('/dangnhap');
    verify(token, SK, (err, obj) => {
        if (err) return res.redirect('/dangnhap');
        const { email, phone, name } = obj;
        sign({ email, phone, name }, SK, { expiresIn: 10 }, (errSign, token) => {
            res.cookie('token', token);
            req.userInfo = { email, phone, name };
            next();
        });
    }) ;
}

const redirectIfLoggedIn = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next();
    verify(token, SK, (err, obj) => {
        if (err) return next();
        res.redirect('/private');
    }) ;
};

app.get('/private', refreshToken, (req, res) => {
    res.send(req.userInfo);
});

app.get('/dangky', redirectIfLoggedIn, (req, res) => res.render('dangky'));
app.get('/dangnhap', redirectIfLoggedIn, (req, res) => res.render('dangnhap'));

app.post('/dangky', parser, (req, res) => {
    const { email, password, name, phone } = req.body;
    User.signUp(email, password, name, phone)
    .then(() => res.send('Dang ky thanh cong'))
    .catch(err => res.send(err.message));
});

app.post('/dangnhap', parser, (req, res) => {
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(userInfo => {
        sign(userInfo, SK, { expiresIn: 10 }, (err, token) => {
            res.cookie('token', token);
            res.send('Dang nhap thanh cong');
        });
    })
    .catch(err => res.send(err.message));
});

app.listen(3000, () => console.log('Server started!'));

// Chua dang nhap ma trong /private -> redirect toi /dangnhap
// Dang nhap roi ma vao /dangnhap /dangky redirect /private
// Private Hien thi thong tin cua user -> ko truy van db -> Luu trong token

// Refresh token
// Set thoi gian song cho token
// Viet thanh middleware 
