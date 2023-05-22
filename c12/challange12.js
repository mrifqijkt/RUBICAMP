if (process.argv[2] !== 'data.json') {
    console.log(`tolong sertakan nama file sebagai inputan soal misalnya 'node solution.js data.json'`);
    process.exit();
} else {
    const readline = require('readline');
    const fs = require('fs');
    const content = fs.readFileSync('data.json');
    const obj = JSON.parse(content);

    let i = 0;
    let salah = 1;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Tebakan > '
    });


    function tebakKata() {
        console.log(`Selamat datang di permainan tebak kata. kamu akan di berikan pertanyaan dari file ini'data.json'.untukbermain,jawablah dengan jawaban yang sesuai.gunakan'skip' untuk menangguhkan pertanyaannya,dan di akhir pertanyaan akan ditanyakan lagi`);
        console.log(`Pertanyaan: ${obj[i].definition}`);
        rl.prompt();
        rl.on('line', function (answer) {
            if (answer.toLowerCase() == obj[i].term) {
                console.log('Jawaban anda benar')
                i++;
                salah = 1;
                if (i == obj.length) {
                    console.log('Selamat anda jadi Pemenang!!!');
                    process.exit();
                }
                console.log("Pertayaan: " + obj[i].definition);
                rl.prompt();
            }
            else if (answer.toLocaleLowerCase() == 'skip') {
                obj.push(obj[i]);
                i++
                console.log("Pertanyaan: " + obj[i].definition);
                rl.prompt();
            }
            else {
                console.log(`Wkwkwkwk anda kurang beruntung ${salah} kali`);
                salah++;
                rl.prompt();
            }
        });

    }

    tebakKata()
};
//tebaktebakan