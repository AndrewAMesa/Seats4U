import { post } from "./Api"

export function showAvailableSeatsCCon(requestRedraw) {
    // potentially modify the model
    let showID = document.getElementById("search");

     // prepare payload for the post
    let data = {'showID': showID.value}
    console.log("test")
     // Callback function to handle the response from the server
     const handler = (response) => {
        console.log(response);
        // Logging the parsed response status code to the console
      
        //document.getElementById("result").value = JSON.parse(response);
        if (JSON.parse(response.statusCode) == "200") {
            console.log(JSON.parse(response.statusCode));
            let list = ''
            for (let i = 0; i < response.shows.length; i++){
                list = list + "row" + response.shows[i].rowNum + ":" + "col" + response.shows[i].colNum +  ", ";
            }
            document.getElementById("result").value = list
        } else {
            document.getElementById("result").value = JSON.parse(response.error);
        }
    };

    post('/showAvailableSeatsC', data, handler)
}