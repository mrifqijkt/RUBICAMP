import { db } from "./connect.js";

export default class MatakuliahModel {

    static daftar(next) {

        db.all('SELECT * FROM matakuliah', (err, rows) => {

            if (err) {
                return console.log('ambil data matakuliah gagal')
            }
            next(rows)
        })
    }

    static cari(IDMATAKULIAH, next) {

        db.all('SELECT * FROM matakuliah WHERE IDMATAKULIAH = ?', [IDMATAKULIAH], (err, rows) => {

            if (err)
                return console.log('cari data matakuliah gagal')
            next(rows)
        })
    }

    static tambah(IDMATAKULIAH, namamatakuliah, sks, next) {

        db.run('INSERT INTO matakuliah(IDMATAKULIAH,namamatakuliah,sks)VALUES (?,?,?)',

            [IDMATAKULIAH, namamatakuliah, sks],
            err => {
                if (err)
                    return console.log('tambah data matakuliah gagal')

                console.log('matakuliah telah di tambahkan')
                next()
            });
    }

    static hapus(IDMATAKULIAH, next) {
        db.run('DELETE FROM matakuliah WHERE IDMATAKULIAH = ?', [IDMATAKULIAH], err => {
            if (err)
                return console.log('hapus data matakuliah gagal')
            console.log(`data matakuliah '${IDMATAKULIAH}',telah dihapus`)
            next()
        })
    }
}