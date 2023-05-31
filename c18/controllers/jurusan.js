import { line } from "../views/utill.js"
import UserController from "../controllers/user.js"
import { rl } from "../views/utill.js"
import JurusanModel from "../models/jurusan.js"
import Table from "cli-table"


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



}