import { Link } from 'react-router-dom';
import React from 'react';

const ConsumerNavBar = () => {
   return (
      <div className="NavBarToo" >
         <li type="none">
            {/* <Link to="/VenuesC">Venues</Link>
            {" | "} */}
            <Link to="/ShowsC">Shows</Link>
            {/* {" | "}
            <Link to="/EditBlocksC">Edit Blocks</Link> */}
         </li>
      </div>
   );
};

export default ConsumerNavBar;