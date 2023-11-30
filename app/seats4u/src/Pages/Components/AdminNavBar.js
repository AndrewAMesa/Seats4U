import { Link } from 'react-router-dom';
import React from 'react';

const AdminNavBar = () => {
   return (
      <div className="AdminNavBar" >
         <li type="none">
            <Link to="/VenuesA">Venues</Link>
            {" | "}
            <Link to="/ShowsA">Shows</Link>
            {" | "}
            <Link to="/EditBlocksA">Edit Blocks</Link>
         </li>
      </div>
   );
};

export default AdminNavBar;