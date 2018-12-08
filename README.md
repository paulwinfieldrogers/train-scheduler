This project can be found on:

https://paulwinfieldrogers.github.io/train-scheduler/.

This project used:
The languages: HTML, CSS, JavaScript and Jquery
The libraries: Bootstrap and moment.js
The API: Firebase

It follows the narrative:

The user is prompted to enter a Train Name, a Destination and a First Train Time and the train frequency.  This is then stored in a table to be displayed to the user which calculates the train schedule.

When the Submit button is clicked the train data is sent to firebase and stored. Then the Jquery appends the desired html elements to the page and sets the values to the values that have been stored in Firebase.  moment.js is used to convert the time stamp for trains and the current time to the desired format.  moment.js is also used to calculate the time until the next train based on the frequency and the time when the 1st train was sceduled to arrive.
