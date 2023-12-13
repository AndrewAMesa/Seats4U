import NavBarEditBReact from 'react';
import { createVenueVMCon } from './controller/CreateVenueVMCon';
import { Box } from '@mui/material';
import React from 'react';
import '../App.css';
import VenueManagerNavBarNavBar from '../Pages/Components/VenueManagerNavBar.js';


function createBlock()
{

}

function deleteBlock()
{

}

function listBlocks()
{

}

var venueToken;
var showID;
var blockID;

var price;
var section;
var startRow;
var endRow;


const EditBlocksVM = () => {
  return (
    <div className="EditBlocksVM">
      <VenueManagerNavBarNavBar />


      <button className='createBlock' data-testid="createBlock" onClick={(e) => createBlock()} >Create Block</button>
      {" "}
      <button className='deleteBlock' data-testid="deleteBlock" onClick={(e) => deleteBlock()} >Delete Block</button>
      {" "}
      <button className='listBlocks' data-testid="listBlocks" onClick={(e) => listBlocks()} >List Blocks</button>
      <li type="none"></li>
      Venue Authorization:
      <li type="none"></li>
      <input id='token' value={venueToken} placeholder='venueToken' />
      <li type="none"></li>

      For deleting blocks:
      <li type="none"></li>
      <input id='blockID' value={blockID} placeholder='blockID' />
      <li type="none"></li>

      For creating and listing blocks:
      <li type="none"></li>
      <input id='venueName' value={showID} placeholder='showID' />
      <li type="none"></li>
      
      For creating blocks:
      <li type="none"></li>
      <input id='price' value={price} placeholder='price' />
      <li type="none"></li>
      <input id='section' value={section} placeholder='section' />
      <li type="none"></li>
      <input id='startRow' value={startRow} placeholder='startRow' />
      <li type="none"></li>
      <input id='endRow' value={endRow} placeholder='endRow' />
      <li type="none"></li>

      Result: <input id="result" readOnly style={{ width: '1200px' }}/>
      <li type="none"></li>
     
      

    </div >
  );
};


export default EditBlocksVM;