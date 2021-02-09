import React from 'react';
import { Line } from 'react-chartjs-2';

export const LineChart = ({ pastYearRatingHistory }) => {
  const dataSets = [];
  const monthList = [];
  const monthNumberToLabelMap = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };
  const colorToVariantMap = {
    0: '#e41a1c',
    1: '#377eb8',
    2: '#4daf4a',
    3: '#984ea3',
    4: '#ff7f00',
    5: '#ffff33',
    6: '#a65628',
    7: '#f781bf',
    8: '#fa9fb5',
    9: '#e0ecf4',
    10: '#edf8b1',
    11: '#bcbddc',
  };
  const allChartData = [];
  let index = 0;

  pastYearRatingHistory.map((ele) => {
    const dataSet = [];

    Object.keys(ele).forEach((elem) => {
      let monthKeys = Object.keys(ele[[elem]]);

      const currentDate = new Date();
      const month = currentDate.getUTCMonth();
      monthKeys = monthKeys.splice(month).concat(monthKeys);

      monthKeys.forEach((keyName) => {
        if (Number.isNaN(ele[[elem]][keyName])) {
          delete ele[[elem]][keyName];
        } else {
          const item = { [monthNumberToLabelMap[keyName]]: Math.round(ele[[elem]][keyName]) };
          dataSet.push(item);
        }
      });

      dataSets.push({ [elem]: dataSet });

      const chartData = {
        label: elem,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: colorToVariantMap[index],
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
        data: dataSet.map((e) => Object.values(e)[0]),
      };

      index += 1;
      let label = [];
      label = dataSet.map((e) => Object.keys(e)[0]);
      monthList.push(label);
      allChartData.push(chartData);
    });
  });

  const lengths = monthList.map((a) => a.length);
  const indexForLargestArray = lengths.indexOf(Math.max(...lengths));
  let largestArray = monthList[indexForLargestArray];

  const currentDate = new Date();
  const month = currentDate.getUTCMonth();

  largestArray = largestArray.splice(month).concat(largestArray);

  const data = {
    labels: largestArray,
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
