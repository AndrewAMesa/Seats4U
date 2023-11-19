import React from 'react';
import './App.css';

import Model from './model/Model.js';
import { redrawCanvas } from './boundary/Boundary.js'

function App() {
  // initial instantiation of the Model
  const [model, setModel] = React.useState(new Model(0));  // only place where Model object is instantiated.
  const [redraw, forceRedraw] = React.useState(0);    // change values to force redraw

  const appRef = React.useRef(null);      // later need to be able to refer to App 
  const canvasRef = React.useRef(null);   // later need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {

    /** Happens once. */
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model, redraw])   // this second argument is CRITICAL, since it declares when to refresh (whenever Model changes)

  const testFunction = () => {
    //code
  }
  // HTML Code for GUI elements
  return (
    <div className="App" ref={appRef}>
      <canvas tabIndex="1"
        data-testid="canvas"
        className="App-canvas"
        ref={canvasRef}
        width={700}
        height={600}
      />

      <button className="upbutton" data-testid="upbutton" onClick={(e) => testFunction()}   >^</button>
      <button className="downbutton" data-testid="downbutton" onClick={(e) => testFunction()}   >v</button>
      <button className='rightbutton' data-testid="rightbutton" onClick={(e) => testFunction()} >&gt;</button>
      <button className='leftbutton' data-testid="leftbutton" onClick={(e) => testFunction()} >&lt;</button>
    </div>
  );
}

export default App;

