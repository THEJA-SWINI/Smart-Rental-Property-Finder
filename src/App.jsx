import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import Properties from "./Pages/Properties";
import PropertyDetails from "./Pages/PropertyDetails";
import Favourites from "./Pages/Favourites";
import EnquiryForm from "./Pages/EnquiryForm";
import MyEnquiries from "./Pages/MyEnquiries";

import { FavouriteProvider } from "./Context/FavouriteContext";

function App() {
  return (
    <FavouriteProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/properties"
            element={<Properties />}
          />

          <Route
            path="/properties/:id"
            element={<PropertyDetails />}
          />

          <Route
            path="/favourites"
            element={<Favourites />}
          />

          <Route
            path="/enquiry/:id"
            element={<EnquiryForm />}
          />

          <Route
            path="/my-enquiries"
            element={<MyEnquiries />}
          />
        </Routes>
      </BrowserRouter>
    </FavouriteProvider>
  );
}

export default App;