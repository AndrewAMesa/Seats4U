import React from 'react';
import { createShowVMCon } from './controller/CreateShowVMCon';
import ConsumerNavBar from '../Pages/Components/ConsumerNavBar.js';
import { searchShowsCCon } from './controller/SearchShowsCCon';
import { showAvailableSeatsCCon } from './controller/ShowAvailableSeatsCCon';
import { purchaseSeatsCCon } from './controller/PurchaseSeatsCCon';

// var token;
var search;
var seats;
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
      {" | "} <input id='purchaseSeats' value={seats} placeholder='Seats to purchase' />
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

function listAllActiveShows() {
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
  searchShowsCCon(type)
}

function listShowsByVenue(type) {
  searchShowsCCon(type)
}

export default ShowsC;