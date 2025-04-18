import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookLoader from '../components/BookLoader';
import profile from '../assets/images/profile.png'
const LeaderboardPage = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [user_rank, setUser_rank] = useState(0);
    const [loading, setLoading] = useState(true);
<<<<<<< HEAD
    const myIP = import.meta.env.VITE_MY_IP;
=======
    const myIP = import.meta.env.VITE_BACKEND_URL;
>>>>>>> 2cca578 (Initial commit or reconnect)

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const user_id = storedUser.userId;
            try {
<<<<<<< HEAD
                const response = await axios.get(`http://${myIP}:3000/leaderboard`);
=======
                const response = await axios.get(`${myIP}/leaderboard`);
>>>>>>> 2cca578 (Initial commit or reconnect)
                const users = response.data;
                setLeaderboardData(users);
                const currentUser = users.find((user) => user.user_id === user_id);
                setCurrentUser(currentUser);
                setUser_rank(users.findIndex((user) => user.user_id === user_id) + 1);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
                setLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    const renderLeaderboardTable = () => (
        <div className="overflow-x-auto border-2 border-indigo-300 rounded-xl mt-6 shadow-md">
            <table className="w-full bg-white shadow-lg rounded-xl">
                <thead className="bg-indigo-500 text-white rounded-t-xl">
                    <tr>
                        <th className="py-5 px-5 text-center w-1/4 rounded-tl-xl text-indigo-50">Rank</th>
                        <th className="py-5 px-5 text-left text-indigo-50">Profile</th>
                        <th className="py-5 px-5 text-center w-1/4 text-indigo-50">Username</th>
                        <th className="py-5 px-5 text-center w-1/4 rounded-tr-xl text-indigo-50">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.slice(0, 5).map((user, index) => (
                        <tr
                            key={user.username}
                            className={`transition-all duration-300 hover:bg-indigo-200 ${index % 2 === 0 ? 'bg-indigo-100' : 'bg-indigo-50'} ${index === leaderboardData.slice(0, 5).length - 1 ? 'rounded-bl-xl rounded-br-xl' : 'border-b border-indigo-200'}`}
                        >
                            <td className="py-3 px-3 text-center">{index + 1}</td>
                            <td className="py-3 px-3 flex items-center">
                                <img src={user.profilePic} alt={profile} className="w-10 h-10 rounded-full mr-3" />
                                <span>{`${user.first_name} ${user.last_name}`}</span>   
                            </td>
                            <td className="py-3 px-3 text-center">{user.username}</td>
                            <td className="py-3 px-3 text-center">{user.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderCurrentUserDetails = () => (
        <div className="mt-3 bg-indigo-50 rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0 md:pl-8">
                    <img src={currentUser.profilePic} alt={currentUser.username} className="w-20 h-20 md:w-24 md:h-24 rounded-full mr-4 shadow-md border-2 border-indigo-300" />
                    <div>
                        <p className="text-lg md:text-xl font-bold">
                            <span className="font-semibold text-indigo-700">Username:</span> {currentUser.username}
                        </p>
                    </div>
                </div>
                <div className="flex-grow text-center mb-4 md:mb-0">
                    <p className="text-2xl md:text-3xl font-extrabold text-indigo-800">{`${currentUser.first_name} ${currentUser.last_name}`}</p>
                </div>
                <div className="flex flex-col items-center md:items-end md:pr-16">
                    <p className="text-lg md:text-xl font-bold text-gray-600">
                        <span className="text-indigo-700">Rank:</span> {user_rank}
                    </p>
                    <p className="text-lg md:text-xl font-medium text-gray-700">
                        <span className="font-semibold text-indigo-700">Points:</span> {currentUser.points}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-indigo-200 p-10">
            <div className="flex-grow mt-11 p-6">
                <h1 className="text-4xl font-bold text-indigo-800 text-center">Leaderboard</h1>
                <span className="block w-32 h-0.5 bg-[#5c8bf5] mx-auto mt-2"></span>
                {loading ? (
                    <BookLoader />
                ) : (
                    <>
                        {renderLeaderboardTable()}
                        {currentUser && renderCurrentUserDetails()}
                    </>
                )}
            </div>
        </div>
    );
};

export default LeaderboardPage;