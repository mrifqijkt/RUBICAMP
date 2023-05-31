import readline from "readline";


export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function line() {
    console.log('====================================================')
};

export function login() {
    line()
    console.log('Welcome to Universitas Indonesia')
    console.log('Jl.Jakarta Raya no.15')
    line()
}