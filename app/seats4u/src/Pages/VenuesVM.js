import React from 'react';
import { createVenueVMCon } from './controller/CreateVenueVMCon';
import { deleteVenueVMCon } from './controller/DeleteVenueVMCon';
import { showVenueVMCon } from './controller/ShowVenueVMCon';
import VenueManagerNavBarNavBar from '../Pages/Components/VenueManagerNavBar.js';
import parse from 'html-react-parser';

var token;
var venueName;
var location;
var numRows;
var leftCols;
var centerCols;
var rightCols;
var venueConfig = ["fdjksl"];

const VenuesVM = () => {
  return (
    <div className="VenuesVM">
      <VenueManagerNavBarNavBar />
      <button className='createVenue' data-testid="createVenue" onClick={(e) => createVenue()} >Create Venue</button>
      {" "}
      <button className='deleteVenue' data-testid="deleteVenue" onClick={(e) => deleteVenue()} >Delete Venue</button>
      {" "}
      <button className='showVenueVM' data-testid="showVenueVM" onClick={(e) => showVenueVM()} >Show Venue</button>

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
      <input id="venueLayout" readOnly style={{ width: '1000px' }} />
      <li type="none"></li>

      <div id="result"></div>

    </div >
  );
};

function createVenue() {
  if (document.getElementById('location').value != "" && document.getElementById('numRows').value != "" &&
    document.getElementById('leftCols').value != "" && document.getElementById('centerCols').value != "" &&
    document.getElementById('rightCols').value != "" && document.getElementById('venueName').value != "" && document.getElementById('numRows').value < 27) {

    console.log("venue name: " + document.getElementById('venueName').value);
    console.log("location: " + document.getElementById('location').value);
    console.log("numRows: " + document.getElementById('numRows').value);
    console.log("leftCols: " + document.getElementById('leftCols').value);
    console.log("centerCols: " + document.getElementById('centerCols').value);
    console.log("rightCols: " + document.getElementById('rightCols').value);

    //run controller for VenueVMCon
    createVenueVMCon();

    //function to create venue layout
    // 1    2      3      4
    // A | 30 sold  30   30
    // B | 30  30  sold  30 
    // C | 30  30   30   30 
    // D | 30 sold sold  30
    
    // for (let i = 0; i < document.getElementById('numRows').value; i++) {
    //   for (let j = 0; j < document.getElementById('leftCols').value; j++) {
    //     venueConfig.push(String("r" + i + "c" + j));
    //     String.fromCharCode(65 + i) + " | "; //n = 0 = A      looks like A | ...
    //   }
    // }
    // document.getElementById("venueConfig").value = venueConfig;
    // console.log(venueConfig);    

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

function showVenueVM() {
  if (document.getElementById('token').value != "") {
    console.log("token: " + document.getElementById('token').value);
    //run controller for VenueVMCon
    showVenueVMCon();
  }
  else {
    console.log("error: missing token");
  }
}

export default VenuesVM;