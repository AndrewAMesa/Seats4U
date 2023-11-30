import React from 'react';
import { createVenueVMCon } from './controller/CreateVenueVMCon';
import { Box } from '@mui/material';
import '../App.css';
import ConsumerNavBar from '../Pages/Components/ConsumerNavBar.js';

const EditBlocksC = () => {
  return (
    <div className="EditBlocksC">
      <ConsumerNavBar />


      <h1>Edit Blocks</h1>
    </div >
  );
};

export default EditBlocksC;