import NavBarEditBReact from 'react';
import { createVenueVMCon } from './controller/CreateVenueVMCon';
import { Box } from '@mui/material';
import '../App.css';
import VenueManagerNavBarNavBar from '../Pages/Components/VenueManagerNavBar.js';

const EditBlocksVM = () => {
  return (
    <div className="EditBlocksVM">
      <VenueManagerNavBarNavBar />
    </div >
  );
};

export default EditBlocksVM;