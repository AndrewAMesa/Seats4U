import { Link } from 'react-router-dom';
import React from 'react';

const AdminNavBar = () => {
   return (
      <div className="NavBarToo" >
         <li type="none">
            <Link to="/VenuesA">Venues</Link>
            {" | "}
            <Link to="/ShowsA">Shows</Link>
         </li>
      </div>
   );
};

export default AdminNavBar;