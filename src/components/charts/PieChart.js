import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

export const PieChart = ({ playerData, playerUsername }) => {
  const wins = playerData.win;
  const losses = playerData.loss;
  const draws = playerData.draw;
  const totalGames = wins + losses + draws;
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
    <div>
      <Pie
        data={data}
        width="100%"
        height="100%"
        options={{
          responsive: true,
          maintainAspectRatio: true,
          animation: { duration: 0 },
          legend: {
            labels: {
              // This more specific font property overrides the global property
              fontColor: 'rgb(229, 226, 224)',
              fontSize: 16,
              borderWidth: '0',
            },
            usePointStyle: true,
          },
          title: {
            display: true,
            text: `${playerUsername}'s win, loss, draw percentage over ${totalGames} games`,
            fontColor: 'rgb(229, 226, 224)',
            fontSize: 16,
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
                size: 15,
                weight: 'bold',
              },
            },
          },
        }}
      />
    </div>
  );
};
