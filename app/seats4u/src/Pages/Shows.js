import React from 'react';
import { createShowVMCon } from './controller/CreateShowVMCon';

var token;
var venueName;
var showName;
var showDate;
var showTime;
var defaultPrice;

const Shows = () => {

  return (
    <div className="Shows">
      <h1>Shows</h1>
      <button className='listShows' data-testid="listShows" onClick={(e) => listShows()} >List Shows</button>
      <button className='deleteShow' data-testid="deleteShow" onClick={(e) => deleteShow()} >Delete Show</button>
      <button className='createShow' data-testid="createShow" onClick={(e) => createShow()} >Create Show</button>

      <input id='token' value={token} placeholder='token' />
      <input id='venueName' value={venueName} placeholder='venue name' />
      <input id='showName' value={showName} placeholder='show name' />
      <input id='showDate' value={showDate} placeholder='show date' />
      <input id='showTime' value={showTime} placeholder='show time' />
      <input id='defaultPrice' value={defaultPrice} placeholder='default price' />

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
    console.log("error");
  }


}

function listShows() {
}

function deleteShow() {
}

export default Shows;