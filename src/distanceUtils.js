import haversine from 'haversine';

import getStore from './redux/getStore';
import { addPosition } from './redux/positions';

export const distanceDiff = (one, two) => {
  // TODO - should i use LatLong.distanceTo method instead of separate lib?
  return haversine(one, two, { unit: 'meter' });
}

export const isWithin = (one, two, meters) => {
  return distanceDiff(one, two) <= meters;
}

const toRadians = deg => deg * Math.PI / 180;
const toDegress = rad => rad * 180 / Math.PI;

/**
 * Derived from http://www.movable-type.co.uk/scripts/latlong.html
 * Returns the destination point from ‘this’ point having travelled the given distance on the
 * given initial bearing (bearing normally varies around path followed).
 *
 * @param   {number} distance - Distance travelled, in meters
 * @param   {number} bearing - Initial bearing in degrees from north.
 * @returns {LatLon} Destination point.
 *
 * @example
 *     var p1 = new LatLon(51.4778, -0.0015);
 *     var p2 = p1.destinationPoint(7794, 300.7); // 51.5135°N, 000.0983°W
 */
export function destinationPoint(startPoint, distance, bearing) {
  // mean radius of the earth in meters
  const radius = 6371e3;
  const { latitude, longitude } = startPoint;

  // sinφ2 = sinφ1⋅cosδ + cosφ1⋅sinδ⋅cosθ
  // tanΔλ = sinθ⋅sinδ⋅cosφ1 / cosδ−sinφ1⋅sinφ2
  // see http://williams.best.vwh.net/avform.htm#LL

  var δ = Number(distance) / radius; // angular distance in radians
  var θ = toRadians(Number(bearing));

  var φ1 = toRadians(latitude);
  var λ1 = toRadians(longitude);

  var sinφ1 = Math.sin(φ1), cosφ1 = Math.cos(φ1);
  var sinδ = Math.sin(δ), cosδ = Math.cos(δ);
  var sinθ = Math.sin(θ), cosθ = Math.cos(θ);

  var sinφ2 = sinφ1*cosδ + cosφ1*sinδ*cosθ;
  var φ2 = Math.asin(sinφ2);
  var y = sinθ * sinδ * cosφ1;
  var x = cosδ - sinφ1 * sinφ2;
  var λ2 = λ1 + Math.atan2(y, x);

  return {
    latitude: toDegress(φ2),
    longitude: (toDegress(λ2) + 540) % 360 - 180
  };
};
