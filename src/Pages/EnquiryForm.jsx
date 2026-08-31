import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import Loading from "../Components/Loading";

function EnquiryForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/properties/${id}`);

        setProperty(response.data);
      } catch (error) {
        setError("Unable to load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const enquiry = {
        propertyId: id,
        propertyName: property.name,
        name,
        email,
        phone,
        message,
        status: "Pending",
      };

      await api.post("/enquiries", enquiry);

      setSuccess("Your rental enquiry has been submitted successfully.");

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      setError("Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error && !property) {
    return (
      <div>
        <h2>{error}</h2>

        <Link to="/properties">
          Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="enquiry-page">
      <h1>Rental Enquiry</h1>

      <h2>{property.name}</h2>

      <p>
        📍 {property.location}
      </p>

      {success && (
        <div className="success-message">
          <p>{success}</p>

          <button onClick={() => navigate("/my-enquiries")}>
            View My Enquiries
          </button>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label>Phone</label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label>Message</label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your enquiry"
            rows="5"
            required
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Enquiry"}
        </button>
      </form>

      <br />

      <Link to="/properties">
        ← Back to Properties
      </Link>
    </div>
  );
}

export default EnquiryForm;