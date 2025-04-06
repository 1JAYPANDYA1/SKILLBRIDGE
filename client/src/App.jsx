import React,{useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from './components/Footer';
import NavBar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './components/ResetPassword';
import { AuthUserProvider } from './contexts/AuthUserContexts';
import About from './pages/About';
import AdminDashboard from './pages/AdminPage';
import Certificate from './pages/Certificate';
import ContactSection from './pages/ContactSection';
import Course from './pages/Course';
import CourseDetails from './pages/CourseDetails';
import CourseDisplay from './pages/CourseDisplay';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import LeaderBoard from './pages/LeaderBoard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Signup from './pages/SignUp';
import Skills from './pages/Skills';
import UserCoursesPage from './pages/UserCourse';
import VideoPage from './pages/VideoPage';
import CertificatePreview from './pages/CertificatePreview';
const updateFavicon = () => {
        const originalImageSrc = '/myimg.png'; // Path to your original favicon in the public folder
        const canvas = document.createElement('canvas');
        const img = new Image();

        img.src = originalImageSrc;
        img.crossOrigin = 'anonymous'; // Prevent CORS issues for local images
        img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.filter = 'invert(100%) sepia(100%) saturate(0%) hue-rotate(100deg)'; // Your desired filter
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Convert the canvas to a data URL
                const newFavicon = canvas.toDataURL('image/png');

                // Update the favicon in the <head>
                const link = document.querySelector("link[rel='icon']") || document.createElement('link');
                link.rel = 'icon';
                link.href = newFavicon;
                document.head.appendChild(link);
        };
};
const App = () => {
        useEffect(() => {
                updateFavicon();
        }, []);

        const location = useLocation();

        // Define paths where the NavBar should be hidden
        const hideNavBarPaths = [
                '/login',
                '/signup',
                '/forgot-password',
                '/reset-password',
                '/admin'
        ];

        // Check if current path should hide navbar/footer
        const shouldHideNavBar = () => {
                // Check if it matches any of the specific paths
                const isHiddenPath = hideNavBarPaths.some(path =>
                        location.pathname.startsWith(path)
                );

                // Check if it's a valid route by matching against all defined routes
                const validRoutes = [
                        '/',
                        '/contact',
                        '/home',
                        '/Home1',
                        '/course',
                        '/skill',
                        '/aboutpage',
                        '/certificate',      
                        '/certificatepreview',
                        '/admin',
                        '/courseDetails',
                        '/profile',
                        '/leaderBoard',
                        '/video',
                        '/my-courses'
                ];

                const isValidRoute = validRoutes.some(route =>
                        location.pathname.startsWith(route)
                );

                // Hide navbar if it's either a hidden path OR not a valid route (404)
                return isHiddenPath || !isValidRoute;
        };

        const hideNavBar = shouldHideNavBar();

        return (
                <AuthUserProvider>
                        <div className="relative">
                                {!hideNavBar && <NavBar />}
                                <Routes>
                                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                                        <Route path="/contact" element={<ContactSection />} />
                                        <Route path='/forgot-password' element={<ForgotPassword />} />
                                        <Route path="/" element={<Home />} />
                                        <Route path="/Home1" element={<Course />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path='/signup' element={<Signup />} />
                                        <Route path='/home' element={<Home />} />
                                        <Route path="/course" element={<CourseDisplay />} />
                                        <Route path="/skill" element={<Skills />} />
                                        <Route path='/aboutpage' element={<About />} />

                                        <Route path="/certificate/:courseId" element={
                                                <ProtectedRoute>
                                                        <Certificate />
                                                </ProtectedRoute>
                                        } />
                                        <Route path="/certificatepreview/:courseId" element={
                                                <ProtectedRoute>
                                                        <CertificatePreview />
                                                </ProtectedRoute>
                                        } />
                                        <Route path="/admin/*" element={<AdminDashboard />} />

                                        {/* Protected Routes */}
                                        <Route
                                                path="/courseDetails/"
                                                element={
                                                        <ProtectedRoute>
                                                                <CourseDetails />
                                                        </ProtectedRoute>
                                                }
                                        />
                                        <Route
                                                path="/profile"
                                                element={
                                                        <ProtectedRoute>
                                                                <Profile />
                                                        </ProtectedRoute>
                                                }
                                        />
                                        <Route
                                                path="/leaderBoard"
                                                element={
                                                        <ProtectedRoute>
                                                                <LeaderBoard />
                                                        </ProtectedRoute>
                                                }
                                        />
                                        <Route path="/video" element={
                                                <ProtectedRoute>
                                                        <VideoPage />
                                                </ProtectedRoute>
                                        } />
                                        <Route path="/my-courses" element={
                                                <ProtectedRoute>
                                                        <UserCoursesPage />
                                                </ProtectedRoute>
                                        } />
                                        {/* 404 Not Found Route - Keep this last */}
                                        <Route path="*" element={<NotFound />} />
                                </Routes>
                                {!hideNavBar && <Footer />}

                        </div>
                </AuthUserProvider >
        );
};

export default App;