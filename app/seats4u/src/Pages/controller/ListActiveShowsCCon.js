import { get } from "./Api"

export function listActiveShowsCCon(requestRedraw) {
    
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

            const mysqlDate = response.shows[i].showDate;
            const dateObject = new Date(mysqlDate);

            // Extract day, month, and year
            const day = dateObject.getDate()+1;
            const month = dateObject.getMonth() + 1; // Months are zero-indexed, so we add 1
            const year = dateObject.getFullYear();

            // Create a formatted date string
            const dateString = `${month}-${day}-${year}`;
            const timeString = response.shows[i].showTime;

            // Formatting the response string for each show
            const isActive = response.shows[i].isActive;
            const soldOut = response.shows[i].soldOut;
            // Convert SQL date and time strings to JavaScript Date object

            const showInfo = `${response.shows[i].showName}: ShowID: ${response.shows[i].showID}, isActive: ${isActive ? "active" : "inactive"}, isSoldOut: ${soldOut ? "yes" : "no"}, showDate: ${dateString}, showTime: ${timeString}, defaultPrice: ${response.shows[i].defaultPrice}, availableSeatsCounter: ${response.shows[i].availableSeatsCounter}`;
            if (response.shows[i].soldOut == 1) {
                list = list + "show name: " + response.shows[i].showName + " | time: " + response.shows[i].showTime + " | date:  " + dateString + " | <mark>sold out</mark> | " + "showID: " + response.shows[i].showID + " | venue:  " + response.shows[i].venueName + "<br>";
                } else {
                list = list + "show name: " + response.shows[i].showName + " | time: " + response.shows[i].showTime + " | date:  " + dateString + " | <mark>available</mark> | " + "showID: " + response.shows[i].showID + " | venue:  " + response.shows[i].venueName +  "<br>";
            }
        }
        //document.getElementById("activeShows").innerHTML = ""
        document.getElementById("result").innerHTML = list
        //document.getElementById("result").value = list


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
