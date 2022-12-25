import L from "leaflet";

const userIcon = new L.icon({
  iconUrl: require("../utils/molly.png"),
  iconRetinaUrl: require("../utils/molly.png"),
  iconAnchor: [0,0],
  popupAnchor: [0,0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(50, 50),
  className: "marker",
});

const othersIcon = new L.icon({
  iconUrl: require("../utils/kristy.png"),
  iconRetinaUrl: require("../utils/kristy.png"),
  iconAnchor: [10,10],
  popupAnchor: [10,10],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(50, 50),
  className: "marker",
});
const vendorIcon=new L.icon({
  iconUrl:require('../utils/vendor.png'),
  iconRetinaUrl: require("../utils/vendor.png"),
  iconAnchor: [10,10],
  popupAnchor: [10,10],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(50, 50),
  className: "marker",
})

export { userIcon, othersIcon,vendorIcon };
