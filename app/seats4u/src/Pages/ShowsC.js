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
      <input id='search' value={search }  style = {{ width: '250px' }} placeholder='Enter show or venue name here' />
      <button className='button' data-testid="listShowsByVenue" style = {{ width: '220px' }}  onClick={(e) => listShowsByVenue(0)} >Search Shows by Venue</button>
      <button className='button' data-testid="listShowsByShowC" style = {{ width: '220px' }}  onClick={(e) => listShowsByShow(1)} >Search Shows by Show</button>
      {" | "} 
      <button className='button' data-testid="listAllActiveShows" style = {{ width: '220px' }}  onClick={(e) => listAllActiveShows()} >List All Active Shows</button>
      <li type="none"></li>
  
     


      {/* Show available seats: {" "} */}
      <input id='showID' value={seats} style = {{ width: '250px' }} placeholder='Enter ShowID to Display Seats' />
      <button className='button' data-testid="showAvailableSeatsPrice" style = {{ width: '220px' }} onClick={(e) => showAvailableSeatsPrice()} >Show Available Seats by Price</button>
      <button className='button' data-testid="showAvailableSeatsSection" style = {{ width: '220px' }} onClick={(e) => showAvailableSeatsSection()} >Show Available Seats by Section</button>
      <button className='button' data-testid="showAvailableSeatRows" style = {{ width: '220px' }} onClick={(e) => showAvailableSeatsRow()} >Show Available Seats by Row</button> 
      <li type="none"></li>


      <input id='purchaseSeats' value={seats} style = {{ width: '250px' }} placeholder='Seats to Purchase (EX: A1,C1,...)' />

      
      <button className='button' data-testid="purchaseSeats" onClick={(e) => purchaseSeats()} >Purchase Seats</button>
      {" "}      
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