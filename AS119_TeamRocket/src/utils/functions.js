import { encode } from "ngeohash";

const getGeohashRange = (position, distance) => {
  const lat = 0.00900537681159420;
  const lng = 0.0112976545454546;

  const lowerPosition = [position[0] - lat * distance, position[1] - lng * distance];
  const upperPosition = [position[0] + lat * distance, position[1] + lng * distance];

  const lower = encode(lowerPosition[0], lowerPosition[1],8);
  const upper = encode(upperPosition[0], upperPosition[1],8);
  return {
    lower,
    upper
  };
};



export default getGeohashRange;

export const getDistanceFromLatLonInKm=(lat1, lon1, lat2, lon2)=>{
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d.toFixed(2);
}
function deg2rad(deg) {
  return deg * (Math.PI/180)
}



/*
// USAGE
const range = getGeohashRange(latitude, longitude, 10);
firestore
    .collection("places")
    .where("geohash", ">=", range.lower)
    .where("geohash", "<=", range.upper)
    .onSnapshot(snapshot => {
      console.log(snapshot.docs)
    })
*/