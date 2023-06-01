import { line } from "../views/utill.js";
import UserController from "./user.js";
import { rl } from "../views/utill.js";
import DosenModel from "../models/dosen.js";
import DosenVIew from "../views/dosen.js";


export default class DosenController {

    static menuDosen() {
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
                    DosenController.daftarDosen(() => {
                        DosenController.menuDosen()
                    })
                    break;

                case '2':
                    DosenController.cariDosen(() => {
                        DosenController.menuDosen()
                    })
                    break;

                case '3':
                    DosenController.tambahDosen(() => {
                        DosenController.menuDosen()
                    })
                    break;

                case '4':
                    DosenController.hapusDosen(() => {
                        DosenController.menuDosen()
                    })
                    break;

                case '5':
                    UserController.menuUtama()
                    break;

                default:
                    console.log('opsi yang dimasukkan salah')
                    DosenController.menuDosen()
                    break;
            }
        })
    }

    static daftarDosen(next) {
        DosenModel.daftar((rows) => {
            DosenVIew.daftar(rows);
            next()
        })
    }

    static cariDosen(next) {
        rl.question('masukan ID Dosen :', (IDDOSEN) => {

            DosenModel.cari(IDDOSEN, (rows) => {

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

    static tambahDosen(next) {
        console.log('lengkapi data di bawah ini :')
        DosenController.daftarDosen(() => {
            rl.question('ID Dosen : ', IDDOSEN => {
                rl.question('Nama Dosen ; ', namadosen => {

                    DosenModel.tambah(IDDOSEN, namadosen, () => {

                        DosenController.daftarDosen(() => {
                            next()
                        })
                    })
                })
            })
        })
    }

    static hapusDosen(next) {
        rl.question('Masukan ID Dosen : ', IDDOSEN => {

            DosenModel.hapus(IDDOSEN, () => {
                next()
            })
        })
    }
}



