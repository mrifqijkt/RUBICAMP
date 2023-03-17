const readline = require('readline');

const fs = require('fs')
const content = fs.readFileSync('data.json')
const object = JSON.parse(content)


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tebakan> ',
});
function tebakKata() {
    console.log('Selamat datang di permainan tebak kata,silahkan isi dengan jawaban yang benar ya!');
    console.log(`Pertanyaan:${object.definiton}`);
    rl.prompt();
    rl.on('line',function(answer){
        if(answer == object.term){
            console.log('Jawaban anda benar!')
        }
    })
}



tebakKata()
