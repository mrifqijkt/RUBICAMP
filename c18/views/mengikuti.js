import Table from "cli-table3";

export default class MengikutiView {

    static line() {
        console.log('====================================================')
    };
    static daftar(rows) {
        let table = new Table({
            head: ['ID', 'NIM', 'NAMA', 'MATAKULIAH', 'NAMA DOSEN', 'NILAI'],
        });
        rows.forEach((mengikuti) => {
            table.push(
                [mengikuti.nom, mengikuti.nim, mengikuti.nama, mengikuti.namamatakuliah, mengikuti.namadosen, mengikuti.NILAI]
            );
        })
        console.log(table.toString());
    }

    static cari(rows) {
        let table = new Table({
            head: ['Nom', 'Nim', 'ID Dosen', 'ID Matakuliah', 'NILAI'],
            colWidths: [10, 10, 10, 10, 10]
        })
        rows.forEach((mengikuti) => {
            table.push(
                [mengikuti.nom, mengikuti.nim, mengikuti.IDDOSEN, mengikuti.IDMATAKULIAH, mengikuti.NILAI]
            );
        })
        console.log(table.toString());
    }
    static detail(rows) {
        let table = new Table({
            head: ['Nom', 'matakuliah', 'NILAI']
        })
        rows.forEach((mengikuti) => {
            table.push(
                [mengikuti.nom, mengikuti.namamatakuliah, mengikuti.NILAI]
            );
        })
        console.log(table.toString());
    }
}