import { Link } from 'react-router-dom';
import React from 'react';

const VenueManagerNavBar = () => {
   return (
      <div className="VenueManagerNavBar" >
         <li type="none">
            <Link to="/VenuesVM">Venues</Link>
            {" | "}
            <Link to="/ShowsVM">Shows</Link>
            {" | "}
            <Link to="/EditBlocksVM">Edit Blocks</Link>
            {" | "}
         </li>
      </div>
   );
};

export default VenueManagerNavBar;