import { db } from "./connect.js";

export default class MahasiswaModels {

    static daftar(next) {
        db.all('SELECT mahasiswa.nim,mahasiswa.nama,mahasiswa.tanggalLahir,mahasiswa.alamat,mahasiswa.IDJURUSAN,jurusan.namajurusan FROM mahasiswa JOIN jurusan ON jurusan.IDJURUSAN = mahasiswa.IDJURUSAN',
            (err, rows) => {
                if (err) {
                    return console.log('cari data mahasiswa gagal')
                }
                next(rows)
            })
    }

    static cari(nim,next) {
        db.all('SELECT * FROM mahasiswa WHERE nim = ?', [nim], (err, rows) => {
            if (err)
                return console.log('cari data mahasiswa gagal')
            next(rows)
        })
    }

    static tambah(nim, nama, tanggalLahir, alamat, IDJURUSAN, next) {

        db.run('INSERT INTO mahasiswa(nim,nama,tanggalLahir,alamat,IDJURUSAN)VALUES (?,?,?,?,?)',
            [nim, nama, tanggalLahir, alamat, IDJURUSAN],
            err => {
                if (err)
                    return console.log('tambah data mahasiswa gagal')
                console.log('mahasiswa telah di tambahkan')
                next()
            });
    }

    static hapus(nim, next) {
        db.run('DELETE FROM mahasiswa WHERE nim = ?', [nim], err => {
            if (err)
                return console.log('hapus data mahasiswa gagal')
            console.log(`data mahasiswa '${nim}', telah dihapus`)
            next()
        })
    }
}
