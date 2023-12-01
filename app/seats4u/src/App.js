import React from 'react';
import './App.css';
import { redrawCanvas } from './boundary/Boundary.js';
import { Routes, Route, HashRouter } from 'react-router-dom';
import EditBlockA from './Pages/EditBlocksA.js';
import EditBlockC from './Pages/EditBlocksC.js';
import EditBlockVM from './Pages/EditBlocksVM.js';
import HomeC from './Pages/HomeC.js';
import HomeA from './Pages/HomeA.js';
import HomeVM from './Pages/HomeVM.js';
import ShowsC from './Pages/ShowsC.js';
import ShowsA from './Pages/ShowsA.js';
import ShowsVM from './Pages/ShowsVM.js';
import VenuesC from './Pages/VenuesC.js';
import VenuesA from './Pages/VenuesA.js';
import VenuesVM from './Pages/VenuesVM.js';
import NavBar from './Pages/Components/NavBar.js';
import { Box } from '@mui/material';
import ConsumerNavBar from './Pages/Components/ConsumerNavBar.js';

function App() {
  const [redraw, forceRedraw] = React.useState(0);    // change values to force redraw
  const appRef = React.useRef(null);      // later need to be able to refer to App 
  const canvasRef = React.useRef(null);   // later need to be able to refer to Canvas

  // this function requests the redraw, and can be passed as an argument to other functions
  const requestRedraw = () => {
    forceRedraw(redraw + 1)
  }

  return (
    <div className="App" ref={appRef}>
      <canvas tabIndex="1"
        data-testid="canvas"
        className="App-canvas"
        ref={canvasRef}
        width='100%'
        height='930px'
      />

      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: 35,
          bgcolor: 'white'
        }}
      />

      <Routes>
        <Route path="/HomeC" element={<HomeC />} />
        <Route path="/HomeVM" element={<HomeVM />} />
        <Route path="/HomeA" element={<HomeA />} />
        <Route path="/VenuesC" element={<VenuesC />} />
        <Route path="/VenuesVM" element={<VenuesVM />} />
        <Route path="/VenuesA" element={<VenuesA />} />
        <Route path="/ShowsC" element={<ShowsC />} />
        <Route path="/ShowsVM" element={<ShowsVM />} />
        <Route path="/ShowsA" element={<ShowsA />} />
        <Route path="/EditBlocksC" element={<EditBlockC />} />
        <Route path="/EditBlocksA" element={<EditBlockA />} />
        <Route path="/EditBlocksVM" element={<EditBlockVM />} />
      </Routes>
      <NavBar />
      <ConsumerNavBar />
    </div>
  );
}


export default App;