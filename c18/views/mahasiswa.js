import Table from "cli-table";

export default class MahasiswaView {

    static line() {
        console.log('====================================================')
    };

    static daftar(rows) {
        let table = new Table({
            head: ['nim', 'nama', 'tanggalLahir', 'alamat', 'IDJURUSAN', 'namajurusan'],
        });
        rows.forEach((mahasiswa) => {
            table.push(
                [mahasiswa.nim, mahasiswa.nama, mahasiswa.tanggalLahir, mahasiswa.alamat, mahasiswa.IDJURUSAN, mahasiswa.namajurusan]
            );
        })
        console.log(table.toString());
    }
}

