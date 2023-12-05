import React from 'react';
import { createVenueVMCon } from './controller/CreateVenueVMCon';
import { deleteVenueVMCon } from './controller/DeleteVenueVMCon';
import { listVenueVMCon } from './controller/ListVenueVMCon';
import VenueManagerNavBarNavBar from '../Pages/Components/VenueManagerNavBar.js';

var token;
var venueName;
var location;
var numRows;
var leftCols;
var centerCols;
var rightCols;

var venueConfigLeft = [];
var venueConfigCenter = [];
var venueConfigRight = [];


const VenuesVM = () => {
  return (
    <div className="VenuesVM">
      <VenueManagerNavBarNavBar />
      <button className='createVenue' data-testid="createVenue" onClick={(e) => createVenue()} >Create Venue</button>
      {" "}
      <button className='deleteVenue' data-testid="deleteVenue" onClick={(e) => deleteVenue()} >Delete Venue</button>
      {" "}
      <button className='listVenuesVM' data-testid="listVenuesVM" onClick={(e) => listVenuesVM()} >List Venues</button>

      <li type="none"></li>
      <input id='token' value={token} placeholder='token' />
      <li type="none"></li>
      <input id='venueName' value={venueName} placeholder='venue name' />
      <li type="none"></li>
      <input id='location' value={location} placeholder='location' />
      <li type="none"></li>
      <input id='numRows' value={numRows} placeholder='#rows' />
      <li type="none"></li>
      <input id='leftCols' value={leftCols} placeholder='#left columns' />
      <li type="none"></li>
      <input id='centerCols' value={centerCols} placeholder='#center columns' />
      <li type="none"></li>
      <input id='rightCols' value={rightCols} placeholder='#right columns' />
      <li type="none"></li>
      result: <input id="result" readOnly style={{ width: '1000px' }} />

      <li type="none"></li>
      <br></br>

      Venue Layout:
      <li type="none"></li>
      Left: <input id="venueConfigLeft" readOnly style={{ width: '1000px' }} />
      <li type="none"></li>
      Center: <input id="venueConfigCenter" readOnly style={{ width: '1000px' }} />
      <li type="none"></li>
      Right: <input id="venueConfigRight" readOnly style={{ width: '1000px' }} />
    </div >
  );
};

function createVenue() {
  if (document.getElementById('location').value != "" && document.getElementById('numRows').value != "" &&
    document.getElementById('leftCols').value != "" && document.getElementById('centerCols').value != "" &&
    document.getElementById('rightCols').value != "" && document.getElementById('venueName').value != "") {

    console.log("venue name: " + document.getElementById('venueName').value);
    console.log("location: " + document.getElementById('location').value);
    console.log("numRows: " + document.getElementById('numRows').value);
    console.log("leftCols: " + document.getElementById('leftCols').value);
    console.log("centerCols: " + document.getElementById('centerCols').value);
    console.log("rightCols: " + document.getElementById('rightCols').value);

    //run controller for VenueVMCon
    createVenueVMCon();

    for (let i = 0; i < document.getElementById('numRows').value; i++) {
      for (let j = 0; j < document.getElementById('leftCols').value; j++) {
        venueConfigLeft.push(String("r" + i + "c" + j));
      }
    }
    document.getElementById("venueConfigLeft").value = venueConfigLeft;
    console.log(venueConfigLeft);

    for (let i = 0; i < document.getElementById('numRows').value; i++) {
      for (let j = 0; j < document.getElementById('centerCols').value; j++) {
        venueConfigCenter.push(String("r" + i + "c" + j));
      }
    }
    document.getElementById("venueConfigCenter").value = venueConfigLeft;
    console.log(venueConfigCenter);

    for (let i = 0; i < document.getElementById('numRows').value; i++) {
      for (let j = 0; j < document.getElementById('rightCols').value; j++) {
        venueConfigRight.push(String("r" + i + "c" + j));
      }
    }
    document.getElementById("venueConfigRight").value = venueConfigLeft;
    console.log(venueConfigRight);

  }
  else {
    console.log("error: missing info");
  }
}

function deleteVenue() {
  if (document.getElementById('token').value != "") {
    console.log("token: " + document.getElementById('token').value);
    //run controller for VenueVMCon
    deleteVenueVMCon();
  }
  else {
    console.log("error: missing token");
  }
}

function listVenuesVM() {
  if (document.getElementById('token').value != "") {
    console.log("token: " + document.getElementById('token').value);
    //run controller for VenueVMCon
    listVenueVMCon();
  }
  else {
    console.log("error: missing token");
  }
}


export default VenuesVM;