import React, { useEffect, useState } from "react";
import { adminClient } from "../../../sanityClient";
import "./Appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const data = await adminClient.fetch(`*[_type == "appointment"] | order(_createdAt desc)`);
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const deleteAppointment = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
      await adminClient.delete(id);
      fetchAppointments(); 
    } catch (err) {
      console.error("Error deleting appointment:", err);
      alert("Failed to delete appointment.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (appointments.length === 0) return <p>No appointments found.</p>;

  return (
    <div className="admin-appointments-container">
      <h2 className="admin-appointments-title">All Appointments</h2>
      <div className="admin-appointments-list">
        {appointments.map((app) => (
          <div key={app._id} className="admin-appointment-card">
            <p><strong>Name:</strong> {app.fullName}</p>
            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Phone:</strong> {app.phone}</p>
            <p><strong>Job:</strong> {app.currentJob}</p>
            <p><strong>Date:</strong> {app.date}</p>
            <p><strong>Time:</strong> {app.time}</p>
            <button className="admin-appointment-delete-btn" onClick={() => deleteAppointment(app._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
