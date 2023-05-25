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
                console.log('masuk Mahasiswa')
                break;

            case '2':
               console.log('masuk Jurusan')
                break;

            case '3':
               menuDosen()
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

function menuDosen() {
    console.log(`
silahkan pilih opsi di bawah ini :
[1] Daftar Dosen
[2] Cari Dosen
[3] Tambah Dosen
[4] Hapus Dosen
[5] Kembali
    `)
    line()
    rl.question('masukkan salah satu no dari opsi di atas: ', answer => {
        switch (answer) {
            case '1':
                daftarDosen(() => {
                    menuDosen()
                })
                break;

            case '2':
                cariDosen(() => {
                    menuDosen()
                })
                break;

            case '3':
                tambahDosen(() => {
                    menuDosen()
                })
                break;

            case '4':
                hapusDosen(() => {
                    menuDosen()
                })
                break;

            case '5':
                menuUtama()
                break;

            default:
                console.log('opsi yang dimasukkan salah')
                menuDosen()
                break;


        }
    })
}

import Table from 'cli-table';

function daftarDosen(next) {
    db.all('SELECT * FROM dosen', (err, rows) => {
        if (err) {
            return console.log('ambil data dosen gagal')
        }
        let table = new Table({
            head: ['IDDOSEN', 'namadosen'],
            colWidths: [20, 20]
        });
        rows.forEach((dosen) => {
            table.push(
                [dosen.IDDOSEN, dosen.namadosen]
            );
        })
        console.log(table.toString());

        next()
    })
}

function cariDosen(next) {
    rl.question('masukan ID Dosen :', (IDDOSEN) => {
        db.all('SELECT * FROM dosen WHERE IDDOSEN = ?', [IDDOSEN], (err, rows) => {
            if (err)
                return console.log('cari data dosen gagal')

            if (rows.length == 0) {
                console.log(`nama dosen dengan ID Dosen ${IDDOSEN}tidak terdaftar`)

            } else {
                console.log(`
detail nama dosen dengan IDDOSEN '${IDDOSEN}' : 
ID Dosen     : ${rows[0].IDDOSEN}
Nama Dosen    : ${rows[0].namadosen}  `)

            }
            line()
            next()
        })
    })
}

function tambahDosen(next) {
    console.log('lengkapi data di bawah ini')
    daftarDosen(() => {
        rl.question('ID Dosen : ', IDDOSEN => {

            daftarDosen(() => {
                rl.question('Nama Dosen ; ', namadosen => {
                    db.run('INSERT INTO dosen(IDDOSEN,namadosen)VALUES (?,?)',
                        [IDDOSEN,namadosen],
                        err => {
                            if (err)
                                return console.log('tambah data dosen gagal')

                            console.log('dosen telah di tambahkan')
                            daftarDosen(() => {
                                next()
                            })

                        })
                })
            })
        })
    })
}

function hapusDosen(next) {
    rl.question('Masukan ID Dosen : ', IDDOSEN => {
        db.run('DELETE FROM dosen WHERE IDDOSEN = ?', [IDDOSEN], err => {
            if (err)
                return console.log('hapus data dosen gagal')
            console.log(`data dosen '${IDDOSEN}',telah dihapus`)
            next()


        })
    })
}

welcome()