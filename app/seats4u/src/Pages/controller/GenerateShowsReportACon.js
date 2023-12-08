import { post } from "./Api"

export function generateShowsReportACon(requestRedraw) {
    // potentially modify the model
    let adminToken = document.getElementById("token");

     // prepare payload for the post
     let data = {'adminToken': adminToken.value}
    
    // Initialize an empty string for the table HTML
    let table = '<table border="1"><tr><th>Name</th><th>ShowID</th><th>isActive</th><th>isSoldOut</th><th>ShowDate</th><th>ShowTime</th><th>DefaultPrice</th><th>AvailableSeatsCounter</th><th>Revenue</th><th>Location</th></tr>';

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
                //const dateString = response.venues[i].showDate;
                const mysqlDate = response.venues[i].showDate;
                const dateObject = new Date(mysqlDate);

                // Extract day, month, and year
                const day = dateObject.getDate()+1;
                const month = dateObject.getMonth()+1; // Months are zero-indexed, so we add 1
                const year = dateObject.getFullYear();

                // Create a formatted date string
                const dateString = `${month}-${day}-${year}`;
                const timeString = response.venues[i].showTime;
            
                // const showInfo = `${response.venues[i].showName}: ShowID: ${response.venues[i].showID}, isActive: ${isActive ? "active" : "inactive"}, isSoldOut: ${soldOut ? "yes" : "no"}, showDate: ${dateString}, showTime: ${timeString}, defaultPrice: ${response.venues[i].defaultPrice}, availableSeatsCounter: ${response.venues[i].availableSeatsCounter}, Revenue: ${response.venues[i].revenue}  Location: ${response.venues[i].location}`;
                // list = list + showInfo;

                const showInfo = `
                <tr>
                <td>${response.venues[i].showName}</td>
                <td>${response.venues[i].showID}</td>
                <td>${isActive ? "active" : "inactive"}</td>
                <td>${soldOut ? "yes" : "no"}</td>
                <td>${dateString}</td>
                <td>${timeString}</td>
                <td>${response.venues[i].defaultPrice}</td>
                <td>${response.venues[i].availableSeatsCounter}</td>
                <td>${response.venues[i].revenue}</td>
                <td>${response.venues[i].location}</td>
                </tr>
  `             ;

                // Append the showInfo to the table
                table += showInfo

            }
            document.getElementById("showReportA").innerHTML = table
        } else {
            document.getElementById("result").value = JSON.parse(response.error);
        }
    };

    post('/generateShowsReportA', data, handler)
}