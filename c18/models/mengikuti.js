import { db } from "./connect.js";

export default class MengikutiModel {

    static daftar(next) {

        db.all('SELECT mengikuti.nom,mengikuti.nim,mahasiswa.nama,matakuliah.namamatakuliah,dosen.namadosen,mengikuti.NILAI FROM mengikuti JOIN mahasiswa ON mengikuti.nim = mahasiswa.nim JOIN matakuliah ON mengikuti.IDMATAKULIAH = matakuliah.IDMATAKULIAH JOIN dosen ON mengikuti.IDDOSEN = dosen.IDDOSEN',

            (err, rows) => {
                if (err) {
                    return console.log('ambil data mengikuti gagal')
                }
                next(rows)
            })
    }

    static cari(nim, next) {

        db.all(' SELECT * FROM mengikuti WHERE nim =? ',
            [nim], (err, rows) => {
                if (err)
                    return console.log('cari data mengikuti gagal')
                next(rows)
            })
    }

    static tambah(nim, IDDOSEN, IDMATAKULIAH, next) {
        db.run('INSERT INTO mengikuti(nim,IDDOSEN,IDMATAKULIAH)VALUES (?,?,?)',
            [nim, IDDOSEN, IDMATAKULIAH],
            err => {
                if (err)
                    return console.log('tambah data mengikuti gagal')
                console.log('mengikuti telah di tambahkan')
                next()
            })
    }

    static hapus(nom, next) {
        db.run('DELETE FROM mengikuti WHERE nom = ?', [nom], err => {
            if (err)
                return console.log('hapus data mengikuti gagal')
            console.log(`data mengikuti dengan nom'${nom}',telah dihapus`)
            next()
        })
    }

    static detail(next) {
        db.all('SELECT mengikuti.nom,matakuliah.namamatakuliah,mengikuti.NILAI FROM mengikuti INNER JOIN matakuliah ON mengikuti.IDMATAKULIAH = matakuliah.IDMATAKULIAH ; ', (err, rows) => {
            if (err) {
                return console.log('Ambil data mengikuti gagal')
            }
            next(rows)
        })
    }

    static update(nom,NILAI, next) {
        db.run('UPDATE mengikuti SET NILAI = ? WHERE nom = ?',
            [nom,NILAI],
            err => {
                if (err)
                    return console.log('Nilai gagal diupdate')
                console.log('Nilai telah diupdate')
                next()
            })
    }
}