import { Link } from "react-router-dom";

function PropertyCard({ property, onFavourite, isFavourite }) {
  return (
    <div className="property-card">

      <div className="property-content">

        <h2>{property.name}</h2>

        <p>📍 {property.location}</p>

        <p>🏠 Type: {property.type}</p>

        <p>🛏️ Bedrooms: {property.bedrooms}</p>

        <h3>💰 ₹{property.rent} / month</h3>

        <div className="property-actions">

          <Link to={`/properties/${property.id}`}>
            View Details
          </Link>

          <button onClick={() => onFavourite(property)}>
            {isFavourite ? "❤️ Remove" : "🤍 Favourite"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default PropertyCard;