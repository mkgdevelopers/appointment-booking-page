import Header from "../../components/Header/Header";
import Services from "../Service/Service";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Home.css";
import Testimonal from "../../components/Testimonials/Testimonial";
import FAQ from "../../components/FAQ/FAQ";
import { adminClient } from "../../../sanityClient";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const mainRef = useRef(null);

  const timeSlots = [
    "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
  ];

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleDateClick = (date) => {
    if (isWeekend(date)) {
      setError("❌ Cannot book on weekends!");
      setSelectedDate("");
    } else {
      setSelectedDate(date);
      setError("");
      setConfirmed(false);
    }
  };

  useEffect(() => {
    if (confirmed) {
      mainRef.current?.classList.add("blur");
    } else {
      mainRef.current?.classList.remove("blur");
    }
  }, [confirmed]);

  async function onSubmit(data) {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }

    setLoading(true);

    const appointment = {
      _type: "appointment",
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      currentJob: data.currentJob,
      date: selectedDate.toISOString(),
      time: selectedTime,
    };

    try {
      const existing = await adminClient.fetch(
        `*[_type == "appointment" && date == $date && time == $time]`,
        {
          date: appointment.date,
          time: appointment.time,
        }
      );

      if (existing.length > 0) {
        alert("This slot is already booked.");
        return;
      }

      await adminClient.create(appointment);

      // Send email
      await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment),
      });

      setConfirmed(true);
      reset();

    } catch (err) {
      console.error("Error saving to Sanity:", err);
      alert("Something went wrong while saving. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="outerMain">
        <div ref={mainRef} className="main">
          <Header />

          <div className="content">
            <div className="hero">
              <h1>At Vista :</h1>
              <h2>
                We are dedicated to simplifying lives through intelligent and
                innovation technology. By combining the power of AI with
                cutting-edge solution, we help businesses and individuals tackle
                today’s challenges and prepare for tomorrow’s need.
              </h2>
            </div>

            <div className="container">
              <h1 className="heading">Schedule Smarter with Vista</h1>
              <div className="dateAndTime">
                <div className="section">
                  <label className="label">Select time:</label>
                  <Calendar
                    minDate={new Date()}
                    onChange={handleDateClick}
                    value={selectedDate}
                  />
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>

                <div className="section">
                  <div className="timeSlotContainer">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() =>
                          setSelectedTime(selectedTime === time ? "" : time)
                        }
                        style={{
                          height: "50px",
                          width: "100px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontSize: "14px",
                          border: "none",
                          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                          margin: "10px 10px",
                          backgroundColor:
                            selectedTime === time
                              ? "#006edc"
                              : "rgba(255,255,255,0.5)",
                          color: selectedTime === time ? "#fff" : "#000",
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form */}
              {selectedDate && selectedTime && !confirmed && (
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                  <div className="field">
                    <label className="label">Full Name:</label>
                    <input
                      type="text"
                      {...register("fullName", { required: true })}
                      className="input"
                    />
                    {errors.fullName && (
                      <p className="error">Name is required</p>
                    )}
                  </div>

                  <div className="field">
                    <label className="label">Email:</label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email format",
                        },
                      })}
                      className="input"
                    />
                    {errors.email && (
                      <p className="error">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="field">
                    <label className="label">Phone:</label>
                    <input
                      type="tel"
                      {...register("phone", { required: true })}
                      className="input"
                    />
                    {errors.phone && (
                      <p className="error">Phone number is required</p>
                    )}
                  </div>

                  <div className="field">
                    <label className="label">Current job:</label>
                    <input
                      type="text"
                      {...register("currentJob", { required: true })}
                      className="input"
                    />
                    {errors.currentJob && (
                      <p className="error">Current job is required</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="submitButton"
                    disabled={loading}
                  >
                    {loading ? "Booking..." : "Book Appointment"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Confirmation */}
        {confirmed && (
          <div className="popup">
            <div className="popup-content">
              <h2>Appointment Confirmed!</h2>
              <p>
                Your appointment has been successfully scheduled on{" "}
                {selectedDate && selectedDate.toDateString()} at {selectedTime}.
              </p>
              <button
                onClick={() => {
                  setConfirmed(false);
                  setSelectedDate("");
                  setSelectedTime("");
                }}
              >
                Okay
              </button>
            </div>
          </div>
        )}
      </div>

      <Testimonal />
      <FAQ />
    </>
  );
};

export default Home;
