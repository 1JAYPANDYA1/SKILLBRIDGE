import React, { useEffect, useState, useRef } from 'react';
import Plot from 'react-plotly.js';

const EnrollmentDistributionChart = () => {
    const [chartData, setChartData] = useState({ labels: [], values: [] });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [selectedSlice, setSelectedSlice] = useState(null);
    const chartContainerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://${import.meta.env.VITE_MY_IP}:8000/enrollment_distribution_data/`);
            const data = await response.json();
            setChartData({
                labels: data.labels,
                values: data.values,
            });
        };

        fetchData();
    }, []);

    useEffect(() => {
        const updateSize = () => {
            if (chartContainerRef.current) {
                const { clientWidth, clientHeight } = chartContainerRef.current;
                setContainerSize({
                    width: clientWidth,
                    height: clientHeight,
                });
            }
        };

        // ResizeObserver for dynamic resizing
        const resizeObserver = new ResizeObserver(updateSize);
        if (chartContainerRef.current) {
            resizeObserver.observe(chartContainerRef.current);
        }

        // Initial size setup
        updateSize();

        return () => {
            if (chartContainerRef.current) {
                resizeObserver.unobserve(chartContainerRef.current);
            }
        };
    }, []);

    const handlePlotClick = (data) => {
        const sliceIndex = data.points[0].pointNumber;
        setSelectedSlice(chartData.labels[sliceIndex]);
    };

    const handlePopupClose = () => {
        setSelectedSlice(null);
    };

    const data = [
        {
            labels: chartData.labels,
            values: chartData.values,
            type: 'pie',
            marker: {
                colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            },
        },
    ];

    const layout = {
        title: {
            text: 'Enrollment Distribution By Course',
            font: {
                size: 18,
                color: '#00008B',
            },
        },
        width: containerSize.width,
        height: containerSize.height,
        margin: { l: 30, r: 30, t: 70, b: 30 },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: {
            family: 'Roboto, sans-serif',
            size: 14,
            color: '#00008B',
        },
        legend: {
            orientation: 'h',
            y: -0.2,
            font: {
                size: 12,
            },
        },
        showlegend: true,
        clickmode: 'event+select',
    };

    return (
        <div
            ref={chartContainerRef}
            className="w-full h-full bg-indigo-00 rounded-lg shadow-lg relative"
        >
            <Plot data={data} layout={layout} config={{ responsive: true }} onClick={handlePlotClick} />
            {selectedSlice && (
                <div className="absolute top-0 left-0 w-full h-full bg-indigo-50 bg-opacity-80 flex items-center justify-center">
                    <div className="bg-indigo-200 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-2xl font-bold mb-4">Enrollment for {selectedSlice}</h3>
                        <p className="text-gray-600 mb-6">
                            The enrollment for the {selectedSlice} course is{' '}
                            {chartData.values[chartData.labels.indexOf(selectedSlice)]}%.
                        </p>
                        <button
                            className="bg-indigo-600 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                            onClick={handlePopupClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnrollmentDistributionChart;