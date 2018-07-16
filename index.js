const readlineSync = require('readline-sync');

// initial prompt
function getExp() {
    const expRaw = readlineSync.question('Enter an expression.  Expressions can have the following format:\n- Functions are "add" or "multiply"\n- Each function must be surrounded by parenthesis ()\n- Each function can take exactly 2 sub arguments\nExample:\n(add 1 2) -> Output 3\n:')
    const expSub = expRaw.substring(1, expRaw.length-1)
    const exp = expSub.split('')
    return exp
}

// evaluates the mathematical expression based on the array
function evaluate(input){
    const arr = input.join('').split(' ')
    let result
    if(arr[0] === 'add'){
        result = parseInt(arr[1]) + parseInt(arr[2])
    }
    else {
        result = parseInt(arr[1]) * parseInt(arr[2])
    }
    return result
}

// extracts innermost parenthesis and replaces it with the result of the evaluation
function getInner(arr){
    let copy = Array.from(arr)
    const start = copy.lastIndexOf('(')
    const end = copy.indexOf(')')
    if(start === -1 || end === -1){
        copy = evaluate(copy)
    }
    else{
        const portion = copy.slice(start+1, end)
        const result = evaluate(portion)
        copy.splice(start, end-start+1, result)
    }
    return copy
}

// counts # of inner parenthesis
function runCount(arr){
    let count = arr.reduce((acc, cur)=>{
        if(cur === '('){
            acc ++
        }
        return acc
    }, 0)
    return count
}

function calcLoop(){
    let exp = getExp()
    const count = runCount(exp)
    for(let i = 0; i <= count; i++){
        exp = getInner(exp)
    }
    return exp
}

console.log(calcLoop())