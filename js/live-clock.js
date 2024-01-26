// Execute the code inside the function once the document is fully loaded
$(document).ready(function () {
    // Set up an interval to call the 'updateClock' function every 1000 milliseconds (1 second)
    setInterval('updateClock()', 1000);
});

// Function to update the content of an element with the current time
function updateClock() {
    
    // Get the current date and time
    var currentTime = new Date();
    
    // Extract hours, minutes, and seconds from the current time
    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );
    var currentSeconds = currentTime.getSeconds();
    
    // Add leading zeros to minutes and seconds if they are less than 10
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

    // Format the current time as a string in HH:mm:ss format
    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;
    
    // Update the content of the element with the ID 'clock' with the current time
    $("#clock").html(currentTimeString);
}