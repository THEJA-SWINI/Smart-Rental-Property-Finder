import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>🏠 Smart Rental Finder</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/favourites">Favourites ❤️</Link>
        <Link to="/my-enquiries">My Enquiries</Link>
      </div>
    </nav>
  );
}

export default Navbar;