// Install ApexCharts: npm install react-apexcharts

import React, { useState }  from 'react';
import Chart from 'react-apexcharts';

const LineChart = () => {
  const [graphType, setGraphType] = useState("line");

  const options = {
    chart: {
      id: 'line-chart',
    },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Replace with actual labels
    },
  };

  const series = [
    {
      name: 'Total Lectures',
      data: [10, 12, 15, 11], // Replace with actual lecture counts
    },
    {
      name: 'Attendance Count',
      data: [8, 10, 13, 9], // Replace with actual attendance counts
    },
  ];

  const handleButtonClick = (type) => {
    setGraphType(type);
  };

  return (
    <>
      <Chart options={options} series={series} type={graphType} width="100%" />
      <div className='chart-selector'>
        <button onClick={() => handleButtonClick("line")}>Line</button>
        <button onClick={() => handleButtonClick("bar")}>Bar</button>
      </div>
    </>
  );
};

export default LineChart;
