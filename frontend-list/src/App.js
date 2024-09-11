import React, { useEffect, useState } from 'react';
import './App.css';
import Carousel from './Carousel.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Home = () => <h1>Home Page</h1>;
const Courses = () => <h1>Courses Page</h1>;
const About = () => <h1>About Us</h1>;
const Contact = () => <h1>Contact Us</h1>;

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
    <Router>
      <div className="App">
        <div className='menu-wrapper'>
          <Link className='link' to="/">Home</Link>
          <Link className='link' to="/courses">Courses</Link>
          <Link className='link' to="/about">About</Link>
          <Link className='link' to="/contact">Contact</Link>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={
            <div className="carousel-wrapper">
            {coursesData.length > 0 && coursesData.map((category) => (
              <div key={category.id}>
                {category.courseType.includes('Full Stack Web Development') ? (
                  <h2>
                    <span>Top courses in </span>
                    <Link to="/courses/full-stack-web-development">
                      {category.courseType}
                    </Link>
                  </h2>
                ) : (
                  <h2>
                    {category.courseType}
                    {category.courseType === "Based on your skill interests, we recommend" && (
                      <a className="edit-skill-link">Edit skill interests</a>
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
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
