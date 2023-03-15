// function spiralMatrix(n) {
//   let result = [];
//   let hitung = 0;

//   for (let i = 0; i < n; i++) {
//     result[i] = []
//     for (let j = 0; j < n; j++) {
//       result[i][j] = hitung;
//       hitung++

//     }

//   }
//   console.log(result[0])
// }
// spiralMatrix(5)

let size = 5
const matrix = []
let hitung = 0
for (let i = 0; i < size; i++) {
  matrix[i] = []
  for (let j = 0; j < size; j++) {
    matrix[i][j] = hitung
    hitung++
  }

}
console.log(matrix)

console.log(matrix[0][0])
console.log(matrix[0][1])
console.log(matrix[0][2])
console.log(matrix[0][3])
console.log(matrix[0][4])
console.log(matrix[1][4])
console.log(matrix[2][4])
console.log(matrix[3][4])
console.log(matrix[4][4])
console.log(matrix[4][1])
console.log(matrix[4][2])
console.log(matrix[4][3])
console.log(matrix[4][4])




//kanan
// for (let x = 0; x < size; x++) {
//   console.log[x]

// }
// for (let y = 0; x < size; y++) {
//   console.log[y][x]

// }