import React from 'react';
import { LinkedinIcon, GithubIcon, InstagramIcon } from 'lucide-react';
import mypic from '../assets/images/mypic4.jpg';

const AboutMePage = () => {
    return (
        <div>
            <div className="container mx-auto text-center">
                <h1 className="text-[#324aad] text-3xl md:text-4xl font-bold relative inline-block pb-2.5 mb-6">
                    About Me
                    <span className="block w-16 h-0.5 bg-[#5c8bf5] mx-auto mt-2"></span>
                </h1>
            </div>  
            <div className="bg-indigo-200 py-16 px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-indigo-300 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row p-4">
                        <div className="md:w-1/2 flex flex-col items-center justify-center p-8">
                            <img
                                src={mypic}
                                alt="Profile"
                                className="w-52 h-52 rounded-full object-cover border-4 border-indigo-200 mb-4"
                            />
                            <div className="flex space-x-6 mt-4">
                                <a href="https://linkedin.com/in/jay-pandya-a0757b262" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                    <LinkedinIcon size={28} />
                                </a>
                                <a href="https://github.com/1JAYPANDYA1" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                                    <GithubIcon size={28} />
                                </a>
                            </div>
                        </div>
                        <div className="md:w-1/2 p-8">
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Hi! I’m <b>JAY PANDYA</b> A Full Stack Developer Skilled In Building Responsive, High-Performance Applications Using JavaScript, React, Node.js, and MongoDB. I Enjoy Txackling Challenges And Creating Impactful Products.
                            </p>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Outside of Coding, I Stay Updated With New Tech, Contribute To Open-Source, And Engage With The Developer Community To Share Insights And Ideas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMePage;
