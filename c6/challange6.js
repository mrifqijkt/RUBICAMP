function sentencesManipulation(sentence) {
  let vokal = ['a', 'i', 'u', 'e', 'o'];
  let variabel = sentence.charAt(0)
   
  if  (variabel == vokal[0]) {
    return sentence
  } else if  (variabel == vokal[1]){
    return sentence
  } else if  (variabel == vokal[2]){
    return sentence
  } else if  (variabel == vokal[3]){
    return sentence
  } else if  (variabel == vokal[4]){
  } else {    
    return sentence.substr(1) + variabel + 'nyo'
 }
};
console.log(sentencesManipulation('ibu'),sentencesManipulation('pergi'),sentencesManipulation('ke'),sentencesManipulation('pasar'), sentencesManipulation('bersama'),sentencesManipulation('aku'))



/*function sentencesManipulation(sentence) {
  let variasi = sentence.charAt(0)
  let huruf = sentence[0]
       
  switch (huruf) {
      case "a":
      case "i" :
      case "u" :
      case "e" :
      case "o" :
          return sentence;
          break;
      default:
         console.log((sentence.substr(1) + variasi + 'nyo'))
         break;
  }

};

sentencesManipulation('ibu pergi ke pasar bersama aku')*/