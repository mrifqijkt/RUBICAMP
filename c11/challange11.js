const readline = require('readline');

const fs = require('fs');
const content = fs.readFileSync('data.json');
const obj = JSON.parse(content);

let i = 0;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tebakan > '
});

function tebakKata() {
    console.log('Selamat datang di permainan tebak kata, silahkan isi dengan jawaban yang benar ya! ');
    console.log(`Pertanyaan: ${obj[i].definition}`);
    rl.prompt();
    rl.on('line', function (answer) {
        if (answer.toLowerCase() == obj[i].term) {
            console.log('Jawaban anda benar')
            i++;

            if (i == obj.length) {
                console.log('Selamat anda jadi Pemenang!!!');
                process.exit();
            }
            console.log("Pertayaan: " + obj[i].definition);
            rl.prompt();
        }
        else {
            console.log('Wkwkwkwk anda kurang beruntung');
            rl.prompt();
        }
    });

}

tebakKata()