import React from 'react';
import { Radar } from 'react-chartjs-2';

export const RadarChart = ({ perfList }) => {
  const perfListRef = perfList;

  const mappedTimeControls = ['correspondence', 'classical', 'rapid', 'blitz', 'bullet', 'ultraBullet'];

  const updatedList = perfListRef.filter((x) => mappedTimeControls.includes(Object.keys(x)[0]));
  const names = updatedList.flatMap((x) => Object.keys(x));
  const games = [];
  updatedList.forEach((x) => { const game = Object.values(x)[0]; games.push(game.games); });

  const variantList = perfList.filter((x) => !mappedTimeControls.includes(Object.keys(x)[0]));
  const variantNames = variantList.flatMap((x) => Object.keys(x));
  const variantGames = [];
  variantList.forEach((x) => { const game = Object.values(x)[0]; variantGames.push(game.games); });

  const data = {
    labels: names,
    datasets: [
      {
        label: 'Distribution of games across standard time controls',
        backgroundColor: 'rgba(179,181,198,0.25)',
        borderWidth: '5',
        borderColor: 'green',
        pointBorderWidth: '8',
        pointBackgroundColor: 'blue',
        pointBorderColor: 'white',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#ffffff',
        data: games,
      },
    ],
  };

  return (
    <div>
      <Radar
        width="100%"
        height="100%"
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
          scale: {
            gridLines: {
              color: 'white',
            },
            angleLines: {
              color: 'white',
            },
            pointLabels: {
              fontSize: 16,
              fontColor: 'white',
            },
          },
          tooltips: {
            callbacks: {
              title: (tooltipItem, d) => d.labels[tooltipItem[0].index],
            },
          },
        }}
      />
    </div>
  );
};
