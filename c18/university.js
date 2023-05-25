import readline from "readline";
import sqlite3 from "sqlite3";
import Table from 'cli-table';

const db = new sqlite3.Database('university.db')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const user = {
    'rifqi': '1234'
}

function line() {
    console.log('====================================================')
};

function welcome() {
    line()
    console.log('Welcome to Universitas Indonesia')
    console.log('Jl.Jakarta Raya no.15')
    line()
    username()
}

function username() {
    rl.question('username: ', answer => {
        db.all('SELECT * FROM users WHERE username = ?', [answer], (err, rows) => {
            if (err) throw err
            if (rows.length == 0) {
                console.log('username not found')
                username()
            } else {
                password(rows[0])
            }
        })
    })
}

function password(user) {
    rl.question('password; ', answer => {
        if (user.password === answer) {
            line()
            console.log(`welcome ${user.username}. Your acces level is : ADMIN `)
            line()
            menuUtama()
        } else {
            console.log('password salah')
            password(user)
        }
    })

}

function menuUtama() {
    console.log(`
silahkan pilih opsi di  bawah ini :
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar
    `)
    line()
    rl.question('masukan salah satu no dari opsi di atas: ', answer => {
        switch (answer) {
            case '1':
                menuMahasiswa()
                break;

            case '2':
                console.log('masuk jurusan')
                break;

            case '3':
                console.log('masuk mahasiswa')
                break;

            case '4':
                console.log('masuk mahasiswa')
                break;

            case '5':
                console.log('masuk mahasiswa')
                break;

            case '6':
                process.exit(0)
                break;

            default:
                break;
        }
    })
}

function menuMahasiswa() {
    console.log(`
siliahkan pilih opsi di bawah ini :
[1] Daftar Mahasiswa
[2] Cari Mahasiswa
[3] Tambah Mahasiswa
[4] Hapus Mahasiswa
[5] Kembali
    `)
    line()
    rl.question('masukkan salah satu no. dari opsi di atas: ', answer => {
        switch (answer) {
            case '1':
                daftarMahasiswa(() => {
                    menuMahasiswa()
                })
                break;

            case '2':
                cariMahasiswa(() => {
                    menuMahasiswa()
                })
                break;

            case '3':
                tambahMahasiswa(() => {
                    menuMahasiswa()
                })
                break;

            case '4':
                hapusMahasiswa(() => {
                    menuMahasiswa()
                })
                break;

            case '5':
                menuUtama()
                break;

            default:
                console.log('opsi yang dimasukkan salah')
                menuMahasiswa()
                break;

        }
    })
}


function daftarMahasiswa(next) {
    const sql = `SELECT mahasiswa.nim,mahasiswa.nama,mahasiswa.tanggalLahir,mahasiswa.alamat,mahasiswa.IDJURUSAN,jurusan.namajurusan FROM mahasiswa JOIN jurusan ON jurusan.IDJURUSAN = mahasiswa.IDJURUSAN`
    db.all(sql, (err, rows) => {
        console.log(rows)
        if (err) {
            return console.log('ambil data mahasiswa gagal')
        }
        let table = new Table({
            head: ['nim', 'nama','tanggalLahir', 'alamat','kodejurusan','namajurusan' ],
            
        });
        rows.forEach((mahasiswa) => {
            table.push(
                [mahasiswa.nim, mahasiswa.nama,mahasiswa.tanggalLahir,mahasiswa.alamat,mahasiswa.IDJURUSAN,mahasiswa.namajurusan]
            );
        })
        console.log(table.toString());

        next()
    })
}


function cariMahasiswa(next) {
    rl.question('masukan nim mahasiswa :', (nim) => {
        db.all('SELECT * FROM mahasiswa WHERE nim = ?', [nim], (err, rows) => {
            if (err)
                return console.log('cari data mahasiswa gagal')

            if (rows.length == 0) {
                console.log(`mahasiswa dengan nim ${nim}tidak terdaftar`)

            } else {
                console.log(`
detail mahasiswa dengan nim '${nim}' : 
nim     : ${rows[0].nim}
nama    : ${rows[0].nama}  `)

            }
            line()
            next()
        })
    })
}

function tambahMahasiswa(next) {
    console.log('lengkapi data di bawah ini')
    daftarMahasiswa(() => {
        rl.question('NIM : ', nim => {
            rl.question('Nama : ', nama => {
                rl.question('Umur : ', umur => {
                    rl.question('Alamat : ', alamat => {

                        daftarJurusan(() => {
                            rl.question('IDJURUSAN ; ', IDJURUSAN => {
                                db.run('INSERT INTO mahasiswa(nim,nama,umur,alamat,IDJURUSAN)VALUES (?,?,?,?,?)',
                                    [nim, nama, umur, alamat, IDJURUSAN],
                                    err => {
                                        if (err)
                                            return console.log('tambah data mahasiswa gagal')

                                        console.log('mahasiswa telah di tambahkan')
                                        daftarMahasiswa(() => {
                                            next()
                                        })

                                    })
                            })
                        })
                    })
                })
            })
        })
    })
}

function hapusMahasiswa(next) {
    rl.question('Masukan NIM mahasiswa : ', nim => {
        db.run('DELETE FROM mahasiswa WHERE nim = ?', [nim], err => {
            if (err)
                return console.log('hapus data mahasiswa gagal')
            console.log(`data mahasiswa '${nim}',telah dihapus`)
            next()


        })
    })
}

function daftarJurusan(next) {
    db.all('SELECT * FROM jurusan', (err, rows) => {
        if (err) {
            return console.log('ambil data jurusan gagal')
        }
        let table = new Table({
            head: ['IDJURUSAN', 'namajurusan'],
            colWidths: [20, 20]
        });
        rows.forEach((jurusan) => {
            table.push(
                [jurusan.IDJURUSAN, jurusan.namajurusan]
            );
        })
        console.log(table.toString());

        next()
    })
}

welcome()