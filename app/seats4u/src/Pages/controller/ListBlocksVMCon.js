import { post } from "./Api";

// Function to list blocks for a virtual machine
export function listBlocksVMCon() {
    // Get elements by ID for venue token and show ID
    let venueToken = document.getElementById("token");
    let showID = document.getElementById("showID");

    // Prepare payload for the post request
    let data = {
        'venueToken': venueToken.value,
        'showID': showID.value
    };

    // Callback function to handle the response from the server
    const handler = (response) => {
        // Check if the response status code is 200 (OK)
        if (JSON.parse(response.statusCode) == "200") {
            // Generate an HTML table with block information
            let table = '<table border="1"><tr><th>blockID</th><th>ShowID</th><th>ShowName</th><th>Price</th><th>Region</th><th>RowStart</th><th>RowEnd</th><th>SeatsAvailable</th><th>SeatsPurchased</th></tr>';

            // Loop through the blocks in the response and populate the table
            for (let i = 0; i < response.blocks.length; i++) {
                table += `<tr><td>${response.blocks[i].blockID}</td><td>${response.blocks[i].showID}</td><td>${response.blocks[i].showName}</td><td>${response.blocks[i].price}</td><td>${response.blocks[i].region}</td><td>${response.blocks[i].rowStart}</td><td>${response.blocks[i].rowEnd}</td><td>${response.blocks[i].seatsAvailable}</td><td>${response.blocks[i].seatsPurchased}</td></tr>`;
            }

            // Set the HTML content of the element with ID 'blockList' to the generated table
            document.getElementById("blockList").innerHTML = table;
        } else {
            // If the response status code is not 200, display the error message
            document.getElementById("result").value = JSON.parse(response.error);
        }
    };

    // Make a POST request to the server endpoint '/listBlocksVM' with the payload and callback function
    post('/listBlocksVM', data, handler);
}