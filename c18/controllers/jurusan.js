import { line } from "../views/utill.js"
import UserController from "../controllers/user.js"
import { rl } from "../views/utill.js"
import JurusanModel from "../models/jurusan.js"
import JurusanView from "../views/jurusan.js"

export default class JurusanController {

    static menuJurusan() {
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
                    JurusanController.daftarJurusan(() => {
                        JurusanController.menuJurusan()
                    })
                    break;

                case '2':
                    JurusanController.cariJurusan(() => {
                        JurusanController.menuJurusan()
                    })
                    break;

                case '3':
                    JurusanController.tambahJurusan(() => {
                        JurusanController.menuJurusan()
                    })
                    break;

                case '4':
                    JurusanController.hapusJurusan(() => {
                        JurusanController.menuJurusan()
                    })
                    break;

                case '5':
                    UserController.menuUtama()
                    break;

                default:
                    console.log('opsi yang dimasukkan salah')
                    JurusanController.menuJurusan()
                    break;
            }
        })
    }

    static daftarJurusan(next) {
        JurusanModel.daftar((rows) => {
           JurusanView.daftar(rows)
            next()
        })
    }

    static cariJurusan(next) {
        rl.question('masukan ID Jurusan :', (IDJURUSAN) => {

            JurusanModel.cari(IDJURUSAN, (rows) => {

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

    static tambahJurusan(next) {
        console.log('lengkapi data di bawah ini :')
        JurusanController.daftarJurusan(() => {
            rl.question('ID Jurusan : ', IDJURUSAN => {
                rl.question('Nama Jurusan ; ', namajurusan => {

                    JurusanModel.tambah(IDJURUSAN, namajurusan, () => {

                        JurusanController.daftarJurusan(() => {
                            next()
                        })
                    })
                })
            })
        })
    }

    static hapusJurusan(next) {
        rl.question('Masukan ID Jurusan : ', IDJURUSAN => {

            JurusanModel.hapus(IDJURUSAN, () => {
                next()
            })
        })
    }
}