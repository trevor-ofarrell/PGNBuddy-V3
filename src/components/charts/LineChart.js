import React from 'react';
import { Line } from 'react-chartjs-2';

export const LineChart = ({ pastYearRatingHistory }) => {
  const dataSets = [];
  const monthNumberToLabelMap = {
    [0]: 'January',
    [1]: 'February',
    [2]: 'March',
    [3]: 'April',
    [4]: 'May',
    [5]: 'June',
    [6]: 'July',
    [7]: 'August',
    [8]: 'September',
    [9]: 'October',
    [10]: 'November',
    [11]: 'December',
  }
  const allChartData = []
  pastYearRatingHistory.map((ele) => {
    const dataSet = []
    console.log('ele', ele)
    Object.keys(ele).forEach((elem) => {
      const monthKeys = Object.keys(ele[[elem]]);
      monthKeys.forEach((keyName) => {
        console.log('fuckin eh', ele[[elem]][keyName]);
        if (Number.isNaN(ele[[elem]][keyName])) {
          delete ele[[elem]][keyName];
        } else {
          const item = { [monthNumberToLabelMap[keyName]]: ele[[elem]][keyName] };
          console.log('item', item);
          dataSet.push(item);
        }
      });
      dataSets.push({ [elem]: dataSet });
      const chartData = {
        label: elem,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataSet.map(e => Object.values(e)[0]),
      };
      allChartData.push(chartData)
    });
  });
  console.log("finished data", allChartData);
  console.log(dataSets[1].Blitz);

  const data = {
    labels: ['jan', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: allChartData,
  };
  return (
    <div>
      <Line
        data={data}
        width="auto"
        height="100%"
      />
    </div>
  );
};
