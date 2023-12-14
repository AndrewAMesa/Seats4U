import React from 'react';
import { createVenueVMCon } from './controller/CreateVenueVMCon';
import { deleteVenueVMCon } from './controller/DeleteVenueVMCon';
import { listVenueVMCon } from './controller/ListVenueVMCon';
import AdminNavBar from '../Pages/Components/AdminNavBar.js';

var token;
var venueName;
var location;
var numRows;
var leftCols;
var centerCols;
var rightCols;

const VenuesA = () => {
  return (
    <div className="VenuesA">
      <AdminNavBar />
      <button className='button' data-testid="listVenuesA" onClick={(e) => listVenuesA()} >List Venues</button>

      <li type="none"></li>
      Enter SkyGod Token:
      <li type="none"></li>
      <input id='token' value={token} placeholder='token' />
      <li type="none"></li>

      Result: <input id="result" readOnly style={{ width: '1000px' }} />
      <li type="none"></li>
      <div id="venuesList"></div>
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

  }
  else {
    console.log("error: missing info");
  }
}

function deleteVenue() {
  if (document.getElementById('token').value != ""){
    console.log("token: " + document.getElementById('token').value);
    //run controller for VenueVMCon
    deleteVenueVMCon();
  }
  else {
    console.log("error: missing token");
  }
}

function listVenuesA() {
  if (document.getElementById('token').value != ""){
    console.log("token: " + document.getElementById('token').value);
    //run controller for VenueVMCon
    listVenueVMCon();
  }
  else {
    console.log("error: missing token");
  }
}


export default VenuesA;