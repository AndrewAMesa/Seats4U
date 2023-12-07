import { post } from "./Api"

export function generateShowsReportVMCon(requestRedraw) {
    // potentially modify the model
    let adminToken = document.getElementById("token");

     // prepare payload for the post
     let data = {'token': venueToken.value}

     // Callback function to handle the response from the server
     const handler = (response) => {
        console.log(response);
        // Logging the parsed response status code to the console
      
        //document.getElementById("result").value = JSON.parse(response);
        if (JSON.parse(response.statusCode) == "200") {
            console.log(JSON.parse(response.statusCode));
            let list = ''
            for (let i = 0; i < response.venues.length; i++){
                console.log(response.venues[i].showID);
                console.log(response.venues[i].isActive);
                console.log(response.venues[i].soldOut);
                console.log(response.venues[i].showName);
                console.log(response.venues[i].showDate);
                console.log(response.venues[i].showTime);
                console.log(response.venues[i].defaultPrice);
                console.log(response.venues[i].availableSeatsCounter);
                console.log(response.venues[i].venueName);
                console.log(response.venues[i].revenue);
                console.log(response.location[i].revenue);

                // Formatting the response string for each show
                const isActive = response.shows[i].isActive;
                const soldOut = response.shows[i].soldOut;
                // Convert SQL date and time strings to JavaScript Date object
                const dateObject = new Date(`${response.shows[i].showDate}T${response.shows[i].showTime}`);
    
                // Format date and time as strings
                const formattedDate = dateObject.toLocaleDateString();
                const formattedTime = dateObject.toLocaleTimeString();
    
                // Display the formatted date and time
                console.log("Formatted Date: " + formattedDate);
                console.log("Formatted Time: " + formattedTime);
    
                const showInfo = `${response.shows[i].showName}: ShowID: ${response.shows[i].showID}, isActive: ${isActive ? "active" : "inactive"}, isSoldOut: ${soldOut ? "yes" : "no"}, showDate: ${formattedDate}, showTime: ${formattedTime}, defaultPrice: ${response.shows[i].defaultPrice}, availableSeatsCounter: ${response.shows[i].availableSeatsCounter}, Revenue: ${response.shows[i].revenue}, Location: ${response.shows[i].location} `;
                list = list + showInfo;

            }
            document.getElementById("result").value = list
        } else {
            document.getElementById("result").value = JSON.parse(response.error);
        }
    };

    post('/generateShowsReportVM', data, handler)
}
