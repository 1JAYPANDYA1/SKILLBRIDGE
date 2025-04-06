import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SkeletonLoader from '../components/SkeletonLoader'; // Import the skeleton loader
import BookLoader from './BookLoader';

const CustomSlider = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(false);
<<<<<<< HEAD
    const myIP = import.meta.env.VITE_MY_IP;
=======
    const myIP = import.meta.env.VITE_BACKEND_URL;
>>>>>>> 2cca578 (Initial commit or reconnect)
    const navigate = useNavigate();
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
        const fetchTrendingCourses = async () => {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData != null) {
                const userId = userData.userId;
                try {
<<<<<<< HEAD
                    const response = await fetch(`http://${myIP}:3000/course/trending`, {
=======
                    const response = await fetch(`${myIP}/course/trending`, {
>>>>>>> 2cca578 (Initial commit or reconnect)
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userId }),
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
            } else {
                try {
<<<<<<< HEAD
                    const response = await fetch(`http://${myIP}:3000/course/trending`, {
=======
                    const response = await fetch(`${myIP}/course/trending`, {
>>>>>>> 2cca578 (Initial commit or reconnect)
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
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
            }
        };

        fetchTrendingCourses();
    }, []);

    // Auto-sliding functionality
    useEffect(() => {
        if (data.length === 0) return;
    }, [data]);

    const resumeCourse = async (course) => {
        setLoading1(true);
        const courseId = course.course_id;
        try {
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
    }
    const viewCertificate = (course) => {
        setLoading1(true);
        navigate(`/certificate/${ course.course_id }`);
        setLoading1(false);
    };


    if (loading1) {
        return <BookLoader />;
    }

    const handlePrevClick = () => {
        sliderRef.current.slickPrev();
    };

    const handleNextClick = () => {
        sliderRef.current.slickNext()
    };
    return (
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold relative inline-block pb-2.5 mb-6">
                    Trending Courses
                    <span className="block w-32 h-0.5 bg-[#5c8bf5] mx-auto mt-2"></span>
                </h1>
            </div>
            <div className="my-8 relative bg-indigo-200 overflow-hidden">
                {loading ? (
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
                            {data.map(course => (
                                <div key={course.id} className="p-2">
                                    <div className="flex flex-col items-center p-2 rounded-xl shadow-sm bg-white border-2 border-indigo-950 animate-border">
                                        <div className="w-full h-40 sm:h-48 flex justify-center items-center overflow-hidden p-1">
                                            <img
                                                src={course.thumbnail_pic_link}
                                                alt={course.title}
                                                className="h-full w-full object-cover rounded-xl"
                                            />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[#0F306D] line-clamp-2">{course.title}</h3>
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
                                                    onClick={() => readMore(course)}
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
    );

};

export default CustomSlider;