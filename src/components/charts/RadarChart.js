import React from 'react';
import { Radar } from 'react-chartjs-2';
import { useMediaQuery, useTheme } from '@material-ui/core';

export const RadarChart = ({ perfList, playerUsername }) => {
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
    dataLabelFontSize: 15,
  };
  const fontSize = (matches === true) ? defaultFontSizes : mobileFontSizes;

  const data = {
    labels: names,
    datasets: [
      {
        label: '',
        backgroundColor: 'rgb(255, 0, 255, 0.125)',
        borderWidth: '5',
        borderColor: 'rgb(123, 104, 238, 0.75)',
        pointBorderWidth: '8',
        pointBackgroundColor: 'rgb(255,0,255, 0.75)',
        pointBorderColor: 'white',
        pointHitRadius: '2',
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
          title: {
            display: true,
            text: `distribution of ${playerUsername}'s games across standard time controls`,
            fontColor: 'rgb(229, 226, 224)',
            fontSize: fontSize.title,
          },
          legend: {
            labels: {
              fontColor: 'rgb(229, 226, 224)',
              fontStyle: 'bold',
              fontSize: fontSize.legendFontSize,
              boxWidth: fontSize.legendBoxWidth,
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
              fontSize: fontSize.dataLabelFontSize,
              fontColor: 'rgb(169, 166, 164)',
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
