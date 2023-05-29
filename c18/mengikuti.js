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
[5] Mengikuti
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
                console.log('masuk Matakuliah')
                break;

            case '5':
                menuMengikuti()
                break;

            case '6':
                process.exit(0)
                break;

            default:
                break;
        }
    })
}

function menuMengikuti() {
    console.log(`
silahkan pilih opsi di bawah ini :
[1] Daftar Mengikuti
[2] Cari Mengikuti
[3] Tambah Mengikuti
[4] Hapus Mengikuti
[5] Update Nilai
[6] Kembali
    `)
    line()
    rl.question('masukkan salah satu no dari opsi di atas: ', answer => {
        switch (answer) {
            case '1':
                daftarMengikuti(() => {
                    menuMengikuti()
                })
                break;

            case '2':
                cariMengikuti(() => {
                    menuMengikuti()
                })
                break;

            case '3':
                tambahMengikuti(() => {
                    menuMengikuti()
                })
                break;

            case '4':
                hapusMengikuti(() => {
                    menuMengikuti()
                })
                break;

            case '5':
                updateNilai(() => {
                    menuMengikuti()
                })
                break;

            case '6':
                menuUtama()
                break;

            default:
                console.log('opsi yang dimasukkan salah')
                menuMengikuti()
                break;


        }
    })
}

import Table from 'cli-table';

function daftarMengikuti(next) {
    db.all('SELECT mengikuti.nom,mengikuti.nim,mahasiswa.nama,matakuliah.namamatakuliah,dosen.namadosen,mengikuti.NILAI FROM mengikuti JOIN mahasiswa ON mengikuti.nim = mahasiswa.nim JOIN matakuliah ON mengikuti.IDMATAKULIAH = matakuliah.IDMATAKULIAH JOIN dosen ON mengikuti.IDDOSEN = dosen.IDDOSEN ', (err, rows) => {
        if (err) {
            return console.log('ambil data mengikuti gagal')
        }
        let table = new Table({
            head: ['Nom', 'Nim','Nama', 'Matakuliah','Dosen', 'NILAI'],
            colWidths: [10, 10, 10, 10, 10 ,10]
        });
        rows.forEach((mengikuti) => {
            table.push(
                [mengikuti.nom, mengikuti.nim,mengikuti.nama, mengikuti.namamatakuliah,mengikuti.namadosen, mengikuti.NILAI]
            );
        })
        console.log(table.toString());

        next()
    })
}

function cariMengikuti(next) {

    daftarM(() => {

        rl.question('masukan nim mahasiswa :', (nim) => {
            db.all(' SELECT nom.mengikuti,mengikuti.nim,mahasiswa.nama,matakuliah.namamatakuliah,dosen.namadosen,mengikuti.NILAI FROM mengikuti JOIN mahasiswa ON mengikuti.nim = mahasiswa.nim JOIN matakuliah ON mengikuti.IDMATAKULIAH = matakuliah.IDMATAKULIAH JOIN dosen ON mengikuti.IDDOSEN = dosen.IDDOSEN = ?',
             [nim], (err, rows) => {
                if (err)
                    return console.log('cari data mengikuti gagal')

                if (rows.length == 0) {
                    console.log(`mengikutmi dengan nim ${nim}tidak terdaftar`)

                } else {
                    console.log(`
daftar mengikuti mahasiswa dengan nim '${nim}' adalah : 
`)
                      table = new Table({
                        head: ['Nom','NIM','ID Matakuliah','ID Dosen','NILAI'],
                        colWidths:[10,10,10,10,10]
                    })
                    rows.forEach((mengikuti) => {
                        table.push(
                            [mengikuti.nom,mengikuti.nim,mengikuti.IDMATAKULIAH,mengikuti.IDDOSEN,mengikuti.NILAI]
                        );
                    })                    
                    console.log(table.toString());

                }
                line()
                next()
            })
        })
    })
}

welcome()


//welcm()