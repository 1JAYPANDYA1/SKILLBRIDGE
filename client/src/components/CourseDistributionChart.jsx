import React, { useEffect, useState, useRef } from 'react';
import Plot from 'react-plotly.js';

const CourseDistributionChart = () => {
    const [fig, setFig] = useState(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const chartContainerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://${import.meta.env.VITE_MY_IP}:8000/course-enrollment_secondary/`);
                const data = await response.json();
                console.log('Fetched data:', data); // Log the data
                setFig(data); // Set the figure data directly
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const updateSize = () => {
            if (chartContainerRef.current) {
                const { clientWidth } = chartContainerRef.current;
                setContainerSize({
                    width: clientWidth,
                    height: Math.max(300, clientWidth * 0.6), // Maintain aspect ratio
                });
            }
        };

        // Initialize ResizeObserver to monitor container size changes
        const resizeObserver = new ResizeObserver(updateSize);
        if (chartContainerRef.current) {
            resizeObserver.observe(chartContainerRef.current);
        }

        updateSize(); // Initial size setup

        // Cleanup observer on component unmount
        return () => {
            if (chartContainerRef.current) {
                resizeObserver.unobserve(chartContainerRef.current);
            }
        };
    }, []);

    if (!fig) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-500 text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-indigo-200 shadow-md rounded-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">
                    Course Distribution
                </h2>
                <div id="chart-container" ref={chartContainerRef} className="w-full">
                    <Plot
                        data={fig.data} // Use the Plotly data structure directly
                        layout={{
                            ...fig.layout,
                            width: containerSize.width,
                            height: containerSize.height,
                            title: '',
                            plot_bgcolor: '#f9f9f9',
                            paper_bgcolor: '#c7d2fe',
                            font: {
                                color: '#333',
                            },
                            autosize: true,
                            margin: { l: 50, r: 50, t: 30, b: 80 },
                            xaxis: {
                                ...fig.layout.xaxis,
                                automargin: true,
                            },
                            yaxis: {
                                ...fig.layout.yaxis,
                                automargin: true,
                            },
                        }}
                        config={{
                            responsive: true, // Enable responsive mode
                            displayModeBar: false, // Hide the mode bar
                        }}
                        className="w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default CourseDistributionChart;

/**
 * @private
 * This chart serves as an analytical tool for administrators, 
 * enabling them to assess the variety and distribution of courses offered. 
 * 
 * By visualizing this data, the admin can make informed decisions about course development, 
 * marketing strategies, and resource allocation, ultimately enhancing the educational offerings.
 */
