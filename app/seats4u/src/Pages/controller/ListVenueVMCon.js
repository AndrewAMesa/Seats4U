import { post } from "./Api"

export function listVenueVMCon(requestRedraw) {
    // potentially modify the model
    let adminToken = document.getElementById("token");

     // prepare payload for the post
    let data = {'adminToken': adminToken.value}

     // Callback function to handle the response from the server
     const handler = (response) => {
        console.log(response);
        // Logging the parsed response status code to the console
      
        //document.getElementById("result").value = JSON.parse(response);
        if (JSON.parse(response.statusCode) == "200") {
            console.log(JSON.parse(response.statusCode));
            let list = ''
            for (let i = 0; i < response.venues.length; i++){
                console.log(response.venues[i].venueName);
                console.log(response.venues[i].venueToken);
                list = list + response.venues[i].venueName + ":" + response.venues[i].venueToken +  ", ";
            }
            document.getElementById("result").value = list
            document.getElementById("venuesList").innerHTML = list

        } else {
            document.getElementById("result").value = JSON.parse(response.error);
        }
    };

    post('/listVenuesA', data, handler)
}
