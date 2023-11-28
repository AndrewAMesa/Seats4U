import { Link } from 'react-router-dom';

const NavBar = () => {
 return (
 <nav>
       <ul>
          <li>
             <Link to="/">Home</Link>
          </li>
          <li>
             <Link to="/Shows">Shows</Link>
          </li>
          <li>
             <Link to="/EditBlocks">EditBlocks</Link>
          </li>
       </ul>
 </nav>
 );
};

export default NavBar;