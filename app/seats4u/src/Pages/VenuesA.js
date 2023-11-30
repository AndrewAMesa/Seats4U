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
      <h1>Venues</h1>
      <button className='createVenue' data-testid="createVenue" onClick={(e) => createVenue()} >Create Venue</button>
      {" "}
      <button className='deleteVenue' data-testid="deleteVenue" onClick={(e) => deleteVenue()} >Delete Venue</button>
      {" "}
      <button className='listVenuesA' data-testid="listVenuesA" onClick={(e) => listVenuesA()} >List VenuesA</button>

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