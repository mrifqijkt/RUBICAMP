import { line } from "../views/utill.js";
import UserController from "../controllers/user.js";
import { rl } from "../views/utill.js";
import MatakuliahModel from "../models/matakuliah.js";
import MatakuliahView from "../views/matakuliah.js";


export default class MatakuliahController {


    static menuMatakuliah() {
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
                    MatakuliahController.daftarMatakuliah(() => {
                        MatakuliahController.menuMatakuliah()
                    })
                    break;

                case '2':
                    MatakuliahController.cariMatakuliah(() => {
                        MatakuliahController.menuMatakuliah()
                    })
                    break;

                case '3':
                    MatakuliahController.tambahMatakuliah(() => {
                        MatakuliahController.menuMatakuliah()
                    })
                    break;

                case '4':
                    MatakuliahController.hapusMatakuliah(() => {
                        MatakuliahController.menuMatakuliah()
                    })
                    break;

                case '5':
                    UserController.menuUtama()
                    break;

                default:
                    console.log('opsi yang dimasukkan salah')
                    MatakuliahController.menuMatakuliah()
                    break;
            }
        })
    }

    static daftarMatakuliah(next) {
        MatakuliahModel.daftar((rows) => {
            MatakuliahView.daftar(rows);
            next()
        })
    }

    static cariMatakuliah(next) {
        rl.question('masukan ID Matakuliah :', (IDMATAKULIAH) => {

            MatakuliahModel.cari(IDMATAKULIAH, (rows) => {

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

    static tambahMatakuliah(next) {
        console.log('lengkapi data di bawah ini :')
        MatakuliahController.daftarMatakuliah(() => {
            rl.question('ID Matakuliah  : ', IDMATAKULIAH => {
                rl.question('Nama Matakuliah : ', namamatakuliah => {
                    rl.question('Nilai sks : ', sks => {

                        MatakuliahModel.tambah(IDMATAKULIAH, namamatakuliah, sks, () => {

                            MatakuliahController.daftarMatakuliah(() => {
                                next()
                            })
                        })
                    })
                })
            })
        })
    }

    static hapusMatakuliah(next) {
        rl.question('Masukan ID Matakuliah : ', IDMATAKULIAH => {

            MatakuliahModel.hapus(IDMATAKULIAH, () => {
                next()
            })
        })
    }

}