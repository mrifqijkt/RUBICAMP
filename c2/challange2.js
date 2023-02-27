 function deretkaskus (n) {
     const answer = []
    
     for (let i = 3; i <= 3*n; i+=3){
         if (i % 5 == 0 && i % 6 == 0)
             answer.push("KASKUS")
         else if (i % 5 == 0)
             answer.push("KAS")
         else if (i % 6 == 0)
             answer.push("KUS")
         else
             answer.push(i)
     }
    
     return answer
};

console.log(deretkaskus(10))