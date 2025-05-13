import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css'

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const timeSlots = ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'];

  function onSubmit(data){
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time.');
      return;
    }

    setConfirmed(true);
    console.log({
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: selectedDate.toDateString(),
      time: selectedTime,
    });
  };

  return (
  <div className="main">

    <h1>A Simple Appointment Booking React App</h1>

    <div className='container'>

      <h2 className='heading'>Book an Appointment for Internship</h2>
<div className="dateAndTime">

      <div className='section'>
        <label className='label'>Select a Date:</label>
        <Calendar
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedTime('');
            setConfirmed(false);
          }}
          value={selectedDate}
        />
      </div>

{selectedDate && (
        <div className='section'>
          <label className='label'>Available Time Slots:</label>
          <div className='timeSlotContainer'>
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '4px',
                  border: '1px solid #000000',
                  cursor: 'pointer',
                  fontSize: '14px',
                  backgroundColor: selectedTime === time ? '#547792' : '#eee',
                  color: selectedTime === time ? '#fff' : '#000',
                }}
              >
                {time}

              </button>
            ))}
          </div>
        </div>
)}

</div>

      {/* Form */}
      {selectedDate && selectedTime && !confirmed && (
        <form onSubmit={handleSubmit(onSubmit)} className='form'>

          <div className='field'>

            <label className='label'>Full Name:</label>
            <input
              type="text"
              {...register('fullName', { required: true })}
              className='input'
            />
            {errors.fullName && <p className='error'>Name is required</p>}
          </div>

          <div className='field'>
            <label className='label'>Email:</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className='input'
            />
            {errors.email && <p className='error'>Email is required</p>}
          </div>

          <div className='field'>
            <label className='label'>Phone:</label>
            <input
              type="tel"
              {...register('phone', { required: true })}
              className='input'
            />
            {errors.phone && <p className='error'>Phone number is required</p>}
          </div>

          <button type="submit" className='submitButton'>Book Appointment</button>
        </form>
      )}

      {/* Confirmation */}
      {confirmed && (
        <div className='confirmation'>
          ✅ Your appointment is booked for {selectedDate.toDateString()} at {selectedTime}
        </div>
      )}
    </div>
    </div>
  );
}
