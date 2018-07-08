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

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

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