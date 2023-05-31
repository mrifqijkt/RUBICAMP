import { rl, login, line } from "../views/utill.js";
import User from '../controllers/user.js';
import MahasiswaController from "./mahasiswa.js";
import UserModels from "../models/user.js";


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
                    menuJurusan()
                    break;
    
                case '3':
                    menuDosen()
                    break;
    
                case '4':
                    menuMatakuliah()
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

}