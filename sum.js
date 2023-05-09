const params = process.argv;

const fs = require('fs');
const todos = JSON.parse(fs.readFileSync("todo.json", "utf-8"));


switch (params[2]) {
    case "list":
        console.log("Daftar Pekerjaan :");
        todos.forEach((task, index) => {
            console.log(`${index + 1}. ${task.complete ? '[X]' : '[ ]'} ${task.title}`);
        });
        break;

    case "add":
        todos.push({ title: process.argv.slice(3).join(" "), complete: false });
        fs.writeFileSync("todo.json", JSON.stringify(todos, null, 3), "utf-8");
        console.log(`\"${process.argv.slice(3).join(" ")}"\ ` + "telah ditambahkan");
        break;

    case "delete":
        let penghapus = [];
        for (let i = 0; i < todos.length; i++) {
            penghapus.push(todos[i].title)
        }
        todos.shift({ title: process.argv.slice(3).join(" "), complete: false });
        fs.writeFileSync("todo.json", JSON.stringify(todos, null, 3), "utf-8");
        console.log(`\"${penghapus[0]}"\ ` + "telah dihapus dari daftar");
        break;

    case "complete":
        todos.forEach(selesai => {
            if (selesai.complete == false) {
                selesai.complete = true;
                fs.writeFileSync("todo.json", JSON.stringify(todos, null, 3), "utf-8");
                console.log(`\"${selesai.title}"\ ` + "telah selesai");
            }
        });
        break;

    case "uncomplete":
        todos.forEach(selesai => {
            if (selesai.complete == true) {
                selesai.complete = false;
                fs.writeFileSync("todo.json", JSON.stringify(todos, null, 3), "utf-8");
                console.log(`\"${selesai.title}"\ ` + "status selesai dibatalkan");
            }
        });
        break;

    case "list:outstanding_asc":
        console.log("Daftar Pekerjaan :");
        todos.forEach((listBelom, nom) => {
            if (listBelom.complete == false) {
                console.log(`${nom + 1}. ${listBelom.complete ? '[X]' : '[ ]'} ${listBelom.title}`);
            }
        })
        break;

    case "list:completed_desc":
        console.log("Daftar Pekerjaan :");
        todos.forEach((listUdah, num) => {
            if (listUdah.complete == true) {
                console.log(`${num + 1}. ${listUdah.complete ? '[X]' : '[ ]'} ${listUdah.title}`);
            }
        });
        break;

    case "tag_1":
        todos[0].tag = process.argv.slice(3).join(" ")
        fs.writeFileSync("todo.json", JSON.stringify(todos, null, 3), "utf-8");
        console.log("Tag" + ` \"${process.argv.slice(3).join()}"\ ` + "telah ditambahkan ke daftar" + ` \"${todos[0].title}"\ `);
        break;

    case "filter:":
        console.log("Daftar Pekerjaan :");
        todos.forEach((filter, no) => {
            if (filter.tag == "masak sayur") {
                console.log(`${no + 1}. ${filter.complete ? '[X]' : '[ ]'} ${filter.title}`);
            }
        });
        break;

    default:
        let str = "$ node todo.js";
        let comma = "<task_id>";
        console.log(">>> JS TODO <<<")
        console.log(`${str} <command>`);
        console.log(`${str} list`);
        console.log(`${str} task ${comma}`);
        console.log(`${str} add <task_content>`);
        console.log(`${str} delete ${comma}`);
        console.log(`${str} complete ${comma}`);
        console.log(`${str} uncomplete ${comma}`);
        console.log(`${str} list:outstanding asc|desc`);
        console.log(`${str} list:completed asc|desc`);
        console.log(`${str} tag ${comma} <tag_name_1> <tag_name_2> ... <tag_name_N>`);
        console.log(`${str} filter:<tag_name>`);
        break;
}