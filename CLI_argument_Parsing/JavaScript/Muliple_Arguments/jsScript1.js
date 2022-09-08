#!/usr/bin/env node


// This is a simple Command Line Interface JS script that takes multiple arguments and evalutes either 'param1' to 'something 1', 'param2' to 'something 2', and/or sorts an array.




import sort from "../sort.js"

const [,, ...args] = process.argv

const alen = args.length;



if (alen === 0) {
	console.log("Please use 'jsScript1.js' [param1|param2|array]");
	}


for (let i = 0; i<args.length; i++) {
    let arg = args[i];

    if (arg == "param1") {
        console.log("something 1");
        continue
        }
        

     if (arg == "param2") {
        console.log("something 2");
        continue
        }
   
     if (arg.indexOf(" ") >= 0) {
	let arr = arg.split(" ");
	
	if (Array.isArray(arr)) {
	         let sorted = sort(arr).join(" ");
	         console.log(sorted); 
     		 continue 
        	 } 
	else {
	         console.log(`${arg} is unrecognized.`)
		 break
		}
        
	}
}
process.exit();