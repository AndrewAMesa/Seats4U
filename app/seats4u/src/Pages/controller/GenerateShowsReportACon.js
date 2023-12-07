import { post } from "./Api"

export function generateShowsReportACon(requestRedraw) {
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
                console.log(response.venues[i].location);

                // Formatting the response string for each show
                const isActive = response.venues[i].isActive;
                const soldOut = response.venues[i].soldOut;
                // Convert SQL date and time strings to JavaScript Date object
                const dateString = response.venues[i].showDate;
                const timeString = response.venues[i].showTime;
    
                const showInfo = `${response.venues[i].showName}: ShowID: ${response.venues[i].showID}, isActive: ${isActive ? "active" : "inactive"}, isSoldOut: ${soldOut ? "yes" : "no"}, showDate: ${dateString}, showTime: ${timeString}, defaultPrice: ${response.venues[i].defaultPrice}, availableSeatsCounter: ${response.venues[i].availableSeatsCounter}, Revenue: ${response.venues[i].revenue}  Location: ${response.venues[i].location}`;
                list = list + showInfo;

            }
            document.getElementById("result").value = list
        } else {
            document.getElementById("result").value = JSON.parse(response.error);
        }
    };

    post('/generateShowsReportA', data, handler)
}