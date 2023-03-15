function spiral(size) {
  const matrix = []
  let hitung = 0

  for (let i = 0; i < size; i++) {
    matrix[i] = []
    for (let j = 0; j < size; j++) {
      matrix[i][j] = hitung
      hitung++
    }

  }
  // console.log(matrix)

  // console.log(matrix[0][0])
  // console.log(matrix[0][1])
  // console.log(matrix[0][2])
  // console.log(matrix[0][3])
  // console.log(matrix[0][4])
  // console.log(matrix[1][4])
  // console.log(matrix[2][4])
  // console.log(matrix[3][4])
  // console.log(matrix[4][4])
  // console.log(matrix[4][1])
  // console.log(matrix[4][2])
  // console.log(matrix[4][3])
  // console.log(matrix[4][4])
  // console.log(matrix[3][0])
  // console.log(matrix[2][0])
  // console.log(matrix[1][0])

  let x = 0
  let y = 0
  let batasAtas = size
  let batasBawah = 0
  let result = []
  while (result.length < size * size) {

    //kanan
    for (; x < batasAtas; x++) {
      //console.log(y,x)
      result.push(matrix[y][x])

    }
    x--
    y++

    //bawah
    for (; y < batasAtas; y++) {
      //console.log(y,x)
      result.push(matrix[y][x])
    }

    //kiri
    y--
    x--
    for (; x >= batasBawah; x--) {
      // console.log(y,x)
      result.push(matrix[y][x])
    }

    //atas
    x++
    y--
    for (; y > batasBawah; y--) {
      // console.log(y,x)
      result.push(matrix[y][x])
    }
    x++
    y++
    batasAtas--
    batasBawah++
  }
  console.log(result)
}
spiral(5)
spiral(6)
spiral(7)