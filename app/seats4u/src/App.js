import React from 'react';
import './App.css';
import Model from './model/Model.js';
import { redrawCanvas } from './boundary/Boundary.js'

function App() {
  const [model, setModel] = React.useState(new Model(0));  // only place where Model object is instantiated.
  const [redraw, forceRedraw] = React.useState(0);    // change values to force redraw
  const appRef = React.useRef(null);      // later need to be able to refer to App 
  const canvasRef = React.useRef(null);   // later need to be able to refer to Canvas
  const [token, setVal] = React.useState();

  const change = event => {
    const newvalue = event.target.value
    setVal(event.target.value)
  }

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {

    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model, redraw])   // this second argument is CRITICAL, since it declares when to refresh (whenever Model changes)


  return (
    <div className="App" ref={appRef}>
      <canvas tabIndex="1"
        data-testid="canvas"
        className="App-canvas"
        ref={canvasRef}
        width={700}
        height={600}
      />

      <button className='createVenue' data-testid="createVenue" onClick={(e) => createVenue()} >Create Venue</button>
      <button className='deleteVenue' data-testid="deleteVenue" onClick={(e) => deleteVenue()} >Delete Venue</button>
      <button className='listShows' data-testid="listShows" onClick={(e) => listShows()} >List Shows</button>
      <button className='deleteShow' data-testid="deleteShow" onClick={(e) => deleteShow()} >Delete Show</button>
      <input onChange={change} value={token} placeholder='type pp here' />
    </div>
  );
}

function createVenue() {
}

function listShows() {
}

function deleteVenue() {
}

function deleteShow() {
}

export default App;

