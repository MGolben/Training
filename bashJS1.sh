#!/usr/bin/env bash


for arg
do

#echo "input is $arg" 

if [[ $arg == "param1" ]]; then
	#echo "output of JS script is: $( ./jsScript1.js param1 )"
    if [ "$( ./jsScript1.js param1 )"  == "something 1" ]; then
	    #echo "param1 test passed"
        continue
    else 
	    echo "param1 test failed"
        exit
    fi


elif [[ $arg == "param2" ]]; then
    #echo "output of js script is: $( ./jsScript1.js param2 )"
    if [ "$( ./jsScript1.js param2 )" == "something 2" ]; then
	    #echo "param2 test passed"
        continue
    else
	    echo "param2 test failed"
        exit
    fi


elif [[ $arg == "6 5 4 3 2 1" ]]; then
    #echo "output of js script is: $( ./jsScript1.js "6 5 4 3 2 1" )"
    if [ "$( ./jsScript1.js "6 5 4 3 2 1" )" == "1 2 3 4 5 6" ]; then
	    #echo "arr test passed"
        continue
    else
    	echo "arr test failed"
        exit
    fi

else 
    echo "${arg} is unrecognized. Test failed."
    exit

fi

done

echo "All tests passed."