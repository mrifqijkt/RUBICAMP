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
                console.log('masuk Dosen')
                break;

            case '4':
                menuMatakuliah()
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

function menuMatakuliah() {
    console.log(`
silahkan pilih opsi di bawah ini :
[1] Daftar Matakuliah
[2] Cari Matakuliah
[3] Tambah Matakuliah
[4] Hapus Matakuliah
[5] Kembali
    `)
    line()
    rl.question('masukkan salah satu no dari opsi di atas: ', answer => {
        switch (answer) {
            case '1':
                daftarMatakuliah(() => {
                    menuMatakuliah()
                })
                break;

            case '2':
                cariMatakuliah(() => {
                    menuMatakuliah()
                })
                break;

            case '3':
                tambahMatakuliah(() => {
                    menuMatakuliah()
                })
                break;

            case '4':
                hapusMatakuliah(() => {
                    menuMatakuliah()
                })
                break;

            case '5':
                menuUtama()
                break;

            default:
                console.log('opsi yang dimasukkan salah')
                menuMatakuliah()
                break;


        }
    })
}

import Table from 'cli-table';

function daftarMatakuliah(next) {
    db.all('SELECT * FROM matakuliah', (err, rows) => {
        if (err) {
            return console.log('ambil data matakuliah gagal')
        }
        let table = new Table({
            head: ['IDMATAKULIAH', 'namamatakuliah', 'sks'],
            colWidths: [20, 20, 20]
        });
        rows.forEach((matakuliah) => {
            table.push(
                [matakuliah.IDMATAKULIAH, matakuliah.namamatakuliah, matakuliah.sks]
            );
        })
        console.log(table.toString());

        next()
    })
}

function cariMatakuliah(next) {
    rl.question('masukan ID Matakuliah :', (IDMATAKULIAH) => {
        db.all('SELECT * FROM matakuliah WHERE IDMATAKULIAH = ?', [IDMATAKULIAH], (err, rows) => {
            if (err)
                return console.log('cari data matakuliah gagal')

            if (rows.length == 0) {
                console.log(`nama matakuliah dengan ID Matakuliah ${IDMATAKULIAH}tidak terdaftar`)

            } else {
                console.log(`
detail nama matakuliah dengan IDMATAKULIAH '${IDMATAKULIAH}' : 
ID Matakuliah     : ${rows[0].IDMATAKULIAH}
Nama Matakuliah    : ${rows[0].namamatakuliah}  `)

            }
            line()
            next()
        })
    })
}

function tambahMatakuliah(next) {
    console.log('lengkapi data di bawah ini')
    daftarMatakuliah(() => {
        rl.question('ID Matakuliah : ', IDMATAKULIAH => {
            rl.question('nilai sks : ', sks => {

                daftarMatakuliah(() => {
                    rl.question('Nama Matakuliah ; ', namamatakuliah => {
                        db.run('INSERT INTO matakuliah(IDMATAKULIAH,namamatakuliah,sks)VALUES (?,?,?)',
                            [IDMATAKULIAH, namamatakuliah, sks],
                            err => {
                                if (err)
                                    return console.log('tambah data matakuliah gagal')

                                console.log('matakuliah telah di tambahkan')
                                daftarMatakuliah(() => {
                                    next()
                                })

                            })
                    })
                })
            })
        })
    })
}

function hapusMatakuliah(next) {
    rl.question('Masukan ID Matakuliah : ', IDMATAKULIAH => {
        db.run('DELETE FROM matakuliah WHERE IDMATAKULIAH = ?', [IDMATAKULIAH], err => {
            if (err)
                return console.log('hapus data matakuliah gagal')
            console.log(`data matakuliah '${IDMATAKULIAH}',telah dihapus`)
            next()


        })
    })
}

welcome()