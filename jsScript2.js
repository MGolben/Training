#!/usr/bin/env node

// "This is a simple Command Line Interface example that evaluates one argument. The argument can be either 'param1' that evaluates to 'something 1' or 'param2' that evaluates to 'something 2'"  

import sort from "./sort.js"
const [,, ...args] = process.argv;
let alen = args.length;

if (alen !== 1) {
    console.log("please use 'jsScript2.js' [param1|param2|6 5 4 3 2 1]");  
    process.exit()
    } 

let arg = args[0]

if (arg == "param1") {
    console.log("something 1")
    process.exit()
}

if (arg == "param2") {
    console.log("something 2")
    process.exit()
}

if (arg.indexOf(" ") >= 0) {
    let arr = arg.split(" ");
    if (Array.isArray(arr)) {
        let sorted = sort(arr).join(" ")
        console.log(sorted)
        process.exit()
    }
}


console.log(`${arg} is not recognized, please input |param1|param2|array`)

