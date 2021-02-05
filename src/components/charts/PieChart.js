import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

export const PieChart = ({ playerData }) => {
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
      borderWidth: '8',
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
          legend: {
            labels: {
              // This more specific font property overrides the global property
              fontColor: 'white',
              fontSize: 16,
            },
          },
          title: {
            display: true,
            text: `win, loss, draw percentage over ${totalGames} games`,
            fontColor: 'white',
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
              color: '#fff',
              fontSize: 16,
            },
          },
        }}
      />
    </div>
  );
};
