#!/usr/bin/env bash


if [[ $# == 0 ]]; then
    echo "$( ./jsScript2.js )" 
    exit
    fi


if [[ $1 == "param1" ]]; then
	#echo "output of JS script is: $( ./jsScript2.js param1 )"
    if [ "$( ./jsScript2.js param1 )"  == "something 1" ]; then
        echo "Test passed"
        exit
    else 
	    echo "param1 test failed"
        exit
    fi


elif [[ $1 == "param2" ]]; then
    #echo "output of js script is: $( ./jsScript2.js param2 )"
    if [ "$( ./jsScript2.js param2 )" == "something 2" ]; then
	    echo "Test passed"
        exit
    else
	    echo "param2 test failed"
        exit
    fi


elif [[ $1 == "6 5 4 3 2 1" ]]; then
    #echo "output of js script is: $( ./jsScript2.js "6 5 4 3 2 1" )"
    if [ "$( ./jsScript2.js "6 5 4 3 2 1" )" == "1 2 3 4 5 6" ]; then
	    echo "Test passed"
        exit
    else
    	echo "arr test failed"
        exit
    fi


else 
    echo "${1} is unrecognized. Test failed."
    exit
fi

