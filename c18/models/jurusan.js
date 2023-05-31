import { db } from "./connect.js";


export default class JurusanModel {

    static daftar(next) {
        db.all('SELECT IDJURUSAN,namajurusan FROM jurusan', (err, rows) => {
            if (err) {
                return console.log('ambil data jurusan gagal')

            }
            next(rows)
        })

    }
}