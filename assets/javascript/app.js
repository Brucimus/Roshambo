// Initialize Firebase
var config = {
apiKey: "AIzaSyDUSscaxURnRLcYCMYA38KklKcL8icp9qs",
authDomain: "brucimus-testing-1.firebaseapp.com",
databaseURL: "https://brucimus-testing-1.firebaseio.com",
projectId: "brucimus-testing-1",
storageBucket: "brucimus-testing-1.appspot.com",
messagingSenderId: "978947948224"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");
var rpsPlayerStatus = database.ref("/players");
var playerOneConnection = database.ref("playerOne");
var playerTwoConnection = database.ref("playerTwo");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

rpsPlayerStatus.on("value", function() {
    rpsPlayerStatus.set({
        seat1: false,
        seat2: false
    });
    debugger;
}) 


// When the client's connection state changes...
connectedRef.on("value", function(snap) {
  
    // //check if there is a seat 1 and seat 2
    // if (!snap.hasChild("seats")) {
    //     connectedRef.ref("/seats").push({
    //         seat1: false,
    //         seat2: false,
    //     });
    // }
    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);

        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#watcherNumber").text(snap.numChildren());
});

// Player One Sit
$("#playerOne").on("click", function(event) {
    event.preventDefault();

    // Code for handling the push
    playerOneConnection.ref().push({
        Player1: true,
        Selection: "",
        Wins: 0,
        Losses: 0,
        Ties: 0
    });

    
});

// Player One Remove
$("#removePlayerOne").on("click", function(event) {
    event.preventDefault();

    // Code for handling the push
    playerOneConnection.ref().push({
        Player1: true,
        Selection: "",
        Wins: 0,
        Losses: 0,
        Ties: 0
    });
});

// Player Two Sit
$("#playerTwo").on("click", function(event) {
    event.preventDefault();

    // Code for handling the push
    database.ref().push({
        Player2: true,
        Selection: "",
        Wins: 0,
        Losses: 0,
        Ties: 0
    });
});