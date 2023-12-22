import React from 'react';
import ConsumerNavBar from '../Pages/Components/ConsumerNavBar.js';
import basicBunjil from './basicBunjil.png';

const HomeC = () => {
  return (
    <div className="HomeC">
      <ConsumerNavBar />
      <p></p>

      Welcome to Consumer!
      <li type="none"></li>
      <img src={basicBunjil} alt="bunjil"  className="App-bunjil" id="bunjil"  />
    </div >

  );
};

export default HomeC;