function pola(str) {
   let string = str.split(" ")

   for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
         let num1 = string[0].replace("#",i)
         let num2 = string[4].replace("#",j)
         if (string[2] * num1 == num2 ) {
            return[i,j]
         }
      }
   }
}
console.log(pola("42#3 * 188 = 80#204"));
console.log(pola("8#61 * 895 = 78410#5"));