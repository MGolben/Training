#!/usr/bin/python3


from sort import sort
import sys 

args = sys.argv[1:]


for arg in args:

    # print(type(arg), arg);

    if arg == "param1":
        print("something 1")
        continue
    
    elif arg == "param2":
        print("something 2")
        continue
    
    targ = arg.split(" ");

    if type(targ) == list:
        if len(targ) > 1:
            sortedArr = sort(targ)
            joined = " ".join(sortedArr)
            print(joined)
            continue
        else:
            print("{this} is unrecognized.".format(this=targ))

    else:
        print("{this} is unrecognized.".format(this=targ))
