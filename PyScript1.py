#!/usr/bin/env python3

# This is a simple Pyhton script that takes multiple arguments and evaluates 

from sort import sort
import sys 

args = sys.argv[1:]


if len(args) == 0:
    print("please use 'PyScript1.py' [param1|param2|array]")
    exit

for arg in args:

    if arg == "param1":
        print("something 1")
        continue
    
    if arg == "param2":
        print("something 2")
        continue
    
    if arg.find(" ") != -1:
        targ = arg.split(" ");
        sortedArr = sort(targ)
        joined = " ".join(sortedArr)
        print(joined)
        continue

    else:
        print("{this} is unrecognized.".format(this=arg))
        break