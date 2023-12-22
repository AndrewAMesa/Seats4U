import React from 'react';
import VenueManagerNavBarNavBar from '../Pages/Components/VenueManagerNavBar.js';
import mediumBunjil from './mediumBunjil.png';

const HomeVM = () => {
  return (
    <div className="HomeVM">
      <VenueManagerNavBarNavBar />
      <p></p>

      Welcome, Venue Manager!
      <li type="none"></li>
      <img src={mediumBunjil} alt="bunjil"  className="App-bunjil" id="bunjil"  />
    </div >


  );
};

export default HomeVM;