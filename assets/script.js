

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
    var firstTime = moment($("#first-time").val().trim(), "hh:mm").format("hh:mm");
    var frequency = $("#frequency").val().trim();

  
    // Creates local object for storing train data
    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency
    };
  
    // Uploads train data to firebase
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
  
  // 3. Create Firebase event for adding traindata to the database and a row in the html when a user adds a train
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTime;
    var frequency = childSnapshot.val().frequency;
    var currTime = moment().format("hh:mm");
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

    // Next Train
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    

    // Train info
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);
    console.log(currTime);
    console.log(firstTimeConverted);
    console.log("DIFFERENCE IN TIME: " + diffTime)
    console.log(tRemainder);
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

     // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)
    
  );

   //Apend current time above the table
   $("#current-time").text("This is the current time: " + currTime)

  // Append the new row to the table
  $("#listOfTrains > tbody").append(newRow);

});
  
  