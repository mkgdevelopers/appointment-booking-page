// src/components/FAQ/FAQ.jsx
import React, { useEffect, useState } from "react";
import { client } from "../../../prismicClient"; 
import { PrismicRichText } from "@prismicio/react";
import "./FAQ.css";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      const response = await client.getAllByType("faq");
      setFaqs(response);
    };
    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <PrismicRichText field={faq.data.question} />
              <span className={`arrow ${activeIndex === index ? "rotate" : ""}`}>⌄</span>
            </div>
            <div className={`faq-answer ${activeIndex === index ? "open" : ""}`}>
              {activeIndex === index && (
                <PrismicRichText field={faq.data.answer} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
