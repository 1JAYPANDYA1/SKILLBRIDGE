import React from 'react';

const TrendingSkeleton = () => {
    return (
        <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
                <div
                    key={index}
                    className="bg-indigo-300 animate-pulse rounded-lg p-4 h-48 flex flex-col space-y-4"
                >
                    {/* Skeleton Image */}
                    <div className="bg-indigo-300 h-32 rounded-md"></div>
                    {/* Skeleton Title */}
                    <div className="h-4 bg-indigo-300 rounded w-3/4"></div>
                    {/* Skeleton Subtitle */}
                    <div className="h-4 bg-indigo-300 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    );
};

export default TrendingSkeleton;
