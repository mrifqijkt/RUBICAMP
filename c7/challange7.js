function weirdMultiply(sentence) {
    let string = sentence.toString()
    let str = string.split("")
    let result = 1

    if (str.length === 1) {
        return string
    } else {

        for (let i = 0; i < str.length; i++) {
            result *= str[i]

        }
        return weirdMultiply(result)
    }

}
console.log(weirdMultiply(39))
console.log(weirdMultiply(999))
console.log(weirdMultiply(3))


// let number = 39
// let string = number.toString()
// let str = string.split("")

// let result = 1

// for (let i = 0; i < str.length; i++){
//     result *= str[i]
// }
// console.log(result)