import { createContext, useCallback, useContext, useState } from "react";

const FavouriteContext = createContext();

export function FavouriteProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = useCallback((property) => {
    setFavourites((currentFavourites) => {
      const alreadyFavourite = currentFavourites.some(
        (item) => item.id === property.id
      );

      if (alreadyFavourite) {
        return currentFavourites.filter(
          (item) => item.id !== property.id
        );
      }

      return [...currentFavourites, property];
    });
  }, []);

  const isFavourite = useCallback(
    (propertyId) => {
      return favourites.some((item) => item.id === propertyId);
    },
    [favourites]
  );

  return (
    <FavouriteContext.Provider
      value={{
        favourites,
        toggleFavourite,
        isFavourite,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
}

export function useFavourites() {
  return useContext(FavouriteContext);
}