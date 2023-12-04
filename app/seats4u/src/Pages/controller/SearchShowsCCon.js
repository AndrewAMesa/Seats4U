import { post } from "./Api"

export function searchShowsCCon(type) {
    // potentially modify the model
    let venueName = document.getElementById("search");
    let showName = document.getElementById("search");

    let data = undefined
    if (type == 0){
        // prepare payload for the post
        data = {
            'type': '0',
            'name': venueName.value
        };
        console.log(venueName.value)
    } else {
        data = {
            'type': '1',
            'name': showName.value
        };
    }
    

     // Callback function to handle the response from the server
     const handler = (response) => {
        console.log(response);
        // Logging the parsed response status code to the console
      
        //document.getElementById("result").value = JSON.parse(response);
        if (JSON.parse(response.statusCode) == "200") {
            console.log(JSON.parse(response.statusCode));
            let list = ''
            for (let i = 0; i < response.shows.length; i++){
                list = list + response.shows[i].showName + ": date " + response.shows[i].showDate + ": soldOut " + response.shows[i].soldOut + ", ";
            }
            document.getElementById("result").value = list
        } else {
            document.getElementById("result").value = JSON.parse(response.error);
        }
    };

    post('/searchShowsC', data, handler)
}