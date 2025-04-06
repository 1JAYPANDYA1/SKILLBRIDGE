import React from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { FaChartPie, FaUsers, FaChartLine, FaUserGraduate, FaStar } from 'react-icons/fa';
import CourseEnrollmentChart from '../components/CourseEnrollmentChart';
import CourseDistributionChart from '../components/CourseDistributionChart';
import UserEngagementOverTimeChart from '../components/UserEngagementOverTimeChart';
import EnrollmentDistributionChart from '../components/EnrollmentDistributionChart';
import CourseRatingsChart from '../components/CourseRatingChart';

const AdminPage = () => {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-indigo-200 lg:flex-row flex-col">
            {/* Sidebar */}
            <div className="w-full lg:w-20 bg-indigo-900 text-white flex lg:flex-col items-center py-5 lg:py-10">
                <nav className="flex lg:flex-col flex-row justify-around lg:justify-start gap-4 w-full lg:w-auto">
                    <ul className="list-none m-0 p-0 space-y-4 lg:space-y-4 flex lg:flex-col flex-row lg:space-x-0 space-x-4 lg:items-center items-start">
                        <li className={`flex justify-center ${location.pathname === "/admin/course-enrollment" ? "text-green-400" : ""}`}>
                            <Link to="/admin/course-enrollment" className="text-gray-400 text-2xl hover:text-indigo-100 transition-colors">
                                <FaUsers />
                            </Link>
                        </li>
                        <li className={`flex justify-center ${location.pathname === "/admin/course-distribution" ? "text-green-400" : ""}`}>
                            <Link to="/admin/course-distribution" className="text-gray-400 text-2xl hover:text-indigo-100 transition-colors">
                                <FaChartPie />
                            </Link>
                        </li>
                        <li className={`flex justify-center ${location.pathname === "/admin/course-engagement-overtime" ? "text-green-400" : ""}`}>
                            <Link to="/admin/course-engagement-overtime" className="text-gray-400 text-2xl hover:text-indigo-100 transition-colors">
                                <FaChartLine />
                            </Link>
                        </li>
                        <li className={`flex justify-center ${location.pathname === "/admin/enrollment-counts" ? "text-green-400" : ""}`}>
                            <Link to="/admin/enrollment-counts" className="text-gray-400 text-2xl hover:text-indigo-100 transition-colors">
                                <FaUserGraduate />
                            </Link>
                        </li>
                        <li className={`flex justify-center ${location.pathname === "/admin/course-ratings" ? "text-green-400" : ""}`}>
                            <Link to="/admin/course-ratings" className="text-gray-400 text-2xl hover:text-indigo-100 transition-colors">
                                <FaStar />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-indigo-100 rounded-t-lg lg:rounded-none shadow-lg">
                <Routes>
                    <Route path="course-enrollment" element={<CourseEnrollmentChart />} />
                    <Route path="course-distribution" element={<CourseDistributionChart />} />
                    <Route path="course-engagement-overtime" element={<UserEngagementOverTimeChart />} />
                    <Route path="enrollment-counts" element={<EnrollmentDistributionChart />} />
                    <Route path="course-ratings" element={<CourseRatingsChart />} />
                    <Route path="*" element={<Navigate to="course-ratings" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminPage;
