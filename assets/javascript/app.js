  // Initialize Firebase
var config = {
apiKey: "AIzaSyCVtp02rrdnWC-67n0wyjU-4dsoli42sJ0",
authDomain: "train-scheduler-e106b.firebaseapp.com",
databaseURL: "https://train-scheduler-e106b.firebaseio.com",
projectId: "train-scheduler-e106b",
storageBucket: "",
messagingSenderId: "685507848363"
};
firebase.initializeApp(config);

var database = firebase.database();

var train = "";
var dest = "";
var arrival = "";
var freq = "";

$("#submit").on("click", function(event) {
    event.preventDefault();
    train = $("#trainInput").val().trim();
    dest = $("#destInput").val().trim();
    arrival = $("#arrivalInput").val().trim();
    freq = $("#freqInput").val().trim();

    // Code for the push
    database.ref().push({
        train: train,
        dest: dest,
        arrival: arrival,
        freq: freq,   
    }); 
    resetPlaceHolder();   
});

function resetPlaceHolder(){
    train = $("#trainInput").val("Train Name");
    dest = $("#destInput").val("Destination");
    arrival = $("#arrivalInput").val("00:00");
    freq = $("#freqInput").val("00:00");
}

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().train);
    console.log(childSnapshot.val().dest);
    console.log(childSnapshot.val().arrival);
    console.log(childSnapshot.val().freq);

    // full list of items to the well
    $("tbody").append("<tr><td>" + childSnapshot.val().train + "</td><td>" + childSnapshot.val().dest + "</td><td>" + childSnapshot.val().arrival + "</td><td>" + childSnapshot.val().freq + "</td></tr>");
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});