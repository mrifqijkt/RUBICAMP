import { line } from "../views/utill.js"
import UserController from "../controllers/user.js"
import { rl } from "../views/utill.js"
import MahasiswaModels from "../models/mahasiswa.js"
import Table from "cli-table"
import JurusanModel from "../models/jurusan.js"
// import JurusanModel from "../models/jurusan.js"


export default class MahasiswaController {


    static menuMahasiswa() {
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
                    MahasiswaController.daftarMahasiswa(() => {
                        MahasiswaController.menuMahasiswa()
                    })
                    break;

                case '2':
                    MahasiswaController.cariMahasiswa(() => {
                        MahasiswaController.menuMahasiswa()
                    })
                    break;

                case '3':
                    MahasiswaController.tambahMahasiswa(() => {
                        MahasiswaController.menuMahasiswa()
                    })
                    break;

                case '4':
                    MahasiswaController.hapusMahasiswa(() => {
                        MahasiswaController.menuMahasiswa()
                    })
                    break;

                case '5':
                    UserController.menuUtama()
                    break;

                default:
                    console.log('opsi yang dimasukkan salah')
                    MahasiswaController.menuMahasiswa()
                    break;

            }
        })
    }

    static daftarMahasiswa(next) {

        MahasiswaModels.daftar((rows) => {

            let table = new Table({
                head: ['nim', 'nama', 'tanggalLahir', 'alamat', 'IDJURUSAN', 'namajurusan'],

            });
            rows.forEach((mahasiswa) => {
                table.push(
                    [mahasiswa.nim, mahasiswa.nama, mahasiswa.tanggalLahir, mahasiswa.alamat, mahasiswa.IDJURUSAN, mahasiswa.namajurusan]
                );
            })
            console.log(table.toString());

            next()

        })
    }

    static cariMahasiswa(next) {
        rl.question('masukan nim mahasiswa :', (nim) => {

            MahasiswaModels.cari(nim, (rows) => {

                if (rows.length == 0) {
                    console.log(`mahasiswa dengan nim ${nim} tidak terdaftar`)

                } else {
                    console.log(`
    detail mahasiswa dengan nim '${nim}' : 
    Nim        : ${rows[0].nim}
    Nama       : ${rows[0].nama}
    Alamat     : ${rows[0].alamat}
    ID Jurusan : ${rows[0].IDJURUSAN}`)

                }
                line()
                next()
            })
        })
    }

    static tambahMahasiswa(next) {
        console.log('lengkapi data di bawah ini :')
        MahasiswaModels.daftar(() => {
            rl.question('NIM : ', nim => {
                rl.question('Nama : ', nama => {
                    rl.question('Tanggal Lahir : ', tanggalLahir => {
                        rl.question('Alamat : ', alamat => {
                            JurusanModel.daftar(() => {
                                rl.question('IDJURUSAN ; ', IDJURUSAN => {

                                    MahasiswaModels.tambah(nim, nama, tanggalLahir, alamat, IDJURUSAN, () => {


                                        MahasiswaModels.daftar(() => {
                                            next()
                                        })
                                    })
                                })
                            })
                        })

                    })
                })
            })
        })
    }

    static hapusMahasiswa(next) {
        rl.question('Masukan NIM mahasiswa : ', nim => {

            Mahasiswa.hapus(nim, () => {


                next()
            })
        })
    }

}