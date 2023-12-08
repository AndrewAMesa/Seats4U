import React from 'react';
import { createShowVMCon } from './controller/CreateShowVMCon';
import ConsumerNavBar from '../Pages/Components/ConsumerNavBar.js';
import { searchShowsCCon } from './controller/SearchShowsCCon';
import { showAvailableSeatsCCon } from './controller/ShowAvailableSeatsCCon';
import { purchaseSeatsCCon } from './controller/PurchaseSeatsCCon';
import { listActiveShowsCCon } from './controller/ListActiveShowsCCon';
import parse from 'html-react-parser';

var search;
var seats;
var test123 = "test123";

const ShowsC = () => {
  // let [redraw, forceRedraw] = React.useState(0);
  // React.useEffect(() => {
  // }, [redraw]);

  return (
    <div className="ShowsC">
      <ConsumerNavBar />
      <button className='listShowsByVenue' data-testid="listShowsByVenue" onClick={(e) => listShowsByVenue(0)} >Search Shows by Venue</button>
      {" "}
      <button className='listShowsByShow' data-testid="listShowsByShowC" onClick={(e) => listShowsByShow(1)} >Search Shows by Show</button>
      {" "}
      {/* <button className='deleteShow' data-testid="deleteShow" onClick={(e) => deleteShow()} >Delete Show</button>
      {" "} */}
      {/* <button className='createShow' data-testid="createShow" onClick={(e) => createShow()} >Create Show</button>
      {" "} */}
      <button className='listAllActiveShows' data-testid="listAllActiveShows" onClick={(e) => listAllActiveShows()} >List All Active Shows</button>
      {" "}
      <button className='purchaseSeats' data-testid="purchaseSeats" onClick={(e) => purchaseSeats()} >Purchase Seats</button>
      {" "}
      {" | "} <input id='search' value={search }  style = {{ width: '230px' }} placeholder='Search Shows (venue or show name)' />
      {" | "} <input id='showID' value={seats} style = {{ width: '215px' }} placeholder='Enter ShowID for Seats' />
      {" | "} <input id='purchaseSeats' value={seats} style = {{ width: '215px' }} placeholder='Seats to Purchase (EX: A1,C1,...)' />
      <li type="none"></li>

      Show available seats: {" "}
      <button className='showAvailableSeatsPrice' data-testid="showAvailableSeatsPrice" onClick={(e) => showAvailableSeatsPrice()} >Show Available Seats by Price</button>
      {" "}
      <button className='showAvailableSeatsSection' data-testid="showAvailableSeatsSection" onClick={(e) => showAvailableSeatsSection()} >Show Available Seats by Section</button>
      {" "}
      <button className='showAvailableSeatsRow' data-testid="showAvailableSeatRows" onClick={(e) => showAvailableSeatsRow()} >Show Available Seats by Row</button>
      <li type="none"></li>
      Seat Info: <input id='seatInfoBar' readOnly style = {{ width: '800px' }} />
      
      
      <div id="seatInfo"> </div>
      <li type="none"></li>
      <div id="activeShows"> </div>
      <li type="none"></li>


      <div id="result"> </div>
     
     
      {/*  {document.getElementById("result").value} */}

    </div>
  );
};

// function setDefaultResult() {
//   document.getElementById("result").value = "";
//   console.log("result has been set");
// }

function listAllActiveShows() {
  listActiveShowsCCon()
}


function purchaseSeats() {
  purchaseSeatsCCon()
}

function showAvailableSeatsSection() {
  showAvailableSeatsCCon("section")
}

function showAvailableSeatsPrice() {
  showAvailableSeatsCCon("price")
}

function showAvailableSeatsRow() {
  showAvailableSeatsCCon("row")
}

function listShowsByShow(type) {
  if (document.getElementById('search').value != "") {
    searchShowsCCon(type)
  }
}

function listShowsByVenue(type) {
  if (document.getElementById('search').value != "") {
    searchShowsCCon(type)
  }
}

export default ShowsC;