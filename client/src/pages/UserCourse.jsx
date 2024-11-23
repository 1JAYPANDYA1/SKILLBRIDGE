import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookLoader from '../components/BookLoader';
import { BookOpen } from 'lucide-react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import TrendingSkeleton from '../components/TrendingSkeleton';
// CourseCard Component

// RecommendedCourseCard Component
const RecommendedCourseCard = ({ course }) => {
  if (!course) {
    return <div>Error: Recommended course data is missing.</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-72 flex-shrink-0">
      <h3 className="text-lg font-bold mb-2">{course.course_name}</h3>
      <img
        src={course.thumbnail_pic_link}
        alt={course.course_name}
        className="w-full h-40 object-cover rounded-lg mb-2"
      />
      <p className="text-gray-500 mb-2">{course.course_type}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Learn More
      </button>
    </div>
  );
};

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

  const nextSlide = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex(prev => prev - 1);
  };

  // Handle the transition end and reset position if needed
  const handleTransitionEnd = () => {
    setIsSliding(false);
    const totalSlides = recommendations.length;

    if (currentIndex >= totalSlides + visibleSlides) {
      setCurrentIndex(visibleSlides);
    } else if (currentIndex <= visibleSlides - 1) {
      setCurrentIndex(totalSlides + visibleSlides - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
    const response = await axios.get(`http://${myIP}:3000/from/first-chapter-video/${courseId}`);
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

  if (loading1) {
    return <div><TrendingSkeleton /></div>;
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
        <div className="bg-indigo-50 mt-12 mb-8">
          <div className="container mx-auto px-4 pt-20 pb-8">
            <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold text-center mb-2">
              Recommend Courses
              <span className="block w-48 h-1 bg-[#5c8bf5] mx-auto mt-2"></span>
            </h1>
          </div>
          {recommendations.length > 0 ? (
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {expandedSlides.map((course, index) => (
                  <div
                    key={index}
                    className="min-w-[calc(100%/3)] flex-shrink-0 p-2"
                    style={{
                      width: `${100 / visibleSlides}%`,
                    }}
                  >
                    <div className="bg-white rounded-xl border border-indigo-950 shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 transform flex flex-col h-full">
                      <div className="h-40 sm:h-48 flex justify-center items-center overflow-hidden p-2">
                        <img
                          src={course.thumbnail_pic_link}
                          alt={course.course_name}
                          className="h-full w-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h5 className="text-lg sm:text-xl font-semibold mb-3 text-[#0F306D] line-clamp-2">
                          {course.course_name}
                        </h5>
                        <div className="mt-auto flex justify-center">
                            <button
                              className="bg-[#1A73E8] text-white py-2 px-4 rounded hover:bg-[#1558B1] transition-colors duration-300"
                              onClick={() => handleReadMoreClick(course)}
                            >
                              Read More
                            </button>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-300"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="bg-indigo-100 rounded-xl p-8 text-center shadow-md">
              <p className="text-gray-600 mb-2">
                No recommendations available at the moment.
              </p>
              <p className="text-gray-500">
                Check back later for personalized course suggestions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCoursesPage;
