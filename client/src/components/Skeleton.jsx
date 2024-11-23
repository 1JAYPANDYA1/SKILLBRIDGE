import React from 'react';

const SkeletonLoader = ({ sidebarVisible }) => {
    console.log(sidebarVisible)
    return (
        <div className="flex">
            {/* Conditional Sidebar Skeleton */}
            {!sidebarVisible && (
                <div className="hidden md:block w-[250px] bg-indigo-200 p-4 space-y-4">
                    <div className="h-6 w-32 bg-gray-300 rounded-md animate-pulse"></div>
                    <div className="space-y-4">
                        {/* Chapter 1 */}
                        <div className="space-y-2">
                            <div className="h-5 w-24 bg-gray-300 rounded-md animate-pulse"></div>
                            <div className="ml-4 space-y-2">
                                <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse"></div>
                                <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse"></div>
                            </div>
                        </div>
                        {/* Chapter 2 */}
                        <div className="space-y-2">
                            <div className="h-5 w-24 bg-gray-300 rounded-md animate-pulse"></div>
                            <div className="ml-4 space-y-2">
                                <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse"></div>
                                <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse"></div>
                                <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Skeleton */}
            <div className={`flex-1 p-4 space-y-4 ${sidebarVisible ? 'md:ml-0' : 'ml-0'}`}>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="w-0 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                </div>

                {/* Video Player Placeholder */}
                <div className="aspect-video w-full bg-gray-300 rounded-lg animate-pulse"></div>

                {/* Like/Dislike Section */}
                <div className="flex items-center space-x-4 pt-2">
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-gray-300 rounded animate-pulse"></div>
                        <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-gray-300 rounded animate-pulse"></div>
                        <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                </div>

                {/* MCQ Button Placeholder */}
                <div className="flex justify-center mt-4">
                    <div className="h-10 w-32 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;