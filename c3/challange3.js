
function romawi (n) {

  let number = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
  let romawi  = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD","D", "CM", "M"];
  let result = "";



  for(let i = number.length; n > 0; i--){
    while(n >= number[i]){
      result += romawi[i];
      n -= number[i];
    }
  }

  return result;

} 
  console.log('Script Testing untuk Konversi Romawi\n');
  console.log('input | expected | result');
  console.log('______|__________|_______');
  console.log('4     | IV       | ', romawi(4));
  console.log('9     | IX       | ', romawi(9));
  console.log('13    | XIII     | ', romawi(13));
  console.log('1453  | MCDLIII  | ', romawi(1453));
  console.log('1646  | MDCXLVI  | ', romawi(1646));