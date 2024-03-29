import Table from "cli-table";

export default class JurusanView {

    static line() {
        console.log('====================================================')
    };

    static daftar(rows){
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

    }
}