function stringManipulation(word) {
  let vokal = ['a', 'i', 'u', 'e', 'o'];
  let variabel = word.charAt(0)
   
  if  (variabel == vokal[0]) {
    console.log(word)
  } else if  (variabel == vokal[1]){
    console.log(word)
  } else if  (variabel == vokal[2]){
    console.log(word)
  } else if  (variabel == vokal[3]){
    console.log(word)
  } else if  (variabel == vokal[4]){
  } else {
    console.log(word.substring(1)+ variabel + 'nyo')
  }
};

stringManipulation('ayam');
stringManipulation('bebek');