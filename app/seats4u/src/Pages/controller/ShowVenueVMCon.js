import { post } from "./Api"

export function showVenueVMCon() {
    // potentially modify the model
    let venueToken = document.getElementById("token");

     // prepare payload for the post
    let data = {'venueToken': venueToken.value}
    
     // Callback function to handle the response from the server
     const handler = (response) => {
        // Logging the parsed response status code to the console
        console.log()
        
        if (JSON.parse(response.statusCode) == "200") {
            console.log(response.show);
            console.log(response.show[0].venueName);
            document.getElementById("venueName").value = response.show[0].venueName
            document.getElementById("location").value = response.show[0].location
        } else {
            document.getElementById("result").value = JSON.parse(response.error);
        }
    };

    post('/showVenueVM', data, handler)
}
