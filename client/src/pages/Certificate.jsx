import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/certificate.css';
import { useParams } from 'react-router-dom';
import myimg from '../assets/images/myimg.png';
import BookLoader from '../components/BookLoader';
import Confetti from 'react-confetti';
import html2canvas from 'html2canvas';

const Certificate = () => {
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

    const generateImage = async () => {
        try {
            setLoading(true);
            const userData = JSON.parse(localStorage.getItem('user'));
            const userId = userData.userId;

            const certificateElement = document.querySelector('.certificate-container');
            const canvas = await html2canvas(certificateElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#F5F7FF',
                logging: true,
                width: certificateElement.offsetWidth,
                height: certificateElement.offsetHeight
            });

            canvas.toBlob(async (blob) => {
                const imageFile = new File([blob], `${username}-certificate.png`, { type: 'image/png' });
                const mimeType = imageFile.type;
                const response = await axios.get(`${BACKEND_URL}/auth/presignedurl`, {
                    params: { mimeType }
                });
                const presignedUrl = response.data.url;
                const formData = new FormData();

                formData.append("bucket", response.data.fields["bucket"]);
                formData.append("Content-Type", mimeType);
                formData.append("X-Amz-Algorithm", response.data.fields["X-Amz-Algorithm"]);
                formData.append("X-Amz-Credential", response.data.fields["X-Amz-Credential"]);
                formData.append("X-Amz-Date", response.data.fields["X-Amz-Date"]);
                formData.append("Policy", response.data.fields["Policy"]);
                formData.append("X-Amz-Signature", response.data.fields["X-Amz-Signature"]);
                formData.append("key", response.data.fields["key"]);
                formData.append("file", imageFile);

                await axios.post(presignedUrl, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                const imageUrl = `${import.meta.VITE_CLOUDFRONT_URL}/${response.data.fields["key"]}`;

                await axios.post(`${BACKEND_URL}/certificate/storeImage`, {
                    userId,
                    courseId,
                    imageUrl
                }).then(console.log("suess")).catch((error) => {
                    console.log("error ", error)
                });

                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `${username}-certificate.png`;
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(downloadUrl);

            }, 'image/png', 1.0);

        } catch (error) {
            console.error('Error generating and downloading certificate:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="mt-10 w-full h-screen flex items-center justify-center bg-indigo-50">
            <Confetti />
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

                    <h3 className="text-[calc(1rem+1vw)] my-[1.5vh] text-gray-800 uppercase">
                        Certificate Of Completion<br />
                        {courseName}
                    </h3>
                </div>
                <div className="w-full h-[0.4vh] bg-gray-800 my-[1.5vh]"></div>
                <div className="text-center text-[calc(0.8rem+0.8vw)] text-gray-600">
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        <p>
                            Congratulations <strong>{username}</strong> for successfully completing the <strong>{courseName} Course</strong>.
                        </p>
                    )}
                </div>
                <button
                    onClick={generateImage}
                    className="bg-green-500 px-4 py-4"
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Download Certificate'}
                </button>
                {loading && <BookLoader />}
            </div>
        </div>
    );
};

export default Certificate;