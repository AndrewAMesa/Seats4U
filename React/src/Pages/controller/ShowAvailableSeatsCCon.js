import { post } from "./Api"

export function showAvailableSeatsCCon(type) {
    // potentially modify the model
    let showID = document.getElementById("showID");

    // prepare payload for the post
    let data = {
        'showID': showID.value,
        'type': type
    }
    console.log("test")
    // Callback function to handle the response from the server
    const handler = (response) => {
        console.log(response);
        // Logging the parsed response status code to the console

        //document.getElementById("result").value = JSON.parse(response);
        if (JSON.parse(response.statusCode) == "200") {
            console.log(JSON.parse(response.statusCode));
            // let list = '__ '
            // let maxRow = 0
            // let maxCol = 0
            // for (let i = 0; i < response.shows2.length; i++) { //list of all seats in a show 
            //     if (response.shows2[i].rowNum > maxRow) maxRow = response.shows2[i].rowNum
            //     if (response.shows2[i].colNum > maxCol) maxCol = response.shows2[i].colNum
            // }
            // console.log(maxCol + " " + maxRow);

            // for (let i = 1; i < maxCol + 2; i++) {
            //     let tempStr = "_____" //5 underscores
            //     tempStr.substring(2) = i
            //     list = list +tempStr
            // }

            // list = list + "<br>"

            // for (let i = 0; i < response.shows2.length; i++) { //list of all seats in a show 

            //     if (response.shows2[i].colNum == 0) { //addes row letter
            //         list = list + String.fromCharCode('A'.charCodeAt(0) + response.shows2[i].rowNum) + ": "
            //     }


            //     if (response.shows2[i].isAvailable == 1) { //adds price or SO
            //         list = list + response.shows2[i].price + ", ";
            //     }
            //     else {
            //         list = list + "SO, "
            //     }

            //     if (response.shows2[i].colNum == maxCol) { //line breaks on the last column
            //         list = list + "<br>"
            //         console.log(response.shows2[i].colNum )
            //     }
            // }
            // document.getElementById("seatInfo").innerHTML = list


            let tableHTML = '<table>';
            let maxRow = 0;
            let maxCol = 0;

            for (let i = 0; i < response.shows2.length; i++) {
                // Find maximum row and column numbers
                if (response.shows2[i].rowNum > maxRow) maxRow = response.shows2[i].rowNum;
                if (response.shows2[i].colNum > maxCol) maxCol = response.shows2[i].colNum;
            }

            // Create header row with column numbers
            tableHTML += '<tr>';
            tableHTML += `<td>${'_'}</td>`;
            for (let i = 1; i <= maxCol + 1; i++) {
                tableHTML += `<td>${i}</td>`;
            }
            tableHTML += '</tr>';

            // Populate the table with seat information
            for (let i = 0; i < maxRow + 1; i++) {
                tableHTML += '<tr>';
                for (let j = 0; j <= maxCol; j++) {
                    const seat = response.shows2.find(s => s.rowNum === i && s.colNum === j);

                    if (j === 0) {
                        // Add row letter in the first column
                        tableHTML += `<td>${String.fromCharCode('A'.charCodeAt(0) + i)}</td>`;
                    }

                    if (seat) {
                        // Add seat information (price or SO) in subsequent columns
                        tableHTML += `<td>${seat.isAvailable === 1 ? seat.price : 'SO'}</td>`;
                    } else {
                        // Empty cell if no seat information
                        tableHTML += '<td></td>';
                    }
                }
                tableHTML += '</tr>';
            }

            tableHTML += '</table>';

            document.getElementById("seatInfo").innerHTML = tableHTML;
            
            document.getElementById("result").innerHTML = ""

            let list2 = ''
            for (let i = 0; i < response.shows.length; i++) { //list of all seats in a show 
                if (response.shows[i].isAvailable == 1) {
                    list2 = list2 + String.fromCharCode('A'.charCodeAt(0) + response.shows[i].rowNum) + (response.shows[i].colNum + 1) + ", ";
                }
            }

            document.getElementById("seatInfoBar").value = list2

        } else {
            document.getElementById("seatInfoBar").value = JSON.parse(response.error);
        }
    };

    post('/showAvailableSeatsC', data, handler)
}