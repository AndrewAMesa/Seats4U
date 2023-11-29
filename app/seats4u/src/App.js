import React from 'react';
import './App.css';
import { redrawCanvas } from './boundary/Boundary.js'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Shows from './Pages/Shows'
import EditBlocks from './Pages/EditBlocks'
import NavBar from './NavBar.js';
import { Box } from '@mui/material';

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
        <Route path="/" element={<Home />} />
        <Route path="/Shows" element={<Shows />} />
        <Route path="/EditBlocks" element={<EditBlocks />} /> 
      </Routes>

      <NavBar />
    </div>
  );
}


export default App;