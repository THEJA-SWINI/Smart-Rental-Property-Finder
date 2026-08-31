import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Rental Home  🏠</h1>

          <p>
            Discover apartments, villas, studios, and houses
            that match your needs and budget.
          </p>

          <Link to="/properties" className="browse-button">
            Browse Properties
          </Link>
        </div>
      </section>

      <section className="home-features">
        <h2>Why Choose Smart Rental Finder?</h2>

        <div className="feature-container">
          <div className="feature-card">
            <h3>🔍 Easy Search</h3>
            <p>
              Search rental properties by name or location.
            </p>
          </div>

          <div className="feature-card">
            <h3>🎯 Smart Filters</h3>
            <p>
              Filter properties by rent, type, location,
              and bedrooms.
            </p>
          </div>

          <div className="feature-card">
            <h3>❤️ Save Favourites</h3>
            <p>
              Save your favourite properties for later.
            </p>
          </div>

          <div className="feature-card">
            <h3>📝 Easy Enquiry</h3>
            <p>
              Submit and manage rental enquiries easily.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;