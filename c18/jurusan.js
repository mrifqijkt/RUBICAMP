import readline from "readline";
import sqlite3 from "sqlite3";

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
    rl.question('masukan salah satu no. dari opsi di atas: ', answer => {
        switch (answer) {
            case '1':
                console.log('masuk mahasiswa')
                break;

            case '2':
                menuJurusan()
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


function menuJurusan() {
    console.log(`
silahkan pilih opsi di bawah ini :
[1] Daftar Jurusan
[2] Cari Jurusan
[3] Tambah Jurusan
[4] Hapus Jurusan
[5] Kembali
    `)
    line()
    rl.question('masukkan salah satu no dari opsi di atas: ', answer => {
        switch (answer) {
            case '1':
                daftarJurusan(() => {
                    menuJurusan()
                })
                break;

            case '2':
                cariJurusan(() => {
                    menuJurusan()
                })
                break;

            case '3':
                tambahJurusan(() => {
                    menuJurusan()
                })
                break;

            case '4':
                hapusJurusan(() => {
                    menuJurusan()
                })
                break;

            case '5':
                menuUtama()
                break;

            default:
                console.log('opsi yang dimasukkan salah')
                menuJurusan()
                break;


        }
    })
}

import Table from 'cli-table';

function daftarJurusan(next) {
    db.all('SELECT IDJURUSAN,namajurusan FROM jurusan', (err, rows) => {
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

function cariJurusan(next) {
    rl.question('masukan ID Jurusan :', (IDJURUSAN) => {
        db.all('SELECT * FROM jurusan WHERE IDJURUSAN = ?', [IDJURUSAN], (err, rows) => {
            if (err)
                return console.log('cari data jurusan gagal')

            if (rows.length == 0) {
                console.log(`nama jurusan dengan ID Jurusan ${IDJURUSAN}tidak terdaftar`)

            } else {
                console.log(`
detail nama jurusan dengan IDJURUSAN '${IDJURUSAN}' : 
ID Jurusan     : ${rows[0].IDJURUSAN}
Nama Jurusan    : ${rows[0].namajurusan}  `)

            }
            line()
            next()
        })
    })
}

function tambahJurusan(next) {
    console.log('lengkapi data di bawah ini')
    daftarJurusan(() => {
        rl.question('ID Jurusan : ', IDJURUSAN => {

            daftarJurusan(() => {
                rl.question('Nama Jurusan ; ', namajurusan => {
                    db.run('INSERT INTO jurusan(IDJURUSAN,namajurusan)VALUES (?,?)',
                        [IDJURUSAN,namajurusan],
                        err => {
                            if (err)
                                return console.log('tambah data jurusan gagal')

                            console.log('jurusan telah di tambahkan')
                            daftarJurusan(() => {
                                next()
                            })

                        })
                })
            })
        })
    })
}

function hapusJurusan(next) {
    rl.question('Masukan ID Jurusan : ', IDJURUSAN => {
        db.run('DELETE FROM jurusan WHERE IDJURUSAN = ?', [IDJURUSAN], err => {
            if (err)
                return console.log('hapus data jurusan gagal')
            console.log(`data jurusan '${IDJURUSAN}',telah dihapus`)
            next()


        })
    })
}

welcome()