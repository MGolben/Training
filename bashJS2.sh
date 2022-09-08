#!/bin/bash


if [[ $1 == "param1" ]]; then
	#echo "output of JS script is: $( ./jsScript2.js param1 )"
    if [ "$( ./jsScript2.js param1 )"  == "something 1" ]; then
        echo "Test passed"
    else 
	    echo "param1 test failed"
    fi


elif [[ $1 == "param2" ]]; then
    #echo "output of js script is: $( ./jsScript2.js param2 )"
    if [ "$( ./jsScript2.js param2 )" == "something 2" ]; then
	    echo "Test passed"
    else
	    echo "param2 test failed"
    fi

else 
    echo "${1} is unrecognized. Test failed."

fi

