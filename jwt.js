const jwt = require('jsonwebtoken');

const SECRET_KEY = 'asdfh29qefshafy2fw';

jwt.sign({ email: 'v1', name: 'P' }, SECRET_KEY, (err, token) => {
    console.log(token);
});

jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InYxIiwibmFtZSI6IlAiLCJpYXQiOjE1MDQwMTA5NjR9.plFwE-q9j9bM8G7yi7KjYccMP7jWLmDXV3HC55g3W1k', SECRET_KEY, (err, obj) => {
    console.log(obj);
});

// { name: 'abcd', email: 'xyz' } -> jwtnsajcbjahbcsjabjscdhas
//cookie-parser
