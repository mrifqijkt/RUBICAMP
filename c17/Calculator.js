export const PI = 22 / 7

export  default class Calculator {
    constructor() {
        this.x = 1;
        return this;
    }
    add(value) {
        this.x += value;
        //  console.log(this.x);
        return this;
    }
    substract(value) {
        this.x -= value; 
        //  console.log(this.x);
        return this;
    }
    divide(value) {
        this.x /= value;
        return this;

    }
    multiply(value) {
        this.x *= value;
        return this;
    }
    square() {
        this.x = this.x ** 2;
        return this;
    }
    // tambahkan method lain yang perlu
    squareRoot () {
        this.x = Math.sqrt(this.x);
        return this;
    }
    exponent(pangkat) {
        this.x = Math.pow(this.x,pangkat);
        return this;
    }
    result() {
    console.log(this.x)

    }
}

// export function num(x,y) {
//     return x + y
    
// }

// export const PI = 22/7