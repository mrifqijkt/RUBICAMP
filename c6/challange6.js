 function sentencesManipulation(sentence) {
   let vokal = ['a', 'i', 'u', 'e', 'o'];
   let kalimat  = sentence.split(' ');

   let text = [];

   for (let i = 0; i < kalimat.length; i++) {
    //console.log(kalimat)

    if  (kalimat[i].charAt(0) == vokal[0]) {
      text.push(kalimat[i])
    } else if  (kalimat[i].charAt(0) == vokal[1]){
      text.push(kalimat[i])
    } else if  (kalimat[i].charAt(0) == vokal[2]){
      text.push(kalimat[i])
    } else if  (kalimat[i].charAt(0) == vokal[3]){
      text.push(kalimat[i]) 
    } else if  (kalimat[i].charAt(0) == vokal[4]){
    } else {
      let konsonan = kalimat[i].substring(1) + kalimat[i].charAt(0) + 'nyo' 
      text.push(konsonan)
    }
   }
   console.log(text.join(' '));
 }
sentencesManipulation('ibu pergi ke pasar bersama aku')