// Import the 'post' function from the Api module
import { post } from "./Api";

// Function to handle seat purchase
export function purchaseSeatsCCon(type) {
    // Retrieve showID and seatString elements from the DOM
    let showID = document.getElementById("showID");
    let seatString = document.getElementById("purchaseSeats");

    // Split the seatString value into an array and trim each element
    let seatArray = seatString.value.split(',').map(s => s.trim());

    // Initialize an empty array to store seat information
    let jsonArray = [];

    // Loop through each seat in seatArray
    for (let i = 0; i < seatArray.length; i++) {
        // Extract column and letter information
        let column = parseInt(seatArray[i].substring(1), 10) - 1;
        let letter = seatArray[i].charAt(0);

        // Convert letter to a numeric row value
        let row = letter.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);

        // Push an object representing the seat to the jsonArray
        jsonArray.push({ "rowNum": row, "colNum": column });
    }

    // Convert the jsonArray to a JSON-formatted string (not assigned)
    JSON.stringify(jsonArray);

    // Prepare payload for the post request
    let data = {
        'showID': showID.value,
        'seats': jsonArray
    };

    // Log the jsonArray for debugging purposes
    console.log(jsonArray);

    // Callback function to handle the response from the server
    const handler = (response) => {
        console.log(response);

        // Check if the response status code is 200
        if (JSON.parse(response.statusCode) === 200) {
            console.log(JSON.parse(response.statusCode));
            document.getElementById("result").innerHTML = ""
            document.getElementById("seatInfoBar").value = "Total price: " + response.price + ", Seats Purchased: " + response.seats;
        } else {
            // If status code is not 200, display the error message
            document.getElementById("seatInfoBar").value = JSON.parse(response.error);
        }
    };

    // Make a post request to the server with the data and handler
    post('/purchaseSeatsC', data, handler);
}