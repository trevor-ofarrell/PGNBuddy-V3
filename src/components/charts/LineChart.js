import React from 'react';
import { Line } from 'react-chartjs-2';
import { useMediaQuery, useTheme } from '@material-ui/core';

export const LineChart = ({ pastYearRatingHistory, playerUsername }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const mobileFontSizes = {
    title: 13,
    legendFontSize: 12,
    legendBoxWidth: 15,
    dataLabelFontSize: 11,
    axesTickFontSize: 12,
  };
  const defaultFontSizes = {
    title: 17,
    legendFontSize: 14,
    legendBoxWidth: 33,
    dataLabelFontSize: 13,
    axesTickFontSize: 14,
  };
  const fontSize = (matches === true) ? defaultFontSizes : mobileFontSizes;

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

  // iterate through the timecontrols/variants
  pastYearRatingHistory.map((ele) => {
    const dataSet = [];

    // iterate through the given data points for each timecontrol/variant
    Object.keys(ele).forEach((elem) => {
      let monthKeys = Object.keys(ele[[elem]]);

      const currentDate = new Date();
      const month = currentDate.getUTCMonth();

      // rotate array to have the current month at the right,
      // and farthest month to the left of the chart.
      monthKeys = monthKeys.splice(month).concat(monthKeys);

      // remove objects that are not numbers
      monthKeys.forEach((keyName) => {
        if (Number.isNaN(ele[[elem]][keyName])) {
          delete ele[[elem]][keyName];
        } else {
          const item = { [monthNumberToLabelMap[keyName]]: Math.round(ele[[elem]][keyName]) };
          dataSet.push(item);
        }
      });

      dataSets.push({ [elem]: dataSet });

      // create object for each dataset to be shown on chart
      const chartData = {
        label: elem,
        fill: false,
        lineTension: 0.099,
        backgroundColor: 'rgba(75,192,192,0.1)',
        borderColor: colorToVariantMap[index],
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        borderWidth: 4,
        pointBorderColor: colorToVariantMap[index],
        pointBackgroundColor: '#fff',
        pointBorderWidth: 6,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colorToVariantMap[index],
        pointHoverBorderColor: '#fafafa',
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: Object.values(dataSet),
      };

      index += 1;
      let label = [];
      label = dataSet.map((e) => Object.keys(e)[0]);
      monthList.push(label);
      allChartData.push(chartData);
    });
  });

  // get timecontrol/variant with most months containing datapoints
  const lengths = monthList.map((a) => a.length);
  const largestArray = monthList[lengths.indexOf(Math.max(...lengths))];

  // for each dataset, compare it's month object amount against the 'largest month array'.
  // If any months are missing add them as NaN in the correct index location.
  allChartData.forEach((item) => {
    const newArray = [];
    let data = [];
    if (item.data) { data = item.data; }
    largestArray.forEach((month) => {
      const match = data.filter((obj) => Object.keys(obj)[0] === month);
      if (!match[0]) {
        newArray.push(NaN);
      } else {
        newArray.push(Object.values(match[0])[0]);
      }
    });
    item.data = newArray;
  });

  const data = {
    labels: largestArray,
    datasets: allChartData,
  };

  return (
    <div style={{ minHeight: '100%' }}>
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          spanGaps: true,
          layout: {
            padding: {
              left: 0,
              right: 20,
              top: 0,
              bottom: 0,
            },
          },
          legend: {
            labels: {
              fontColor: 'rgb(229, 226, 224)',
              fontSize: fontSize.legendFontSize,
              boxWidth: fontSize.legendBoxWidth,
            },
          },
          title: {
            display: true,
            text: `${playerUsername}'s rating history over the past ${largestArray.length} months on lichess.org`,
            fontColor: 'rgb(229, 226, 224)',
            fontSize: fontSize.title,
          },
          plugins: {
            datalabels: {
              color: 'rgb(219, 216, 214)',
              font: {
                size: fontSize.dataLabelFontSize,
              },
            },
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: 'rgb(59, 56, 54)',
              },
              ticks: {
                fontColor: 'rgb(119, 116, 114)',
                fontSize: fontSize.axesTickFontSize,
              },
            }],
            yAxes: [{
              ticks: {
                fontColor: 'rgb(119, 116, 114)',
                fontSize: fontSize.axesTickFontSize,
              },
              gridLines: {
                color: 'rgb(59, 56, 54)',
              },
            }],
          },
        }}
      />
    </div>
  );
};
