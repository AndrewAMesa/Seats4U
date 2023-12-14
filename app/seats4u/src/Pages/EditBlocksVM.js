import NavBarEditBReact from 'react';
import { createVenueVMCon } from './controller/CreateVenueVMCon';
import { Box } from '@mui/material';
import React from 'react';
import '../App.css';
import VenueManagerNavBarNavBar from '../Pages/Components/VenueManagerNavBar.js';
import { createBlockVMCon } from './controller/CreateBlockVMCon.js';
import { listBlocksVMCon } from './controller/ListBlocksVMCon.js';


function createBlock()
{
  createBlockVMCon()
}

function deleteBlock()
{
  

    
  
}

function listBlocks()
{
  listBlocksVMCon()
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


      <p class="green-text"></p>


      <button className='button' data-testid="createBlock" onClick={(e) => createBlock()} style={{ backgroundColor: 'mediumspringgreen', color: 'black' }} >Create Block</button>
      {" "}
      <button className='button' data-testid="deleteBlock" onClick={(e) => deleteBlock()} >Delete Block</button>
      {" "}
      <button className='button' data-testid="listBlocks" onClick={(e) => listBlocks()} >List Blocks</button>
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
      <input id='showID' value={showID} placeholder='showID' />
      <li type="none"></li>
      
      For creating blocks:
      <li type="none"></li>
      <input id='price' value={price} placeholder='price' />
      <li type="none"></li>
      <input id='section' value={section} placeholder='section (ex. left)' />
      <li type="none"></li>
      <input id='startRow' value={startRow} placeholder='startRow (ex. A)' />
      <li type="none"></li>
      <input id='endRow' value={endRow} placeholder='endRow (ex. B)' />
      <li type="none"></li>

      Result: <input id="result" readOnly style={{ width: '600px' }}/>
      <li type="none"></li>
     
      <li type="none"></li>
      <div id="blockList"></div>

    </div >
  );
};


export default EditBlocksVM;