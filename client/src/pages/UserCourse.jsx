import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookLoader from '../components/BookLoader';
import { BookOpen } from 'lucide-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import TrendingSkeleton from '../components/TrendingSkeleton';
// CourseCard Component
import SkeletonLoader from '../components/SkeletonLoader'; // Import the skeleton loader


// UserCoursesPage Component
const UserCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [noCourses, setNoCourses] = useState(false);
  const navigate = useNavigate();
  const myIP = import.meta.env.VITE_MY_IP;
  const [isSliding, setIsSliding] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);

  // Create array with cloned items for infinite scroll
  const getExpandedSlides = useCallback(() => {
    if (!recommendations.length) return [];
    const beforeClones = recommendations.slice(-visibleSlides);
    const afterClones = recommendations.slice(0, visibleSlides);
    return [...beforeClones, ...recommendations, ...afterClones];
  }, [recommendations, visibleSlides]);

  const handlePrevClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current.slickNext()
  };
  let sliderRef = React.createRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    swipeToSlide: true,
    touchMove: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 }
      }
    ]
  };


  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      let newVisibleSlides;
      if (width < 640) {
        newVisibleSlides = 1;
      } else if (width < 1024) {
        newVisibleSlides = 2;
      } else {
        newVisibleSlides = 3;
      }
      setVisibleSlides(newVisibleSlides);
      setCurrentIndex(newVisibleSlides);
    };

    window.addEventListener("resize", updateSlides);
    updateSlides();

    return () => window.removeEventListener("resize", updateSlides);
  }, []);


  const resumeCourse = async (course) => {
    setLoading(true);
    const courseId = course.course_id;
    console.log("resuming", courseId);
<<<<<<< HEAD
    const response = await axios.get(`http://${myIP}:3000/from/first-chapter-video/${courseId}`);
=======
    const response = await axios.get(`${myIP}/from/first-chapter-video/${courseId}`);
>>>>>>> 2cca578 (Initial commit or reconnect)
    const data = response.data;
    if (response.status === 200) {
      const chapter_id = data.chapter_id;
      const video_id = data.video_id;
      navigate(`/video?course_id=${courseId}&chapter_id=${chapter_id}&video_id=${video_id}`);
      setLoading(false);
    } else {
      console.error('Error fetching chapter and video:', data.message);
    }
  };
  const handleReadMoreClick = (course) => {
    setLoading(true)
    navigate(`/courseDetails?course_id=${course.courseId}`);
    setLoading(false)
  };
  const viewCertificate = (course) => {
    console.log("course : ", course.course)
    setLoading(true);
    navigate(`/certificate/${course.course.course_id}`);
    setLoading(false);
  };

  useEffect(() => {
    const fetchUserCourses = async () => {
      const userId = JSON.parse(localStorage.getItem('user')).userId;
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      try {
        const response = await axios.post(`${BACKEND_URL}/user/getusercourses`, { userId: userId });

        if (Array.isArray(response.data) && response.data.length > 0) {
          console.log("course : ", response.data);
          setCourses(response.data);
          setNoCourses(false);
        } else {
          console.warn('You have no purchases');
          setNoCourses(true);
        }

        // Fetch recommendations based on enrolled courses
        const enrolledCourses = response.data.map((course) => ({
          title: course.course.title,
          description: course.course.description,
        }));
        setLoading1(true)
        const recResponse = await axios.post(
          `http://${myIP}:8000/course_recommendations/getrecommendations/`,
          { user_courses: enrolledCourses },
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log(recResponse.data.recommendations)
        setRecommendations(recResponse.data.recommendations);
        setLoading(false);
        setLoading1(false);
      } catch (error) {
        console.error('Error fetching user courses:', error);
        setLoading(false);
        setLoading1(false);
      }
    };

    fetchUserCourses();
  }, []);

  if (loading) {
    return <div><BookLoader /></div>;
  }

  const expandedSlides = getExpandedSlides();

  return (
    <div className="min-h-screen bg-indigo-50">
      {/* Header Section */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold text-center mb-2">
          My Courses
          <span className="block w-24 h-1 bg-[#5c8bf5] mx-auto mt-2"></span>
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4">
        {noCourses ? (
          // Empty State
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-indigo-100  rounded-xl shadow-lg p-8 mx-auto max-w-2xl">
            <BookOpen className="w-20 h-20 text-indigo-500 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              No Courses Yet
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-md">
              You haven't purchased any courses yet. Explore our catalog to find courses
              that match your interests and start your learning journey.
            </p>
            <button
              onClick={() => navigate('/course')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-4 transition-all duration-500 ease-in-out">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-indigo-950 shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 transform flex flex-col h-full"
              >
                <div className="h-40 sm:h-48 flex justify-center items-center overflow-hidden p-2">
                  <img
                    src={course.course.thumbnail_pic_link}
                    alt={course.course.title}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h5 className="text-lg sm:text-xl font-semibold mb-3 text-[#0F306D] line-clamp-2">{course.course.title}</h5>
                  <p className="text-gray-500 mb-2">{course.completed_course}% completed</p>
                  <div className="w-full bg-gray-300 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${course.completed_course}%` }}
                    ></div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    {course.completed_course === 100 ? (
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={() => viewCertificate(course)}>
                        View Certificate
                      </button>
                    ) : (
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg" onClick={() => resumeCourse(course.course)}>
                        Resume
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations Section */}
        <div className="container mx-auto px-4 mt-20">
          <div className="text-center">
            <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold relative inline-block pb-2.5 mb-6">
              Recommended Courses
              <span className="block w-64 h-1 bg-[#5c8bf5] mx-auto mt-2"></span>
            </h1>
          </div>
          <div className="my-8 relative bg-indigo-50 overflow-hidden">
            {loading1 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(4).fill().map((_, index) => (
                  <SkeletonLoader key={index} />
                ))}
              </div>
            ) : (
              <div className="w-full mx-auto relative">
                <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
                  <button
                    onClick={handlePrevClick}
                    className="bg-[#324aad] text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <ChevronLeftIcon size={24} />
                  </button>
                </div>
                <Slider ref={sliderRef} {...settings} className='ml-12 mr-12'>
                  {recommendations.map(course => (
                    <div key={course.id} className="p-2">
                      <div className="flex flex-col items-center p-2 rounded-xl shadow-sm bg-white border-2 border-indigo-950 animate-border">
                        <div className="w-full h-40 sm:h-48 flex justify-center items-center overflow-hidden p-1">
                          <img
                            src={course.thumbnail_pic_link}
                            alt={course.course_name}
                            className="h-full w-full object-cover rounded-xl"
                          />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[#0F306D] line-clamp-2">{course.course_name}</h3>
                        <div className="mt-4 flex justify-center">
                          {course.completed_course === 100 ? (
                            <button
                              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
                              onClick={() => viewCertificate(course)}
                            >
                              View Certificate
                            </button>
                          ) : course.purchased ? (
                            <button
                              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors duration-300"
                              onClick={() => resumeCourse(course)}
                            >
                              Resume
                            </button>
                          ) : (
                            <button
                              className="bg-[#1A73E8] text-white py-2 px-4 rounded hover:bg-[#1558B1] transition-colors duration-300"
                              onClick={() => handleReadMoreClick(course)}
                            >
                              Read More
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
                <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10">
                  <button
                    onClick={handleNextClick}
                    className="bg-[#324aad] text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <ChevronRightIcon size={24} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCoursesPage;
