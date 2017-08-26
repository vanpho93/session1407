const { hash, compare } = require('bcrypt');
const queryDb = require('./db');

class User {
    static async signIn(email, rawPassword) {
        const selectSql = 'SELECT * FROM "User" WHERE email = $1';
        const result = await queryDb(selectSql, [email]);
        if (!result.rows[0]) throw new Error('Email khong ton tai');
        const { password } = result.rows[0];
        const same = await compare(rawPassword, password);
        if (!same) throw new Error('Sai password');
        return;
    }

    static async signUp(email, password, name, phone) {
        const insertSql = 'INSERT INTO public."User" (email, password, name, phone) VALUES ($1, $2, $3, $4);'
        const encrypted = await hash(password, 8);
        return queryDb(insertSql, [email, encrypted, name, phone]);
    }
}

module.exports = User;
