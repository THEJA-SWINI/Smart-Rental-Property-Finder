import { Link } from "react-router-dom";

import PropertyCard from "../Components/PropertyCard";
import EmptyState from "../Components/EmptyState";

import { useFavourites } from "../Context/FavouriteContext";

function Favourites() {
  const {
    favourites,
    toggleFavourite,
    isFavourite,
  } = useFavourites();

  return (
    <div className="favourites-page">
      <h1>❤️ My Favourite Properties</h1>

      {favourites.length === 0 ? (
        <div>
          <EmptyState message="You have not added any properties to your favourites yet." />

          <Link to="/properties">
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="property-grid">
          {favourites.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onFavourite={toggleFavourite}
              isFavourite={isFavourite(property.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;