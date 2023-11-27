import React from 'react';
import './App.css';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';


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

      <button className='createVenue' data-testid="createVenue" onClick={(e) => testFunction()} >Create Venue</button>
      <button className='listShows' data-testid="listShows" onClick={(e) => testFunction()} >List Shows</button>
      <button className='deleteVenue' data-testid="deleteVenue" onClick={(e) => testFunction()} >Delete Venue</button>
      <button className='deleteShow' data-testid="deleteShow" onClick={(e) => testFunction()} >Delete Show</button>

        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
    </div>
  );
}

export default App;

