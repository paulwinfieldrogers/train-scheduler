// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4.Create  way to calculate the next arrival and minutes away.   Use moment.js to calc.
//    Then use moment.js formatting to set difference in months.
// 

// 1. Initialize Firebase



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBV7RMHzoNWiRTs-HqMRsSbvDzFHK4QvHc",
    authDomain: "train-schedule-98b46.firebaseapp.com",
    databaseURL: "https://train-schedule-98b46.firebaseio.com",
    projectId: "train-schedule-98b46",
    storageBucket: "train-schedule-98b46.appspot.com",
    messagingSenderId: "677076641444" 

  };

  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();//prevent form from refreshing
  
    // Get user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTime = moment($("#first-time").val().trim(), "MM/DD/YYYY").format("X");
    var frequency = $("#frequency").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);
  
    alert("New train added");
  
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-time").val("");
    $("#frequency").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds a train
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;


    // Train info
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);
  
    
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(firstTime),
      $("<td>").text(frequency),
      
    );
  

    // Append the new row to the table
    $("#trains-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  
  
  
  

  
    // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    /*var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    */
  
