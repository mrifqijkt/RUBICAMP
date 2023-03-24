//  const fs = require('fs');
//  const process = require('process');

//  const data = fs.readFileSync('data.json');
//  const taskData = JSON.parse(data);

 function addTask (){
     taskData.push({"task_id":null,"task_content":content,"status":false,"tag":[]})
     
     fs.writeFileSync(`data.json`,JSON.stringify(taskData, null,content,false,[]))
 }


 console.log(`>>> JS TODO <<<
 $ node todo.js list
 $ node todo.js <command>
 $ node todo.js task <task_id>
 $ node todo.js add <task_content>
 $ node todo.js delete <task_id>
 $ node todo.js <task_id>
 $ node todo.js uncomplete <task_id>
 $ node todo.js list:outstanding asc|desc
 $ node todo.js list:completed asc|desc
 $ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
 $ node todo.js filter:<tag_name>`)

//  switch (command) {
//      case "list":
//          console.log("Daftar Pekerjaan")
//          break;

//      default:
//          break;
//  }

