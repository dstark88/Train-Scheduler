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

window.addEventListener("load", function() {
    var clock = document.querySelector(".clock");

    this.setInterval(function() {
        var now = moment();
        var visibleTime = now.format('MMM-DD-YYYY, LTS');
        clock.textContent = visibleTime;
    },1000)
})

$("#submit").on("click", function(event) {
    event.preventDefault();
    var train = $("#trainInput").val().trim();
    var dest = $("#destInput").val().trim();
    var freq = $("#freqInput").val().trim();
    var arrival = $("#arrivalInput").val().trim();

    // Code for the push
    var nextTrain = {
        train: train,
        dest: dest,
        freq: freq, 
        arrival: arrival,
    }; 

    database.ref().push(nextTrain);

    console.log(nextTrain.train);
    console.log(nextTrain.dest);
    console.log(nextTrain.freq);
    console.log(nextTrain.arrival);
    console.log(nextTrain);

    train = $("#trainInput").val("");
    dest = $("#destInput").val("");
    freq = $("#freqInput").val("");
    arrival = $("#arrivalInput").val("00:00");
    newTrain = $("newTrainInput").val(":00");
    
    resetPlaceHolder();   
});

function resetPlaceHolder(){
    train = $("#trainInput").val("");
    dest = $("#destInput").val("");
    freq = $("#freqInput").val("");
    arrival = $("#arrivalInput").val("00:00");
}

// Firebase watcher + initial loader 
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    // Log everything that's coming out of snapshot
    var train = childSnapshot.val().train;
    var dest = childSnapshot.val().dest;
    var freq = childSnapshot.val().freq;
    var arrival = childSnapshot.val().arrival;
    
    var firstTimeConverted = moment(arrival, "HH:mm").subtract(1, "years").format("MM/DD/YYYY HH:mm:ss");
        console.log(firstTimeConverted, "firstTimeConverted");
    var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("hh:mm"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("Difference in time: " + diffTime);
    var tRemainder = diffTime % freq;
        console.log(tRemainder);
    var tMinutesNext = freq -tRemainder;
        console.log("Minutes to next train" + tMinutesNext);
    var nextTrain = moment().add(tMinutesNext, "minutes");
        console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));
    
    $("tbody").append("<tr><td>" + childSnapshot.val().train + "</td><td>" + childSnapshot.val().dest + "</td><td>" + childSnapshot.val().freq + "</td><td>" + moment(nextTrain).format("LT") + "</td><td>" + tMinutesNext + "</td><>tr>");
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
