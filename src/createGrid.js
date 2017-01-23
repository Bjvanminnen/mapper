import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

// TODO - validate what happens near 0
/**
 * Rounds down to the nearest number divisible by delta
 */
export const roundedNum = (num, delta) => {
  return num - (num % delta) - (num < 0 ? delta : 0);
};

export const roundedPos = (pos, delta) => ({
  latitude: roundedNum(pos.latitude, delta),
  longitude: roundedNum(pos.longitude, delta)
});

const generateSquare = (topLeft, size) => {
  return [
    topLeft,
    {
      latitude: topLeft.latitude,
      longitude: topLeft.longitude + size
    },
    {
      latitude: topLeft.latitude + size,
      longitude: topLeft.longitude + size
    },
    {
      latitude: topLeft.latitude + size,
      longitude: topLeft.longitude
    }
  ];
};

/**
 * Creates a grid of MapView.Polygons
 */
export default function createGrid(currentPosition) {
  const delta = 0.001;
  const start = roundedPos(currentPosition, delta);

  const radius = 10;
  const cells = [];
  for (let x = -radius; x <= radius; x++) {
    for (let y = -radius; y <= radius; y++) {
      let fill;
      if (x === 0 && y === 0) {
        fill = "#88888822";
      }
      cells.push(
        <MapView.Polygon
          coordinates={generateSquare({
            latitude: start.latitude + delta * y,
            longitude: start.longitude + delta * x
          }, delta)}
          strokeColor="#88888833"
          fillColor={fill}
          key={cells.length}
        />
      );
    }
  }

  return cells;
}
