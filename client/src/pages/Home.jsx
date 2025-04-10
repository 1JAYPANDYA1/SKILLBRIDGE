import React from 'react';
import four from "../assets/images/hero-img.png";
import NumAnimation from '../components/NumAnimation';
import TrendingCourse from '../components/TrendingCourse';
import Testimonials from './Testimonials';
import AboutPage from '../pages/AboutPage';
import {useNavigate} from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  const handlelearning = () => {
    navigate('/course')
  }
  return (
    <div className="home-page bg-indigo-200">
      {/* Hero Section */}
      <div className="h-screen bg-[#3d52a0] flex flex-col md:flex-row items-center justify-center p-6 md:p-8">
        {/* Centered text */}
        <div className="text-white text-center space-y-4 md:space-y-6 w-full md:w-1/2 max-w-lg md:max-w-md px-4 md:px-6">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 md:mt-8">
            Elevate Your Skills With <span className="text-yellow-400">Skill Bridge</span>
          </div>
          <p className="text-sm sm:text-base md:text-lg max-w-lg mx-auto">
            Whether You're Looking To Advance Your Career, Learn Something New, Or Explore A Passion, Skill Bridge
            Offers Courses That Help You Gain The Knowledge And Expertise to Succeed. From Technology To Business,
            Creative Skills, And More — Unlock Your Potential Today.
          </p>
          <button
            className="bg-yellow-400 text-blue-900 font-semibold py-2 px-4 sm:px-6 rounded-lg hover:bg-yellow-500 transition duration-300"
            onClick={handlelearning}
          >
            Start Learning Now
          </button>
        </div>

        {/* Image with responsive sizing */}
        <img
          src={four}
          alt="Moving Image"
          className="mt-8 md:mt-0 md:ml-4 h-40 sm:h-56 md:h-80 lg:h-[32rem] w-auto animate-upDown"
        />
      </div>

      {/* Responsive section wrappers */}
      <div className="py-12 md:py-16 flex justify-center">
        <TrendingCourse />
      </div>
      <div className="py-12 md:py-16 flex justify-center">
        <NumAnimation />
      </div>
      <div className="py-12 md:py-16 flex justify-center w-full">
        <Testimonials />
      </div>
      <div className="py-12 md:py-16 flex justify-center">
        <AboutPage />
      </div>
    </div>
  );


};

export default Home;
