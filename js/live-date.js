// Wait for the document to be fully loaded before executing the code
$(document).ready(function () {

    // Create a new Date object representing the current date and time
    var currentdate = new Date();

    // Extract the day, month, and year from the current date
    var date = + currentdate.getDate() + "."
        + (currentdate.getMonth() + 1) + "."
        + currentdate.getFullYear()

    // Update the content of the element with the ID 'date' with the formatted date
    $("#date").html(date);
});