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

    static cari(IDJURUSAN, next) {

        db.all('SELECT * FROM jurusan WHERE IDJURUSAN = ?', [IDJURUSAN], (err, rows) => {
            if (err)
                return console.log('cari data jurusan gagal')
            next(rows)
        })
    }

    static tambah(IDJURUSAN, namajurusan, next) {

        db.run('INSERT INTO jurusan(IDJURUSAN,namajurusan)VALUES (?,?)',
            [IDJURUSAN, namajurusan],
            err => {
                if (err)
                    return console.log('tambah data jurusan gagal')
                console.log('jurusan telah di tambahkan')
                next()
            })
    }

    static hapus(IDJURUSAN, next) {

        db.run('DELETE FROM jurusan WHERE IDJURUSAN = ?', [IDJURUSAN], err => {
            if (err)
                return console.log('hapus data jurusan gagal')
            console.log(`data jurusan '${IDJURUSAN}',telah dihapus`)
            next()
        })
    }
}