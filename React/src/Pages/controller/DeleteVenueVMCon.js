import { post } from "./Api"

export function deleteVenueVMCon() {
    // potentially modify the model
    let venueToken = document.getElementById("token");

     // prepare payload for the post
    let data = {'venueToken': venueToken.value}
    
     // Callback function to handle the response from the server
     const handler = (response) => {
        // Logging the parsed response status code to the console
        console.log()
        if (JSON.parse(response.statusCode) == "200") {
            console.log(JSON.parse(response.statusCode));
            document.getElementById("result").value = "Venue deleted!";
        } else {
            document.getElementById("result").value = JSON.parse(response.error);
        }
    };

    post('/deleteVenueVM', data, handler)
}
