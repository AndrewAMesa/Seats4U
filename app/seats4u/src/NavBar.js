import { Link } from 'react-router-dom';
import React from 'react';

const NavBar = () => {
   return (
      <div className="NavBar" >
         <li type="none">
            <Link to="/">Home</Link>
            {" | "}
            <Link to="Venues">Venues</Link>
            {" | "}
            <Link to="/Shows">Shows</Link>
            {" | "}
            <Link to="/EditBlocks">EditBlocks</Link>
            {" | "}
         </li>
      </div>
   );
};

export default NavBar;