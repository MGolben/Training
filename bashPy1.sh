#!/usr/bin/env bash


for arg 
do

echo "input is $arg" 

if [[ $arg == "param1" ]]; then
        echo "output of Py script is: $( ./PS.py param1 )"
	if [ "$( ./PS.py param1 )" == "something 1" ]; then

		echo "param1 test passed"
	else
		echo "param1 test failed"
	fi

elif [[ $arg == "param2" ]]; then
        echo "output of Py script is: $( ./PS.py param2 )"
        if [ "$( ./PS.py param2 )" == "something 2" ]; then

                echo "param2 test passed"
        else
                echo "param2 test failed"
        fi


elif [[ $arg == "6 5 4 3 2 1" ]]; then
        echo "output of Py script is: $( ./PS.py "6 5 4 3 2 1" )"
        if [ "$( ./PS.py "6 5 4 3 2 1" )" == "1 2 3 4 5 6" ]; then

                echo "arr test passed"
        else
                echo "arr test failed"
        fi

else 
        echo "${arg} is unrecognized"
fi

done