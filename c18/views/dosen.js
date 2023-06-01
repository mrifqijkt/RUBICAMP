import Table from "cli-table";

export default class DosenVIew {

    static line() {
        console.log('====================================================')
    };
    static daftar(rows){
        let table = new Table({
            head: ['IDDOSEN', 'namadosen'],
            colWidths: [20, 20]
        });
        rows.forEach((dosen) => {
            table.push(
                [dosen.IDDOSEN, dosen.namadosen]
            );
        })
        console.log(table.toString());
    }
}