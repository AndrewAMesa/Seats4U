import { post } from "./Api"
import parse from 'html-react-parser';

export function searchShowsCCon(type) {
    // potentially modify the model
    let venueName = document.getElementById("search");
    let showName = document.getElementById("search");
    //let output = document.getElementById("output");

    let data = undefined
    if (type == 0) {
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
            //console.log(JSON.parse(response.statusCode));
            let list = "";
            for (let i = 0; i < response.shows.length; i++) {
                if (response.shows[i].soldOut == 1) {
                list = list + response.shows[i].showName + ": time: " + response.shows[i].showTime + " | date:  " + response.shows[i].showDate + " | <mark>sold out</mark> | " + "showID: " + response.shows[i].showID + "<br>";
                }
                else {
                    list = list + response.shows[i].showName + ": time: " + response.shows[i].showTime + " | date:  " + response.shows[i].showDate + " | <mark>available</mark> | " + "showID: " + response.shows[i].showID + "<br>";
                }
            }
            console.log(list);
            document.getElementById("result").innerHTML = list;
        }
        else {
            document.getElementById("result").innerHTML = JSON.parse(response.error);
        }
    };

    post('/searchShowsC', data, handler)
}