// Test cases
// "(multiply 1 1)" => 1
// "(multiply 0 (multiply 3 4))" => 0
// "(multiply 2 (multiply 3 4))" => 24
// "(multiply 3 (multiply (multiply 35 35) 3))" => 81
// "(add (add 1 2) (add 1 2))" => 6

const readlineSync = require('readline-sync');

// MODIFIED

// initial prompt
const getExp = () => {
    const exp = readlineSync.question('Enter an expression.  Expressions can have the following format:\n- Functions are "add" or "multiply"\n- Each function must be surrounded by parenthesis ()\n- Each function can take exactly 2 sub arguments\nExample:\n(add 1 2) -> Output 3\n:').replace(/add/g, ' +').replace(/multiply/g, ' *').split(' ')
    return exp
}

const calculator = (exp) => {
    let split = exp.join(' ').replace(')', ' ').split(' ')
    return eval((split[1] + split[0] + split [2]).toString())
}

const expressionFinder = (exp) => {
    while(exp.includes('(')) {
        let start = exp.lastIndexOf('('),
            end = exp.lastIndexOf('(')+4
        let evaluated = calculator(exp.slice(start+1, end))
        exp.splice(start, end-start, evaluated)
    }
    return parseInt(exp.toString())
}

const calcLoop = () => {
    let exp = getExp()
    let result = expressionFinder(exp)
    return result
}

console.log(calcLoop())







// ORIGINAL

// // initial prompt
// function getExp() {
//     const expRaw = readlineSync.question('Enter an expression.  Expressions can have the following format:\n- Functions are "add" or "multiply"\n- Each function must be surrounded by parenthesis ()\n- Each function can take exactly 2 sub arguments\nExample:\n(add 1 2) -> Output 3\n:')
//     const expSub = expRaw.substring(1, expRaw.length-1)
//     const exp = expSub.split('')
//     return exp
// }

// // evaluates the mathematical expression based on the array
// function evaluate(input){
//     const arr = input.join('').split(' ')
//     let result
//     if(arr[0] === 'add'){
//         result = parseInt(arr[1]) + parseInt(arr[2])
//     }
//     else {
//         result = parseInt(arr[1]) * parseInt(arr[2])
//     }
//     return result
// }

// // extracts innermost parenthesis and replaces it with the result of the evaluation
// function getInner(arr){
//     let copy = Array.from(arr)
//     const start = copy.lastIndexOf('(')
//     const end = copy.indexOf(')')
//     if(start === -1 || end === -1){
//         copy = evaluate(copy)
//     }
//     else{
//         const portion = copy.slice(start+1, end)
//         const result = evaluate(portion)
//         copy.splice(start, end-start+1, result)
//     }
//     return copy
// }

// // counts # of inner parenthesis
// function runCount(arr){
//     let count = arr.reduce((acc, cur)=>{
//         if(cur === '('){
//             acc ++
//         }
//         return acc
//     }, 0)
//     return count
// }

// const calcLoop = () => {
//     let exp = getExp()
//     const count = runCount(exp)
//     for(let i = 0; i <= count; i++){
//         exp = getInner(exp)
//     }
//     return exp
// }

// console.log(calcLoop())