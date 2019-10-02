$(document).ready(function () {

    // FireBase config
    var firebaseConfig = {
        apiKey: "AIzaSyA1QNXZdwlrJAgXgqZ5IGu6z160bJ7bHq4",
        authDomain: "train-activity-a66b3.firebaseapp.com",
        databaseURL: "https://train-activity-a66b3.firebaseio.com",
        projectId: "train-activity-a66b3",
        storageBucket: "",
        messagingSenderId: "633562000201",
        appId: "1:633562000201:web:1a8981f8ee070e46c8c898"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    // Global Variables
    var trainName = "";
    var destination = "";
    var trainTime = 0;
    var frequency = 0;

    // submit button on click push user input to backend
    $('#submit-button').on('click', function (event) {
        // prevent default form submit refresh of webpage
        event.preventDefault();

        trainName = $('#train-name').val().trim();
        destination = $('#destination').val().trim();
        trainTime = $('#train-time').val().trim();
        frequency = $('#frequency').val().trim();

        // push to firebase
        database.ref().push({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        })

        // clear user input fields
        $('#train-name').val('');
        $('#destination').val('');
        $('#train-time').val('');
        $('#frequency').val('');
    });

    database.ref().on('child_added', function (snapshot) {
        // shorthand
        var snapV = snapshot.val();

        // console logs
        console.log(snapV.trainName);
        console.log(snapV.destination);
        console.log(snapV.trainTime);
        console.log(snapV.frequency);

        trainTime = parseInt(snapV.trainTime)
        frequency = parseInt(snapV.frequency)

        // math
        var timeLeft = moment().diff(moment.unix(trainTime), "minutes") % frequency;
        var minutesAway = frequency - timeLeft;
        var nextArrival = moment().add(minutesAway, "m").format("hh:mm A");

        // Push to HTML
        var newRow = $('<tr>').append(
            $('<td>').text(snapV.trainName),
            $('<td>').text(snapV.destination),
            $('<td>').text(snapV.frequency),
            $('<td>').text(nextArrival),
            $('<td>').text(minutesAway)
        );

        $('#train-input').prepend(newRow);
    })
})