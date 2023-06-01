import { rl, login, line } from "../views/utill.js";
import User from '../controllers/user.js';
import MahasiswaController from "./mahasiswa.js";
import UserModels from "../models/user.js";
import JurusanController from "./jurusan.js";
import DosenController from "./dosen.js";
import MatakuliahController from "./matakuliah.js";
import MengikutiController from "./mengikuti.js";


export default class UserController {

    static welcome(){
        login()
        UserController.username()
    }

    static username(){
        rl.question('username: ', answer => {
            UserModels.username(answer, (rows) => {
                if (rows.length == 0) {
                    console.log('username salah')
                    UserController.username()
                } else {
                    UserController.password(rows[0])
                }
            })
        })
    }

    static password(user) {
        rl.question('password; ', answer => {
            if (user.password === answer) {
                line()
                console.log(`welcome ${user.username}. Your acces level is : ADMIN `)
                line()
                UserController.menuUtama()
            } else {
                console.log('password salah')
                UserController.password(user)
            }
        })
    
    }

    static menuUtama() {
        console.log(`
    silahkan pilih opsi di  bawah ini :
    [1] Mahasiswa
    [2] Jurusan
    [3] Dosen
    [4] MataKuliah
    [5] Mengikuti
    [6] Keluar
        `)
        line()
        rl.question('masukan salah satu no dari opsi di atas: ', answer => {
            switch (answer) {
                case '1':
                    MahasiswaController.menuMahasiswa()
                    break;
    
                case '2':
                    JurusanController.menuJurusan()
                    break;
    
                case '3':
                    DosenController.menuDosen()
                    break;
    
                case '4':
                    MatakuliahController.menuMatakuliah()
                    break;
    
                case '5':
                    MengikutiController.menuMengikuti()
                    break;
    
                case '6':
                    process.exit(0)
                    break;
    
                default:
                    break;
            }
        })
    }

}