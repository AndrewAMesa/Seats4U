// Importing the 'post' function from the "./Api" module
import { post } from "./Api";

// Function to create a Venue VM (View Model)
export function createVenueVMCon() {
    // Retrieving input values from HTML elements
    let venueName = document.getElementById("venueName");
    let location = document.getElementById("location");
    let rowNum = document.getElementById("numRows");
    let leftColumns = document.getElementById("leftCols");
    let centerColumns = document.getElementById("centerCols");
    let rightColumns = document.getElementById("rightCols");

    // Prepare payload for the post request
    let data = {
        'venueName': venueName.value,
        'location': location.value,
        'rowNum': rowNum.value,
        'leftColumns': leftColumns.value,
        'centerColumns': centerColumns.value,
        'rightColumns': rightColumns.value
    };

    // Callback function to handle the response from the server
    const handler = (response) => {
        // Checking if the response status code is 200
        if (JSON.parse(response.statusCode) == "200") {
            // If successful, update the token input field with the received token
            document.getElementById("token").value = JSON.parse(response.token);
            console.log(JSON.parse(response.token)); // Logging the token to the console
        } else {
            // If there's an error, update the token input field with the error message
            document.getElementById("token").value = JSON.parse(response.error);
        }
    };

    // Making a POST request to the '/createVenueVM' endpoint with the prepared data and the callback function
    post('/createVenueVM', data, handler);
}
