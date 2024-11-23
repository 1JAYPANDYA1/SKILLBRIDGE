import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookLoader from './BookLoader';
import TrendingSkeleton from './TrendingSkeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CustomSlider = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(false);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const myIP = import.meta.env.VITE_MY_IP;
    const navigate = useNavigate();
    const [visibleSlides, setVisibleSlides] = useState(3);
    const [isSliding, setIsSliding] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(visibleSlides);

    // Create array with cloned items for infinite scroll
    const getExpandedSlides = useCallback(() => {
        if (!data.length) return [];
        const beforeClones = data.slice(-visibleSlides);
        const afterClones = data.slice(0, visibleSlides);
        return [...beforeClones, ...data, ...afterClones];
    }, [data, visibleSlides]);

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
        const totalSlides = data.length;

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

    useEffect(() => {
        const fetchTrendingCourses = async () => {
            const userData = JSON.parse(localStorage.getItem('user'));
            const userId = userData?.userId;

            try {
                const response = await fetch(`${BACKEND_URL}/course/trending`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userId ? { userId } : {}),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching trending courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingCourses();
    }, []);

    const viewCertificate = (course) => {
        setLoading1(true);
        navigate(`/certificate/${course.course_id}`);
        setLoading1(false);
    };

    const resumeCourse = async (course) => {
        setLoading1(true);
        const courseId = course.course_id;
        try {
            const response = await axios.get(`http://${myIP}:3000/from/first-chapter-video/${courseId}`);
            const data = response.data;
            if (response.status === 200) {
                const chapter_id = data.chapter_id;
                const video_id = data.video_id;
                navigate(`/video?course_id=${courseId}&chapter_id=${chapter_id}&video_id=${video_id}`);
            } else {
                console.error('Error fetching chapter and video:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading1(false);
        }
    };

    const readMore = (course) => {
        setLoading1(true);
        navigate(`/courseDetails?course_id=${course.course_id}`);
        setLoading1(false);
    };

    if (loading1) {
        return <BookLoader />;
    }

    const expandedSlides = getExpandedSlides();

    return (
        <div className="container mx-auto px-4 relative">
            <div className="text-center">
                <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold relative inline-block pb-2.5 mb-6">
                    Trending Courses
                    <span className="block w-32 h-0.5 bg-[#5c8bf5] mx-auto mt-2"></span>
                </h1>
            </div>
            <div className="my-8 relative bg-indigo-200 overflow-hidden">
                {loading ? (
                    <TrendingSkeleton />
                ) : (
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
                                                alt={course.title}
                                                className="h-full w-full object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h5 className="text-lg sm:text-xl font-semibold mb-3 text-[#0F306D] line-clamp-2">
                                                {course.title}
                                            </h5>
                                            <div className="mt-auto flex justify-center">
                                                {!course.purchased ? (
                                                    <button
                                                        className="bg-[#1A73E8] text-white py-2 px-4 rounded hover:bg-[#1558B1] transition-colors duration-300"
                                                        onClick={() => readMore(course)}
                                                    >
                                                        Read More
                                                    </button>
                                                ) : course.completed_course === 100 ? (
                                                    <button
                                                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
                                                        onClick={() => resumeCourse(course)}
                                                    >
                                                        Completed Course
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors duration-300"
                                                        onClick={() => resumeCourse(course)}
                                                    >
                                                        Resume
                                                    </button>
                                                )}
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
                )}
            </div>
        </div>
    );
};

export default CustomSlider;