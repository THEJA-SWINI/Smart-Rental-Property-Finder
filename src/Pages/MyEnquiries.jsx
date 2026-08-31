import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

import Loading from "../Components/Loading";
import EmptyState from "../Components/EmptyState";

function MyEnquiries() {
  const [enquiries, setEnquiries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  const fetchEnquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/enquiries");

      setEnquiries(response.data);
    } catch (error) {
      setError("Failed to load enquiries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleEdit = (enquiry) => {
    setEditingId(enquiry.id);
    setEditMessage(enquiry.message);
  };

  const handleUpdate = async (id) => {
    try {
      setError("");

      await api.patch(`/enquiries/${id}`, {
        message: editMessage,
      });

      setEnquiries((currentEnquiries) =>
        currentEnquiries.map((enquiry) =>
          enquiry.id === id
            ? {
                ...enquiry,
                message: editMessage,
              }
            : enquiry
        )
      );

      setEditingId(null);
      setEditMessage("");
    } catch (error) {
      setError("Failed to update enquiry.");
    }
  };

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this enquiry?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      setError("");

      await api.delete(`/enquiries/${id}`);

      setEnquiries((currentEnquiries) =>
        currentEnquiries.filter(
          (enquiry) => enquiry.id !== id
        )
      );
    } catch (error) {
      setError("Failed to cancel enquiry.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="my-enquiries-page">
      <h1>📋 My Enquiries</h1>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {enquiries.length === 0 ? (
        <EmptyState message="You have not submitted any rental enquiries yet." />
      ) : (
        <div className="enquiry-list">
          {enquiries.map((enquiry) => (
            <div
              className="enquiry-card"
              key={enquiry.id}
            >
              <h2>{enquiry.propertyName}</h2>

              <p>
                <strong>Name:</strong> {enquiry.name}
              </p>

              <p>
                <strong>Email:</strong> {enquiry.email}
              </p>

              <p>
                <strong>Phone:</strong> {enquiry.phone}
              </p>

              <p>
                <strong>Status:</strong> {enquiry.status}
              </p>

              {editingId === enquiry.id ? (
                <div>
                  <textarea
                    value={editMessage}
                    onChange={(e) =>
                      setEditMessage(e.target.value)
                    }
                    rows="4"
                  />

                  <br />

                  <button
                    onClick={() =>
                      handleUpdate(enquiry.id)
                    }
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditMessage("");
                    }}
                  >
                    Cancel Edit
                  </button>
                </div>
              ) : (
                <p>
                  <strong>Message:</strong>{" "}
                  {enquiry.message}
                </p>
              )}

              {editingId !== enquiry.id && (
                <div>
                  <button
                    onClick={() => handleEdit(enquiry)}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() =>
                      handleCancel(enquiry.id)
                    }
                  >
                    ❌ Cancel Enquiry
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEnquiries;