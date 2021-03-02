import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { useMediaQuery, useTheme } from '@material-ui/core';

export const PieChart = ({ playerData, playerUsername }) => {
  const wins = playerData.win;
  const losses = playerData.loss;
  const draws = playerData.draw;
  const totalGames = wins + losses + draws;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const mobileFontSizes = {
    title: 13,
    legendFontSize: 12,
    legendBoxWidth: 40,
    dataLabelFontSize: 12,
  };
  const defaultFontSizes = {
    title: 17,
    legendFontSize: 14,
    legendBoxWidth: 45,
    dataLabelFontSize: 16,
  };
  const fontSize = (matches === true) ? defaultFontSizes : mobileFontSizes;

  const data = {
    labels: [
      'Win',
      'Loss',
      'Draw',
    ],
    datasets: [{
      data: [wins, losses, draws],
      backgroundColor: [
        'green',
        'red',
        'grey',
      ],
      borderColor: 'rgb(49, 46, 44)',
      borderWidth: '5',
      hoverBackgroundColor: [
        'green',
        'red',
        'grey',
      ],
    }],
  };

  return (
    <div style={{ minHeight: '100%' }}>
      <Pie
        data={data}
        width="100%"
        height="100%"
        options={{
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 0 },
          legend: {
            labels: {
              fontColor: 'rgb(229, 226, 224)',
              fontSize: fontSize.legendFontSize,
              boxWidth: fontSize.legendBoxWidth,
              borderWidth: '0',
            },
            usePointStyle: true,
          },
          title: {
            display: true,
            text: `${playerUsername}'s win, loss, draw percentage over ${totalGames} games`,
            fontColor: 'rgb(229, 226, 224)',
            fontSize: fontSize.title,
          },
          plugins: {
            datalabels: {
              formatter: (value, ctx) => {
                let sum = 0;
                const dataArr = ctx.chart.data.datasets[0].data;
                dataArr.map((dataArrayItem) => {
                  sum += dataArrayItem;
                });
                const percentage = `${(value * 100 / sum).toFixed(2)}%`;
                return percentage;
              },
              color: 'rgb(229, 226, 224)',
              font: {
                size: fontSize.dataLabelFontSize,
                weight: 'bold',
              },
            },
          },
        }}
      />
    </div>
  );
};
