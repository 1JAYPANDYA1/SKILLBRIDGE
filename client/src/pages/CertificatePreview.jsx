import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/certificate.css';
import { useParams } from 'react-router-dom';
import myimg from '../assets/images/myimg.png';
import BookLoader from '../components/BookLoader';
import Confetti from 'react-confetti';

const CertificatePreview = () => {
    const [username, setUsername] = useState('');
    const [courseName, setCourseName] = useState('');
    const [error, setError] = useState(null);
    const { courseId } = useParams();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const userData = JSON.parse(localStorage.getItem('user'));
            const userId = userData.userId;

            if (!userId) {
                setError('User ID not found in local storage');
                return;
            }

            try {
                const response = await axios.post(`${BACKEND_URL}/certificate`, {
                    userId,
                    courseId
                });

                setUsername(response.data.username);
                setCourseName(response.data.courseName);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch data');
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="pt-12 w-full h-screen flex items-center justify-center bg-indigo-50">
            <div className="certificate-container bg-indigo-100 px-[4vw] py-[4vh] shadow-md rounded-[2vh] box-border w-[85vw] max-w-[95vw] h-[85vh] max-h-[85vh] flex flex-col items-center justify-between">
                <div className="text-center mb-[4vh]">
                    <div className="w-[40%] max-w-[200px] mx-auto mb-[2vh]"> {/* Increased size */}
                        <img
                            src={myimg}
                            alt="Logo"
                            className="w-full h-full rounded-full object-cover"
                            crossOrigin="anonymous"
                        />
                    </div>
                    <h3 className="text-[calc(1rem+1.5vw)] my-[1.5vh] text-gray-800 uppercase">
                        Certificate Of Completion<br />
                        {courseName}
                    </h3>
                </div>
                <div className="w-full h-[0.4vh] bg-gray-800"></div>
                <div className="text-center text-[calc(0.8rem+1vw)] text-gray-600">
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        <p>
                            Congratulations <strong>{username}</strong> for successfully completing the <strong>{courseName} Course</strong>.
                        </p>
                    )}
                </div>
                {loading && <BookLoader />}
            </div>
        </div>
    );

};

export default CertificatePreview;