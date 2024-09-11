import React, { useState, useEffect } from 'react';
import './Carousel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(6);

  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width <= 1440) {
        setVisibleItems(5);
      } else if (width <= 1920) {
        setVisibleItems(6);
      } else {
        setVisibleItems(6);
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);

    return () => {
      window.removeEventListener('resize', updateVisibleItems);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < data.length - visibleItems) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isNextDisabled = currentIndex >= data.length - visibleItems;
  const isPrevDisabled = currentIndex <= 0;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const starsArray = [];
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(<FontAwesomeIcon key={i} icon={faStar} className="star-icon" />);
    }
    return starsArray;
  };

  return (
    <div className="carousel-container">
      <button className="arrow-button prev" onClick={handlePrev} disabled={isPrevDisabled}>
        &lt;
      </button>
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleItems}%)`,
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          {data.map((item, index) => (
            <div key={index} className="carousel-item">
              <img src={item.imageUrl} alt={`Item ${index + 1}`} />
              <div className="description">
                <h4>{item.title}</h4>
                <p><strong>Instructors:</strong> {item.instructors.join(', ')}</p>
                <p><strong>Rating:</strong> {item.rating} {renderStars(item.rating)} ({item.reviewCount} reviews)</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="arrow-button next" onClick={handleNext} disabled={isNextDisabled}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
