import { get } from "./Api"

export function listActiveShowSCCon(requestRedraw) {
    
     get('/listActiveShowsC')
     // Callback function to handle the response from the server
     .then(function (response) {
        let list = ''
        for (let i = 0; i < response.shows.length; i++){
            console.log(response.shows[i].showID);
            console.log(response.shows[i].isActive);
            console.log(response.shows[i].soldOut);
            console.log(response.shows[i].showName);
            console.log(response.shows[i].showDate);
            console.log(response.shows[i].showTime);
            console.log(response.shows[i].defaultPrice);
            console.log(response.shows[i].availableSeatsCounter);
            console.log(response.shows[i].VenueName);



            // Formatting the response string for each show
            const isActive = response.shows[i].isActive;
            const soldOut = response.shows[i].soldOut;
            // Convert SQL date and time strings to JavaScript Date object
            const dateObject = new Date(`${response.shows[i].showDate}T${response.shows[i].showTime}`);


            const showInfo = `${response.shows[i].showName}: ShowID: ${response.shows[i].showID}, isActive: ${isActive ? "active" : "inactive"}, isSoldOut: ${soldOut ? "yes" : "no"}, showDate: ${response.shows[i].showDate}, showTime: ${response.shows[i].showTime}, defaultPrice: ${response.shows[i].defaultPrice}, availableSeatsCounter: ${response.shows[i].availableSeatsCounter}`;
            list = list + showInfo;
        }
        document.getElementById("result").value = list

    })
    .catch(function (error) {
        // not much to do
        console.log(error)
    })
}

        // Logging the parsed response status code to the console
      
//         //document.getElementById("result").value = JSON.parse(response);
//         if (JSON.parse(response.statusCode) == "200") {
//             console.log(JSON.parse(response.statusCode));
//             let list = ''
//             for (let i = 0; i < response.venues.length; i++){
//                 console.log(response.venues[i].venueName);
//                 console.log(response.venues[i].venueToken);
//                 list = list + response.venues[i].venueName + ":" + response.venues[i].venueToken +  ", ";
//             }
//             document.getElementById("result").value = list
//         } else {
//             document.getElementById("result").value = JSON.parse(response.error);
//         }
//     };


// }
