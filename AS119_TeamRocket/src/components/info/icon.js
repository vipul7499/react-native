import L from "leaflet";

const userIcon = new L.icon({
  iconUrl: require("./images/molly.png"),
  iconRetinaUrl: require("./images/molly.png"),
  iconAnchor: [0,0],
  popupAnchor: [0,0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(50, 50),
  className: "marker",
});

const othersIcon = new L.icon({
  iconUrl: require("./images/kristy.png"),
  iconRetinaUrl: require("./images/kristy.png"),
  iconAnchor: [10,10],
  popupAnchor: [10,10],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(50, 50),
  className: "marker",
});

export { userIcon, othersIcon };
