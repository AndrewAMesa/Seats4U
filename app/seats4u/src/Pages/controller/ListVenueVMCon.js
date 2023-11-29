import { post } from "./Api"

export function listVenueVMCon(requestRedraw) {
    // potentially modify the model
    let venueToken = document.getElementById("token");

     // prepare payload for the post
    let data = {'venueToken': venueToken.value}

     // Callback function to handle the response from the server
     const handler = (response) => {
        // Logging the parsed response status code to the console
        if (JSON.parse(response.statusCode) == "200") {
            console.log(JSON.parse(response.statusCode));
        } else {
            document.getElementById("token").value = JSON.parse(response.error);
        }
    };

    post('/ListVenuesVM', data, handler)
}
