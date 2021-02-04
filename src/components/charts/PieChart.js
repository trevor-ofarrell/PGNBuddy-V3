import React from 'react';
import { Pie } from 'react-chartjs-2';

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
              fontSize: 14,
            },
          },
        }}
      />
    </div>
  );
};
