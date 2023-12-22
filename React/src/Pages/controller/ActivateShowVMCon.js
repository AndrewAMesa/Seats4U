import { post } from "./Api"

export function activateShowCon() {
    // potentially modify the model
    let venueToken = document.getElementById("token");
    let showID = document.getElementById("showID");

     // prepare payload for the post
    let data = {'venueToken': venueToken.value,
                'showID': showID.value}
    
     // Callback function to handle the response from the server
     const handler = (response) => {
        // Logging the parsed response status code to the console
        console.log()
        if (JSON.parse(response.statusCode) == "200") {
            console.log(JSON.parse(response.statusCode));
            document.getElementById("result").value = "Show Activated!";
        } else {
            document.getElementById("result").value = JSON.parse(response.error);
        }
    };

    post('/activateShowVM', data, handler)
}
