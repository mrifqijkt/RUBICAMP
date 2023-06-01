import { db } from "./connect.js";

export default class DosenModel {

    static daftar(next) {
        db.all('SELECT * FROM dosen', (err, rows) => {
            if (err) {
                return console.log('ambil data dosen gagal')
            }
            next(rows)
        })
    }

    static cari(IDDOSEN, next) {

        db.all('SELECT * FROM dosen WHERE IDDOSEN = ?', [IDDOSEN], (err, rows) => {
            if (err)
                return console.log('cari data dosen gagal')
            next(rows)
        })
    }

    static tambah(IDDOSEN, namadosen, next) {

        db.run('INSERT INTO dosen(IDDOSEN,namadosen)VALUES (?,?)',
            [IDDOSEN, namadosen],
            err => {
                if (err)
                    return console.log('tambah data dosen gagal')
                console.log('dosen telah di tambahkan')
                next()
            })
    }

    static hapus(IDDOSEN, next) {

        db.run('DELETE FROM dosen WHERE IDDOSEN = ?', [IDDOSEN], err => {
            if (err)
                return console.log('hapus data dosen gagal')
                console.log(`data dosen '${IDDOSEN}',telah dihapus`)
            next()
        })
    }
}
