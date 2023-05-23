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
                console.log('daftar mahasiswa')
                break;

            case '2':
                console.log('cari mahasiswa')
                break;

            case '3':
                console.log('tambah mahasiswa')
                break;

            case '4':
                console.log('hapus mahasiswa')
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

welcome()

import Table from 'cli-table';

class Mahasiswa {

    static daftarMahasiswa() {

        var sql = 'SELECT * FROM mahasiswa';
        this.table = new Table({
            head: ['nim', 'nama', 'alamat', 'umur', 'IDJURUSAN'],
            colWidths: [10, 10, 20, 10, 10]
        });
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error(err);
            }
            
            for (let i = 0; i < rows.length; i++) {
                this.table.push([rows[i].nim,rows[i].nama,rows[i].alamat,rows[i].umur,rows[i].IDJURUSAN]);
            }
            console.log(this.table.toString());

        });
    }
}


Mahasiswa.daftarMahasiswa()