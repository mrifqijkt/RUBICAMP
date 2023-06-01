import { line } from "../views/utill.js";
import UserController from "../controllers/user.js";
import { rl } from "../views/utill.js";
import MengikutiModel from "../models/mengikuti.js";
import MahasiswaController from "./mahasiswa.js";
import MatakuliahController from "./matakuliah.js";
import DosenController from "./dosen.js";
import MengikutiView from "../views/mengikuti.js";

export default class MengikutiController {

    static menuMengikuti() {
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
                    MengikutiController.daftarMengikuti(() => {
                        MengikutiController.menuMengikuti()
                    })
                    break;

                case '2':
                    MengikutiController.cariMengikuti(() => {
                        MengikutiController.menuMengikuti()
                    })
                    break;

                case '3':
                    MengikutiController.tambahMengikuti(() => {
                        MengikutiController.menuMengikuti()
                    })
                    break;

                case '4':
                    MengikutiController.hapusMengikuti(() => {
                        MengikutiController.menuMengikuti()
                    })
                    break;

                case '5':
                    MengikutiController.updateNilai(() => {
                        MengikutiController.menuMengikuti()
                    })
                    break;

                case '6':
                    UserController.menuUtama()
                    break;

                default:
                    console.log('opsi yang dimasukkan salah')
                    MengikutiController.menuMengikuti()
                    break;
            }
        })
    }

    static daftarMengikuti(next) {
        MengikutiModel.daftar((rows) => {
            MengikutiView.daftar(rows);
            next()
        })
    }

    static cariMengikuti(next) {

        MahasiswaController.daftarMahasiswa(() => {

            rl.question('masukan nim mahasiswa :', (nim) => {

                MengikutiModel.cari(nim, (rows) => {

                    if (rows.length == 0) {
                        console.log(`mengikuti dengan nim ${nim} tidak terdaftar`)
                    } else {
                        console.log(` daftar mengikuti mahasiswa dengan nim '${nim}' adalah : `)
                        MengikutiView.cari(rows);
                    }
                    line()
                    next()
                })
            })
        })
    }

    static tambahMengikuti(next) {
        console.log('lengkapi data di bawah ini :')

        MahasiswaController.daftarMahasiswa(() => {
            rl.question('Masukkan NIM : ', nim => {

                MatakuliahController.daftarMatakuliah(() => {
                    rl.question('Masukkan ID Matakuliah : ', IDMATAKULIAH => {

                        DosenController.daftarDosen(() => {
                            rl.question('Masukkan ID Dosen : ', IDDOSEN => {

                                MengikutiModel.tambah(nim, IDDOSEN, IDMATAKULIAH, () => {

                                    MengikutiController.daftarMengikuti(() => {
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

    static hapusMengikuti(next) {
        rl.question('Masukan Nom Mengikuti : ', nom => {
            MengikutiModel.hapus(nom, () => {
                next()
            })
        })
    }

    static detailNilai(next) {
        MengikutiModel.daftar((rows) => {
          MengikutiView.detail(rows);
            next()
        })
    }

    static updateNilai(next) {
        MengikutiController.daftarMengikuti(() => {
            rl.question('Masukkan Nim Mahasiswa :', nim => {
                line()

                console.log(`Detail Mahasiswa Dengan Nim '${nim}' : `)
                MengikutiController.detailNilai(() => {

                    rl.question('Masukkan Nom Mengikuti yang akan di rubah : ', nom => {
                        rl.question('Tulis Nilai Baru : ', NILAI => {

                            MengikutiModel.update(NILAI, nom, () => {

                                MengikutiController.daftarMengikuti(() => {
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
}