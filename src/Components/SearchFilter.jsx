function SearchFilter({
  search,
  setSearch,
  location,
  setLocation,
  type,
  setType,
  bedrooms,
  setBedrooms,
  maxRent,
  setMaxRent,
}) {
  return (
    <div className="search-filter">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by property name or location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Location */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">All Locations</option>
        <option value="Bengaluru">Bengaluru</option>
        <option value="Mysuru">Mysuru</option>
      </select>

      {/* Property Type */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="Apartment">Apartment</option>
        <option value="Villa">Villa</option>
        <option value="Studio">Studio</option>
        <option value="House">House</option>
      </select>

      {/* Bedrooms */}
      <select
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
      >
        <option value="">Any Bedrooms</option>
        <option value="1">1 Bedroom</option>
        <option value="2">2 Bedrooms</option>
        <option value="3">3 Bedrooms</option>
        <option value="4">4 Bedrooms</option>
      </select>

      {/* Maximum Rent */}
      <input
        type="number"
        placeholder="Maximum Rent"
        value={maxRent}
        onChange={(e) => setMaxRent(e.target.value)}
      />
    </div>
  );
}

export default SearchFilter;