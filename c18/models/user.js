
import { db } from "./connect.js";

export default class UserModel {

    static username(answer, next) {
        db.all('SELECT * FROM users WHERE username = ?', [answer], (err, rows) => {
            if (err) return console.log('username salah');
            next(rows)
        })
    }
}