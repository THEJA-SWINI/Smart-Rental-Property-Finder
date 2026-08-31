import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import Loading from "../Components/Loading";
import { useFavourites } from "../Context/FavouriteContext";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    toggleFavourite,
    isFavourite,
  } = useFavourites();

  const fetchProperty = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/properties/${id}`);

      setProperty(response.data);
    } catch (error) {
      setError("Property not found.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>

        <button onClick={() => navigate("/properties")}>
          Back to Properties
        </button>
      </div>
    );
  }

  if (!property) {
    return <h2>Property not available.</h2>;
  }

  return (
    <div className="property-details">
      <img
        src={property.image}
        alt={property.name}
        className="details-image"
      />

      <div className="details-content">
        <h1>{property.name}</h1>

        <p>📍 Location: {property.location}</p>

        <p>🏠 Property Type: {property.type}</p>

        <p>🛏️ Bedrooms: {property.bedrooms}</p>

        <h2>₹{property.rent} / month</h2>

        <p>{property.description}</p>

        <button
          onClick={() => toggleFavourite(property)}
        >
          {isFavourite(property.id)
            ? "❤️ Remove from Favourites"
            : "🤍 Add to Favourites"}
        </button>

        <Link to={`/enquiry/${property.id}`}>
          <button>📝 Make Enquiry</button>
        </Link>

        <br />

        <Link to="/properties">
          ← Back to Properties
        </Link>
      </div>
    </div>
  );
}

export default PropertyDetails;