import React from 'react';
import { createShowVMCon } from './controller/CreateShowVMCon';
import ConsumerNavBar from '../Pages/Components/ConsumerNavBar.js';
import { searchShowsCCon } from './controller/SearchShowsCCon';
import { showAvailableSeatsCCon } from './controller/ShowAvailableSeatsCCon';

// var token;
var search;
// var venueName;
// var showName;
// var showDate;
// var showTime;
// var defaultPrice;

const ShowsC = () => {

  return (
    <div className="ShowsC">
      <ConsumerNavBar />
      <button className='listShowsByVenue' data-testid="listShowsByVenue" onClick={(e) => listShowsByVenue(0)} >List Shows by Venue</button>
      {" "}
      <button className='listShowsByShow' data-testid="listShowsByShowC" onClick={(e) => listShowsByShow(1)} >List Shows by Show</button>
      {" "}
      {/* <button className='deleteShow' data-testid="deleteShow" onClick={(e) => deleteShow()} >Delete Show</button>
      {" "} */}
      {/* <button className='createShow' data-testid="createShow" onClick={(e) => createShow()} >Create Show</button>
      {" "} */}
      <button className='listAllActiveShows' data-testid="listAllActiveShows" onClick={(e) => listAllActiveShows()} >List All Active Shows</button>
      {" "}
      <button className='purchaseSeats' data-testid="purchaseSeats" onClick={(e) => purchaseSeats()} >Purchase Seats</button>
      {" "}
      {" | "} <input id='search' value={search} placeholder='Search Shows' />
      <li type="none"></li>
      Show available seats: {" "}
      <button className='showAvailableSeatsPrice' data-testid="showAvailableSeatsPrice" onClick={(e) => showAvailableSeatsPrice()} >Show Available Seats by Price</button>
      {" "}
      <button className='showAvailableSeatsSection' data-testid="showAvailableSeatsSection" onClick={(e) => showAvailableSeatsSection()} >Show Available Seats by Section</button>
      {" "}
      <button className='showAvailableSeatsRow' data-testid="showAvailableSeatRows" onClick={(e) => showAvailableSeatsRow()} >Show Available Seats by Row</button>
     
      <li type="none"></li>
      result: <input id="result" readOnly style={{ width: "800px" }} />

    </div>
  );
};

function createShow() {
  if (document.getElementById('token').value != "" && document.getElementById('venueName').value != "" &&
    document.getElementById('showName').value != "" && document.getElementById('showDate').value != "" &&
    document.getElementById('showTime').value != "" && document.getElementById('defaultPrice').value != "") {

    console.log("token: " + document.getElementById('token').value);
    console.log("venue name: " + document.getElementById('venueName').value);
    console.log("show name: " + document.getElementById('showName').value);
    console.log("show date: " + document.getElementById('showDate').value);
    console.log("show time: " + document.getElementById('showTime').value);
    console.log("default price: " + document.getElementById('defaultPrice').value);

    //run controller for VenueVMCon
    createShowVMCon();

  }
  else {
    console.log("error: missing info");
  }
}

function listAllActiveShows() {
}

function purchaseSeats() {
}

function showAvailableSeatsSection() {
}

function showAvailableSeatsPrice() {
}

function showAvailableSeatsRow() {

}

function listShowsByShow(type) {
  searchShowsCCon(type)
}

function listShowsByVenue(type) {
  searchShowsCCon(type)
}

function deleteShow() {
}

export default ShowsC;