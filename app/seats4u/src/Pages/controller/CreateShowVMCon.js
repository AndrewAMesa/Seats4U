// Importing the 'post' function from the "./Api" module
import { post } from "./Api";

// Function to create a Show VM (View Model)
export function createShowVMCon() {
    // Retrieving input values from HTML elements
    let venueToken = document.getElementById("token");
    let venueName = document.getElementById("venueName");
    let showName = document.getElementById("showName");
    let showDate = document.getElementById("showDate");
    let showTime = document.getElementById("showTime");
    let defaultPrice = document.getElementById("defaultPrice");

    // Prepare payload for the post request
    let data = {
        'venueToken': venueToken.value,
        'venueName': venueName.value,
        'showName': showName.value,
        'showDate': showDate.value,
        'showTime': showTime.value,
        'defaultPrice': defaultPrice.value
    };

    // Callback function to handle the response from the server
    const handler = (response) => {
        // Logging the parsed response status code to the console
        if (JSON.parse(response.statusCode) == "200") {
            document.getElementById("result").value = "Show created!   Show Name:" + showName.value + 
            "   Date: " + showDate.value + 
            "   Time: " + showTime.value +
            "   Default Price: " + defaultPrice.value +
            "   Show ID: " + JSON.parse(response.showID);
        } else {
            document.getElementById("result").value = JSON.parse(response.error);
        }
    };

    // Making a POST request to the '/createShowVM' endpoint with the prepared data and the callback function
    post('/createShowVM', data, handler);
}