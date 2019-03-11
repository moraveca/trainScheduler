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

        event.preventDefault();

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#startTime").val().trim();
        var frequency = $("#frequency").val().trim();

        var newTrain = {
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        }

        database.ref().push(newTrain);

        console.log(newTrain.trainName);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrain);
        console.log(newTrain.frequency);

        $("#trainName").val("");
        $("#destination").val("");
        $("#startTime").val("");
        $("#frequency").val("");



    };

    // When database is added to, grab that info:
    database.ref().on("child_added", function(childSnapshot) {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val());

        // This next section makes a card that stores the snapshot information and puts it into a card.
        var cardFeature = $("<div>");
        cardFeature.addClass("card-header");
        cardFeature.text(childSnapshot.val().trainName);

        var trainDest = $("<li>");
        trainDest.addClass("list-group-item");
        trainDest.text(childSnapshot.val().destination);

        var startTrain = $("<li>");
        startTrain.addClass("list-group-item");
        startTrain.text(childSnapshot.val().firstTrain);

        var trainInterval = $("<li>");
        trainInterval.addClass("list-group-item");
        trainInterval.text(childSnapshot.val().frequency);

        var trainList = $("<ul>");
        trainList.addClass("list-group list-group-flush");
        trainList.append(trainDest);
        trainList.append(startTrain);
        trainList.append(trainInterval);


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



    // <div class="card" style="width: 18rem;">
    //   <div class="card-header">
    //     Featured
    //   </div>
    //   <ul class="list-group list-group-flush">
    //     <li class="list-group-item">Cras justo odio</li>
    //     <li class="list-group-item">Dapibus ac facilisis in</li>
    //     <li class="list-group-item">Vestibulum at eros</li>
    //   </ul>
    // </div>












})