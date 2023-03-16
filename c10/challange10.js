const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tulis Kalimatmu disini> ',
});

rl.prompt();

rl.on('line', (line) => {
    function sentencesManipulation(line) {
        let vokal = ['a', 'i', 'u', 'e', 'o'];
        let kalimat = line.split(' ');

        let text = [];

        for (let i = 0; i < kalimat.length; i++) {
            //console.log(kalimat)

            if (kalimat[i].charAt(0) == vokal[0]) {
                text.push(kalimat[i])
            } else if (kalimat[i].charAt(0) == vokal[1]) {
                text.push(kalimat[i])
            } else if (kalimat[i].charAt(0) == vokal[2]) {
                text.push(kalimat[i])
            } else if (kalimat[i].charAt(0) == vokal[3]) {
                text.push(kalimat[i])
            } else if (kalimat[i].charAt(0) == vokal[4]) {
            } else {
                let konsonan = kalimat[i].substring(1) + kalimat[i].charAt(0) + 'nyo'
                text.push(konsonan)
            }
        }
        return text.join(' ');
    }
    console.log('Hasil Konversi:', sentencesManipulation(line))

    rl.prompt();
}).on('close', () => {
    console.log('Good bye!');
    process.exit(0);
});
