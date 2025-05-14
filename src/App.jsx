import React, { useState , useRef, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css'
import Header from './assets/components/Header/Header';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('')

  const timeSlots = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  const mainRef = useRef(null);
  

  function onSubmit(data){
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time.');
      return;
    }

    setConfirmed(true);

    document.getElementsByClassName('')
    console.log({
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      date: selectedDate.toDateString(),
      time: selectedTime,
    });
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  useEffect(() => {
    if (confirmed) {
      mainRef.current?.classList.add('blur');
    } else {
      mainRef.current?.classList.remove('blur');
    }
  }, [confirmed]);
  
  
  const handleDateClick = (date) => {
    if (isWeekend(date)) {
      setError("❌ Cannot book on weekends!");
      setSelectedDate('');
    } else {
      setSelectedDate(date)
      setError('');
    }
  };

  return (
    <div className="outerMain">

  <div ref={mainRef} className="main">
    <Header/>
    <div className="hero">
      <h1>At Vista : </h1>
      <h2>We are dedicated to simplifying lives through intelligent and innovation technology. By combining the power of AI with cutting-edge solution, we help businesses and individual tackle today’s challenges and prepare for tomorrow’s need.</h2>
    </div>

    <div className='container'>

      <h1 className='heading'>Schedule Smarter with Vista</h1>
<div className="dateAndTime">

      <div className='section'>
        <label className='label'>Select time:</label>
        <Calendar
          onChange={(date) => {
            handleDateClick(date)
            setConfirmed(false);
          }}
          value={selectedDate}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

        <div className='section'>
          <div className='timeSlotContainer'>
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                style={{
                  height:'50px',
                  width:'100px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  border:'none',
                  boxShadow:'0 0 10px #302f2f',
                  margin:'10px 10px',
                  backgroundColor: selectedTime === time ? '#006edc' : 'white',
                  color: selectedTime === time ? '#fff' : '#000',
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

          <div className="field">
            <label className="label">Current job</label>
            <input 
            type="text"
            {...register('currentJob', {required: true})}
            className='input'
            />
            {errors.currentJob && <p className='error'>Current Job is required</p>}
          </div>

          <button type="submit" className='submitButton'>Book Appointment</button>
        </form>
      )}
      {/* Confirmation */}
      
    </div>
    </div>
    {confirmed &&(
        <div  className="popup">
        <div className="popup-content">
          <h2>Appointment Confirmed!</h2>
          <p>Your booking has been successfully scheduled on {selectedDate.toDateString()} at {selectedTime}.</p>
          <button onClick={() => {
            setConfirmed(false)
            window.location.reload()}
            }>Okay</button>

        </div>
      </div>
      )}
    </div>
  );
}
