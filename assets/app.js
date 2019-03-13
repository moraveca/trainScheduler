// Initialize Firebase
var config = {
    apiKey: "AIzaSyAohzu9xx6300U-MKVs5ona6Q1HfASOUFI",
    authDomain: "trainscheduling-e6735.firebaseapp.com",
    databaseURL: "https://trainscheduling-e6735.firebaseio.com",
    projectId: "trainscheduling-e6735",
    storageBucket: "trainscheduling-e6735.appspot.com",
    messagingSenderId: "987547213566"
};
firebase.initializeApp(config);

var database = firebase.database();

// getting page ready for any clicks later
$(document).ready(function () {

    // running function submitTrian on click of the submit button
    $(document).on("click", "#submitTrain", submitTrain);

    // this function takes values and stores them in firebase once submit button is clicked
    function submitTrain() {
        // prevent a page reload
        event.preventDefault();
        // grabs info submitted and stores them in variables
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#startTime").val().trim();
        var frequency = $("#frequency").val().trim();
        // creates a variable that stores info in firebase friendly form
        var newTrain = {
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        }
        // pushes all the info into firebase
        database.ref().push(newTrain);

        console.log(newTrain.trainName);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrain);
        console.log(newTrain.frequency);
        // clears the input boxes after submitting
        $("#trainName").val("");
        $("#destination").val("");
        $("#startTime").val("");
        $("#frequency").val("");
    };

    // When database is added to, grab that info:
    database.ref().on("child_added", function(childSnapshot) {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val());
        console.log(childSnapshot.key)

        // makes variable equal to right now in military time
        var now = moment().format("HH:mm");
        console.log("now", now);

        // making variables grabbed from firebase
        var frequency = childSnapshot.val().frequency;
        var firstTrain = childSnapshot.val().firstTrain;

        // calculates time between now and the time the first train left
        var a = moment();
        var b = moment(firstTrain, "HH:mm");
        var trainDiff = a.diff(b, 'minutes')
        console.log("trainDiff: ", trainDiff);

        // finds remainder of minutes left using total time from now to first train and the frequency of the train
        var minUntilNext = trainDiff % frequency;
        console.log("minUntilNext: ", minUntilNext);

        // uses moment to find time of next train by adding remainder of minutes to now
        var nextTrain = moment().add(minUntilNext, 'm').format("HH:mm");
        console.log("nextTrain: ", nextTrain)

        // This next section makes a card that stores the snapshot information and puts it into a card.
        var cardFeature = $("<div>");
        cardFeature.addClass("card-header");
        cardFeature.html("<i class='fas fa-train'></i> Train: " + childSnapshot.val().trainName);

        var trainDest = $("<li>");
        trainDest.addClass("list-group-item");
        trainDest.text("Destination: " + childSnapshot.val().destination);

        // I initially displayed this next section, but took it out. Here if I need it.
        // var startTrain = $("<li>");
        // startTrain.addClass("list-group-item");
        // startTrain.text("First train of the day leaves at: " + firstTrain);

        var trainInterval = $("<li>");
        trainInterval.addClass("list-group-item");
        trainInterval.text("Leaves every " + frequency + " minutes.");

        var upcomingTrain = $("<li>");
        upcomingTrain.addClass("list-group-item");
        upcomingTrain.text("The next train departs at " + nextTrain + ".");

        var deleteButton = $("<a>");
        deleteButton.addClass("btn btn-danger");
        deleteButton.attr("id", "removeButton");
        deleteButton.attr("key-value", childSnapshot.key)
        deleteButton.text("Remove Train");

        var trainList = $("<ul>");
        trainList.addClass("list-group list-group-flush");
        trainList.append(trainDest);
        // trainList.append(startTrain);
        trainList.append(trainInterval);
        trainList.append(upcomingTrain);
        trainList.append(deleteButton);

        var newTrainCard = $("<div>");

        newTrainCard.addClass("card");
        newTrainCard.attr("style", "width: 18rem");
        newTrainCard.append(cardFeature);
        newTrainCard.append(trainList);

        // This displays the card on the page.
        $("#card-holder").append(newTrainCard);


        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    // when remove button is clicked, do removeTrain function
    $(document).on("click", "#removeButton", removeTrain);

    // removes train data from Firebase
    function removeTrain() {

    }














})