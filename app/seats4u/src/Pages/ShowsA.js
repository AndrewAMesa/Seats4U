import React from 'react';
import { createShowVMCon } from './controller/CreateShowVMCon';
import AdminNavBar from '../Pages/Components/AdminNavBar.js';
import {generateShowsReportACon} from './controller/GenerateShowsReportACon.js';
import { deleteShowACon } from './controller/DeleteShowsACon.js';

var token;
var search;
var venueName;
var showName;
var showDate;
var showTime;
var defaultPrice;
var showID;

const ShowsA = () => {

  return (
    <div className="ShowsA">
      <AdminNavBar />
      <button className='deleteShow' data-testid="deleteShow" onClick={(e) => deleteShow()} >Delete Show</button>
      {" "}
      <button className='generateShowReportA' data-testid="generateShowReportA" onClick={(e) => generateShowReportA()} >Generate Show Report</button>
      {" | "} <input id='search' value={search} placeholder='Search Shows' />

      <li type="none"></li>
      <input id='token' value={token} placeholder='token' />
      <li type="none"></li>
      <input id='venueName' value={venueName} placeholder='venue name' />
      <li type="none"></li>
      <input id='showID' value={showID} placeholder='show ID' />
      <li type="none"></li>
      <input id='showName' value={showName} placeholder='show name' />
      <li type="none"></li>
      <input id='showDate' value={showDate} placeholder='show date (yyyy-mm-dd)' />
      <li type="none"></li>
      <input id='showTime' value={showTime} placeholder='show time (hh:mm:ss)' />
      <li type="none"></li>
      <input id='defaultPrice' value={defaultPrice} placeholder='default price' />
      <li type="none"></li>
      result: <input id="result" readOnly style={{ width: '800px' }}/>
      <li type="none"></li>
      <div id="showReportA"></div>



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

function generateShowReportA(){
  generateShowsReportACon();
}

function listShowsA() {
}

function deleteShow() {
  deleteShowACon();
}

export default ShowsA;