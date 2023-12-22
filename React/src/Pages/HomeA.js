import React from 'react';
import AdminNavBar from '../Pages/Components/AdminNavBar.js';
import bunjil from './bunjil.png';

const HomeA = () => {
  return (
    <div className="HomeA">
      <AdminNavBar />
      <p></p>

      Welcome, Admin!
      <li type="none"></li>
      <img src={bunjil} alt="bunjil"  className="App-bunjil" id="bunjil"  />

    </div >


  );
};

export default HomeA;