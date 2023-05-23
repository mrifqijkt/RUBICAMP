import Table from 'cli-table';
import sqlite3 from "sqlite3";

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


export {Mahasiswa,daftarMahasiswa}