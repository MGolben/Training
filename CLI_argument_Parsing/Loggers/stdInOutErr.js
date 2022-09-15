#!/usr/bin/env node



// Primary website for reference: https://blog.logrocket.com/using-stdout-stdin-stderr-node-js/#:~:text=stdout%20(1)%3A%20The%20standard,diagnostics%20issued%20by%20the%20program)






//------------- Fundamental stdin/stdout returning the input text upper case on the next line 
// process.stdin.on("data", data => {
//     data = data.toString().toUpperCase()
//     process.stdout.write(data + "\n")
// })

// console.log can take the place of process.stdout.write() 
// Note: it is recommended that either or be used exclusively as can otherwise lead to 'buffering problems' 

// process.stdin.on("data", data => {
//     data = data.toString().toUpperCase()
//     console.log(data)
// })

// ------------- Using 'Readline' to get stdin stdout. Below performs the same function as above.
// Instantiate the read/write line to rl
// const readline = require("readline")

// const rl = readline.createInterface({
//     input: process.stdin, 
//     output: process.stdout,
// })

// rl.on('line', (line) => {
//     line = line.toUpperCase()
//     console.log(line);
// });


// ---------------- Nonfunctioning Function 
// Create function with a recursive loop of which writing 'q' exits...
// function ask(question) {
//     rl.question(question, (answer) => {
//         if(answer === "q") {
//             process.exit(1)
//         }
//         rl.write(`The answer received:  ${answer}\n`)

//         ask(question)
//     })}


