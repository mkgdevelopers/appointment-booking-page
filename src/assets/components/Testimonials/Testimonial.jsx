import React, { useEffect, useState } from "react";
import { client } from "../../../prismicClient";
import { PrismicRichText } from "@prismicio/react";
import "./Testimonial.css";

const Testimonal = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const response = await client.getAllByType("testimonals");
      setTestimonials(response.concat(response)); 
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="testimonial-marquee">
      <h2 className="testimonial-title">What People Say</h2>
      <div className="testimonial-track">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <div className="feedback">
              <PrismicRichText field={testimonial.data.feedback} />
            </div>
            <div className="name">
              <PrismicRichText field={testimonial.data.name} />
            </div>
            <div className="role">
              <PrismicRichText field={testimonial.data.role} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonal;
