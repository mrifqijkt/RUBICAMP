
import UserController from "./controllers/user.js"

UserController.welcome()

// MAHASISWA



// JURUSAN


function cariJurusan(next) {
    rl.question('masukan ID Jurusan :', (IDJURUSAN) => {
        db.all('SELECT * FROM jurusan WHERE IDJURUSAN = ?', [IDJURUSAN], (err, rows) => {
            if (err)
                return console.log('cari data jurusan gagal')

            if (rows.length == 0) {
                console.log(`nama jurusan dengan ID Jurusan ${IDJURUSAN} tidak terdaftar`)

            } else {
                console.log(`
detail nama jurusan dengan IDJURUSAN '${IDJURUSAN}' : 
ID Jurusan      : ${rows[0].IDJURUSAN}
Nama Jurusan    : ${rows[0].namajurusan}  `)

            }
            line()
            next()
        })
    })
}

function tambahJurusan(next) {
    console.log('lengkapi data di bawah ini :')
    daftarJurusan(() => {
        rl.question('ID Jurusan : ', IDJURUSAN => {
            rl.question('Nama Jurusan ; ', namajurusan => {
                db.run('INSERT INTO jurusan(IDJURUSAN,namajurusan)VALUES (?,?)',
                    [IDJURUSAN, namajurusan],
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

// DOSEN

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
                console.log(`nama dosen dengan ID Dosen ${IDDOSEN} tidak terdaftar`)

            } else {
                console.log(`
detail nama dosen dengan IDDOSEN '${IDDOSEN}' : 
ID Dosen      : ${rows[0].IDDOSEN}
Nama Dosen    : ${rows[0].namadosen}  `)

            }
            line()
            next()
        })
    })
}

function tambahDosen(next) {
    console.log('lengkapi data di bawah ini :')
    daftarDosen(() => {
        rl.question('ID Dosen : ', IDDOSEN => {
            rl.question('Nama Dosen ; ', namadosen => {
                db.run('INSERT INTO dosen(IDDOSEN,namadosen)VALUES (?,?)',
                    [IDDOSEN, namadosen],
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

// MATAKULIAH

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
                console.log(`nama matakuliah dengan ID Matakuliah ${IDMATAKULIAH} tidak terdaftar`)

            } else {
                console.log(`
detail nama matakuliah dengan IDMATAKULIAH '${IDMATAKULIAH}' : 
ID Matakuliah      : ${rows[0].IDMATAKULIAH}
Nama Matakuliah    : ${rows[0].namamatakuliah}  `)

            }
            line()
            next()
        })
    })
}

function tambahMatakuliah(next) {
    console.log('lengkapi data di bawah ini :')
    daftarMatakuliah(() => {
        rl.question('ID Matakuliah  : ', IDMATAKULIAH => {
            rl.question('Nama Matakuliah : ', namamatakuliah => {
                rl.question('Nilai sks : ', sks => {
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

// MENGIKUTI

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

function daftarMengikuti(next) {

    db.all('SELECT mengikuti.nom,mengikuti.nim,mahasiswa.nama,matakuliah.namamatakuliah,dosen.namadosen,mengikuti.NILAI FROM mengikuti JOIN mahasiswa ON mengikuti.nim = mahasiswa.nim JOIN matakuliah ON mengikuti.IDMATAKULIAH = matakuliah.IDMATAKULIAH JOIN dosen ON mengikuti.IDDOSEN = dosen.IDDOSEN', (err, rows) => {

        if (err) {
            return console.log('ambil data mengikuti gagal')
        }
        let table = new Table({
            head: ['ID', 'NIM', 'NAMA', 'MATAKULIAH', 'NAMA DOSEN', 'NILAI'],
        });
        rows.forEach((mengikuti) => {
            table.push(
                [mengikuti.nom, mengikuti.nim, mengikuti.nama, mengikuti.namamatakuliah, mengikuti.namadosen, mengikuti.NILAI]
            );
        })
        console.log(table.toString());
        next()
    })
}

function cariMengikuti(next) {

    daftarMahasiswa(() => {

        rl.question('masukan nim mahasiswa :', (nim) => {
            db.all(' SELECT * FROM mengikuti WHERE nim =? ',
                [nim], (err, rows) => {
                    if (err)
                        return console.log('cari data mengikuti gagal')

                    if (rows.length == 0) {
                        console.log(`mengikuti dengan nim ${nim} tidak terdaftar`)

                    } else {
                        console.log(`
daftar mengikuti mahasiswa dengan nim '${nim}' adalah : 
`)
                        let table = new Table({
                            head: ['Nom', 'Nim', 'ID Dosen', 'ID Matakuliah', 'NILAI'],
                            colWidths: [10, 10, 10, 10, 10]
                        })
                        rows.forEach((mengikuti) => {
                            table.push(
                                [mengikuti.nom, mengikuti.nim, mengikuti.IDDOSEN, mengikuti.IDMATAKULIAH, mengikuti.NILAI]
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

function tambahMengikuti(next) {
    console.log('lengkapi data di bawah ini :')

    daftarMahasiswa(() => {
        rl.question('Masukkan NIM : ', nim => {

            daftarMatakuliah(() => {
                rl.question('Masukkan ID Matakuliah : ', IDMATAKULIAH => {

                    daftarDosen(() => {
                        rl.question('Masukkan ID Dosen : ', IDDOSEN => {


                            db.run('INSERT INTO mengikuti(nim,IDDOSEN,IDMATAKULIAH)VALUES (?,?,?)',
                                [nim, IDDOSEN, IDMATAKULIAH],
                                err => {
                                    if (err)
                                        return console.log('tambah data mengikuti gagal')
                                    console.log('mengikuti telah di tambahkan')

                                    daftarMengikuti(() => {
                                        next()
                                    })
                                })
                        })
                    })
                })
            })
        })
    })
}

function hapusMengikuti(next) {
    rl.question('Masukan Nom Mengikuti : ', nom => {
        db.run('DELETE FROM mengikuti WHERE nom = ?', [nom], err => {
            if (err)
                return console.log('hapus data mengikuti gagal')
            console.log(`data mengikuti dengan nom'${nom}',telah dihapus`)
            next()
        })
    })
}

function detailNilai(next) {
    db.all('SELECT mengikuti.nom,matakuliah.namamatakuliah,mengikuti.NILAI FROM mengikuti JOIN matakuliah ON mengikuti.IDMATAKULIAH = matakuliah.IDMATAKULIAH ; ', (err, rows) => {
        if (err) {
            return console.log('Ambil data mengikuti gagal')
        }

        let table = new Table({
            head: ['Nom', 'namamatakuliah', 'NILAI']

        })
        rows.forEach((mengikuti) => {
            table.push(
                [mengikuti.nom, mengikuti.namamatakuliah, mengikuti.NILAI]
            );
        })
        console.log(table.toString());
        next()
    })

}

function updateNilai(next) {
    daftarMengikuti(() => {
        rl.question('Masukkan Nim Mahasiswa :', nim => {
            line()

            console.log(`Detail Mahasiswa Dengan Nim '${nim}' : `)
            detailNilai(() => {

                rl.question('Masukkan Nom Mengikuti yang akan di rubah : ', nom => {
                    rl.question('Tulis Nilai Baru : ', NILAI => {

                        db.run('UPDATE mengikuti SET NILAI = ? WHERE nom = ?',
                            [NILAI, nom],
                            err => {
                                if (err)
                                    return console.log('Nilai gagal diupdate')

                                console.log('Nilai telah diupdate')

                                daftarMengikuti(() => {
                                    next()
                                })
                            }
                        )
                    })
                })
            })
        })
    })
}

// UserController.welcome()