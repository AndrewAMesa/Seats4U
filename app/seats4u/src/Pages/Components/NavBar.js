import { Link } from 'react-router-dom';
import React from 'react';

const NavBar = () => {
   return (
      <div className="NavBar" >
         <li type="none">
            <Link to="/HomeC">Consumer</Link>
            {" | "}
            <Link to="/HomeVM">Venue Manager</Link>
            {" | "}
            <Link to="/HomeA">Admin</Link>
         </li>
      </div>
   );
};

export default NavBar;