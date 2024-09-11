import React, { useEffect, useState } from 'react';
import './App.css';
import Carousel from './Carousel.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3003/courses')
      .then(response => response.json())
      .then(data => {
        console.log("Courses data from backend:", data);
        setCoursesData(data.courses);
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const starsArray = [];
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(<FontAwesomeIcon key={i} icon={faStar} className="star-icon" />);
    }
    return starsArray;
  };

  return (
    <div className="App">
      <div className='menu-wrapper'>
        <a className='link' >Home</a>
        <a className='link' >Courses</a>
        <a className='link' >About</a>
        <a className='link' >Contact</a>
      </div>
      <div className="carousel-wrapper">
        {coursesData.map((category) => (
          <div key={category.id}>
            {category.courseType.includes('Full Stack Web Development') ? (
              <h2>
                <span>Top courses in </span>
                <a >
                  {category.courseType}
                </a>
              </h2>
            ) : (
              <h2>
                {category.courseType}
                {category.courseType === "Based on your skill interests, we recommend" && (
                  <a  className="edit-skill-link">Edit skill interests</a>
                )}
              </h2>
            )}
            <Carousel data={category.courseList.map(course => ({
                ...course,
                ratingStars: renderStars(course.rating) 
              }))} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
