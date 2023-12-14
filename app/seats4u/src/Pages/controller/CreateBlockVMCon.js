import { post } from "./Api"

export function createBlockVMCon() {
    // potentially modify the model
    let venueToken = document.getElementById("token");
    let showID = document.getElementById("showID");
    let price = document.getElementById("price");
    let region = document.getElementById("section");
    let rowStart = document.getElementById("startRow");
    let rowEnd = document.getElementById("endRow");

     // prepare payload for the post
    let data = {'venueToken': venueToken.value,
                'showID': showID.value,
                'price': price.value,
                'region':region.value,
                'rowStart':rowStart.value,
                'rowEnd':rowEnd.value}
    
     // Callback function to handle the response from the server
     const handler = (response) => {
        // Logging the parsed response status code to the console
        console.log()
        if (JSON.parse(response.statusCode) == "200") {
            console.log(JSON.parse(response.statusCode));
            document.getElementById("result").value = "Block Created! Block ID: " + response.blockID;
        } else {
            document.getElementById("result").value = JSON.parse(response.error);
        }
    };

    post('/createBlockVM', data, handler)
}
