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

app.get('/private', (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.redirect('/dangnhap');
    verify(token, SK, (err, obj) => {
        if (err) return res.redirect('/dangnhap');
        res.send(obj);
    }) ;
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
    .then(userInfo => {
        sign(userInfo, SK, (err, token) => {
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
