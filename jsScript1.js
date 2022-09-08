#!/usr/bin/env node

// import sort from "./sort.js"

const [,, ...args] = process.argv



for (let i = 0; i<args.length; i++) {
    let arg = args[i];

    if (arg == "param1") {
        console.log("something 1");
        continue
        }
        

    else if (arg == "param2") {
        console.log("something 2");
        continue
        }

    // let arr = arg.split(" ");

    // if (Array.isArray(arr)) {
    //     if (arr.length > 1) {
    //         let sorted = sort(arr).join(" ");
    //         console.log(sorted);
    //         continue 
    //     } else {
    //         console.log(`${arg} is unrecognized.`)
    //         continue
    //     }
        
    // }

    else {
        console.log(`Error: ${arg} is unrecognized.`)
        }
    }













      