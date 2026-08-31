import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

import PropertyCard from "../Components/PropertyCard";
import SearchFilter from "../Components/SearchFilter";
import Loading from "../Components/Loading";
import EmptyState from "../Components/EmptyState";

import { useFavourites } from "../Context/FavouriteContext";

function Properties() {
  const [properties, setProperties] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [maxRent, setMaxRent] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    toggleFavourite,
    isFavourite,
  } = useFavourites();

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/properties");

      setProperties(response.data);
    } catch (error) {
      setError("Failed to load properties.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const filteredProperties = properties.filter((property) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      property.name.toLowerCase().includes(searchText) ||
      property.location.toLowerCase().includes(searchText);

    const matchesLocation =
      location === "" || property.location === location;

    const matchesType =
      type === "" || property.type === type;

    const matchesBedrooms =
      bedrooms === "" ||
      property.bedrooms === Number(bedrooms);

    const matchesRent =
      maxRent === "" ||
      property.rent <= Number(maxRent);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesBedrooms &&
      matchesRent
    );
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>

        <button onClick={fetchProperties}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="properties-page">
      <h1>Rental Properties</h1>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        location={location}
        setLocation={setLocation}
        type={type}
        setType={setType}
        bedrooms={bedrooms}
        setBedrooms={setBedrooms}
        maxRent={maxRent}
        setMaxRent={setMaxRent}
      />

      {filteredProperties.length === 0 ? (
        <EmptyState message="No properties match your search or filters." />
      ) : (
        <div className="property-grid">
          {filteredProperties.map((property) => (
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

export default Properties;