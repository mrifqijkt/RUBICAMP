function spiralMatrix(n) {
  let result = [];
  let hitung = 0;

  for (let i = 0; i < n; i++) {
    result[i] = []
    for (let j = 0; j < n; j++) {
      result[i][j] = hitung;
      hitung++

    }
  }
  console.log(result[0])
}
spiralMatrix(5)