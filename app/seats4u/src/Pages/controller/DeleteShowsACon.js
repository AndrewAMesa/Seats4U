import { post } from "./Api"

export function deleteShowACon() {
    // potentially modify the model
    let adminToken = document.getElementById("token");
    let showID = document.getElementById("showID");

     // prepare payload for the post
    let data = {'adminToken': adminToken.value,
                'showID': showID.value}
    
     // Callback function to handle the response from the server
     const handler = (response) => {
        // Logging the parsed response status code to the console
        console.log()
        if (JSON.parse(response.statusCode) == "200") {
            console.log(JSON.parse(response.statusCode));
            document.getElementById("result").value = "Show deleted!";
        } else {
            document.getElementById("result").value = JSON.parse(response.error);
        }
    };

    post('/deleteShowsA', data, handler)
}
