// src/assets/components/Services/Services.jsx
import React, { useEffect, useState } from 'react';
import { client } from '../../../prismicClient';
import { PrismicImage, PrismicRichText } from '@prismicio/react';
import './Service.css'
import Header from '../../components/Header/Header';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await client.getAllByType('services');
      setServices(response);
    };
    fetchServices();
  }, []);

  return (
    <div>
        <Header/>
        <div className="service-container">
      <h1 className='title'>Our Services</h1>
      <div className="service-section">
      {services.map((service) => (
        <div key={service.id} className="service-card">
          <PrismicRichText field={service.data.title} />
          <PrismicRichText field={service.data.content} />
        </div>
      ))}
      </div>
    </div>
    </div>
  );
};

export default Services;
