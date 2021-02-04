import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

export const PieChart = ({ playerData }) => {
  const wins = playerData.win;
  const losses = playerData.loss;
  const draws = playerData.draw;
  const data = {
    labels: [
      'Wins',
      'Losses',
      'Draws',
    ],
    datasets: [{
      data: [wins, losses, draws],
      backgroundColor: [
        'green',
        'red',
        'grey',
      ],
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
            },
          },
        }}
      />
    </div>
  );
};
