import React from 'react';
import { createShowVMCon } from './controller/CreateShowVMCon';
import { deleteShowVMCon } from './controller/DeleteShowVMCon';
import { generateShowsReportVMCon } from './controller/GenerateShowsReportVMCon.js';
import VenueManagerNavBarNavBar from '../Pages/Components/VenueManagerNavBar.js';
import { activateShowCon } from './controller/ActivateShowVMCon.js';

var token;
var search;
var venueName;
var showName;
var showDate;
var showTime;
var defaultPrice;
var showID;

const ShowsVM = () => {

  return (
    <div className="ShowsVM">
      <VenueManagerNavBarNavBar />
      <button className='listShowsVM' data-testid="listShowsVM" onClick={(e) => listShowsVM()} >List Shows</button>
      {" "}
      <button className='deleteShow' data-testid="deleteShow" onClick={(e) => deleteShow()} >Delete Show</button>
      {" "}
      <button className='createShow' data-testid="createShow" onClick={(e) => createShow()} >Create Show</button>
      {" "} <button className='activateShow' data-testid="activateShow" onClick={(e) => activateShow()} >Activate Show</button>
      {" "}
      <button className='generateShowReportVM' data-testid="generateShowReportVM" onClick={(e) => generateShowReportVM()} >Generate Show Report</button>
      {" | "} <input id='search' value={search} placeholder='Search ShowsVM' />

      <li type="none"></li>
      <input id='token' value={token} placeholder='token' />
      <li type="none"></li>
      <input id='showID' value={showID} placeholder='Show ID' />
      <li type="none"></li>
      <input id='venueName' value={venueName} placeholder='venue name' />
      <li type="none"></li>
      <input id='showName' value={showName} placeholder='show name' />
      <li type="none"></li>
      <input id='showDate' value={showDate} placeholder='show date (yyyy-mm-dd)' />
      <li type="none"></li>
      <input id='showTime' value={showTime} placeholder='show time (hh:mm:ss)' />
      <li type="none"></li>
      <input id='defaultPrice' value={defaultPrice} placeholder='default price' />
      <li type="none"></li>
      result: <input id="result" readOnly style={{ width: '800px' }} />
      <li type="none"></li>
      <div id="showReportVM"></div>


    </div>
  );
};

function createShow() {
  if (document.getElementById('token').value != "" && document.getElementById('showName').value != "" && document.getElementById('showDate').value != "" &&
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

function activateShow() {
  activateShowCon();
}

function generateShowReportVM() {
  generateShowsReportVMCon();

}

function listShowsVM() {
}

function deleteShow() {
  deleteShowVMCon();
}

export default ShowsVM;