import React from 'react';
import { createVenueVMCon } from './controller/CreateVenueVMCon';

var token;
var venueName;
var location;
var defaultPrice;
var numRows;
var leftCols;
var centerCols;
var rightCols;

const Home = () => {

  return (
    <div className="Home">
      <h1>Home</h1>
      <button className='createVenue' data-testid="createVenue" onClick={(e) => createVenue()} >Create Venue</button>
      <button className='deleteVenue' data-testid="deleteVenue" onClick={(e) => deleteVenue()} >Delete Venue</button>

      <input id='token' value={token} placeholder='token' />
      <input id='venueName' value={venueName} placeholder='venue name' />
      <input id='location' value={location} placeholder='location' />
      <input id='defaultPrice' value={defaultPrice} placeholder='default price' />
      <input id='numRows' value={numRows} placeholder='#rows' />
      <input id='leftCols' value={leftCols} placeholder='#left columns' />
      <input id='centerCols' value={centerCols} placeholder='#center columns' />
      <input id='rightCols' value={rightCols} placeholder='#right columns' />

    </div>
  );
};

function createVenue() {
  if (document.getElementById('location').value != "" &&
    document.getElementById('defaultPrice').value != "" && document.getElementById('numRows').value != "" &&
    document.getElementById('leftCols').value != "" && document.getElementById('centerCols').value != "" &&
    document.getElementById('rightCols').value != "" && document.getElementById('venueName').value != "") {

    console.log("venue name: " + document.getElementById('venueName').value);
    console.log("location: " + document.getElementById('location').value);
    console.log("default price: " + document.getElementById('defaultPrice').value);
    console.log("numRows: " + document.getElementById('numRows').value);
    console.log("leftCols: " + document.getElementById('leftCols').value);
    console.log("centerCols: " + document.getElementById('centerCols').value);
    console.log("rightCols: " + document.getElementById('rightCols').value);

    //run controller for VenueVMCon
    createVenueVMCon();

  }
  else {
    console.log("error");
  }


}

function deleteVenue() {
}

export default Home;