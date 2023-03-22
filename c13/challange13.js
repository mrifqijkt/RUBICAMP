const readline = require('readline');
const fs = require('fs');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,


});
switch (command) {
    case value:
        
        break;

    default:
        console.log(">>> JS TODO <<<");
        console.log("$ node todo.js list");
        console.log("$ node todo.js <command>");
        console.log("$ node todo.js task <task_id>");
        console.log("$ node todo.js add <task_content>");
        console.log("$ node todo.js delete <task_id>");
        console.log("$ node todo.js <task_id>");
        console.log("$ node todo.js uncomplete <task_id>");
        console.log("$ node todo.js list:outstanding asc|desc");
        console.log("$ node todo.js list:completed asc|desc");
        console.log("$ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>")
        console.log("$ node todo.js filter:<tag_name>");
        break;
}

        