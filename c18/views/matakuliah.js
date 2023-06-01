import Table from "cli-table";

export default class MatakuliahView {

    static line() {
        console.log('====================================================')
    };
    static daftar(rows) {
        let table = new Table({
            head: ['IDMATAKULIAH', 'namamatakuliah', 'sks'],
            colWidths: [20, 20, 20]
        });
        rows.forEach((matakuliah) => {
            table.push(
                [matakuliah.IDMATAKULIAH, matakuliah.namamatakuliah, matakuliah.sks]
            );
        })
        console.log(table.toString());
    }
}