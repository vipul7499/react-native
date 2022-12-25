import React,{useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import img from './images/map.jpg';
import { othersIcon, userIcon } from "./icon";

import './styles.css'
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  useLeaflet,
} from "react-leaflet";
import L from "leaflet";
const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 240,
    marginTop: 10,
  },
});

export default function Map1() {
  const classes = useStyles();
  const mapRef = useRef();

  //"../images/Arunachalam.jpg"
  return (
    <Card className={classes.root}>
      {/* <CardActionArea > */}
        {/* <CardMedia
          className={classes.media}
          image={img}
          title="Contemplative Reptile"
        /> */}
        <div id="map-id2">
         <LeafletMap center={[28.6469351,77.1130001]} zoom={10}>
          <TileLayer
            url={"https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FuaXNoa2d1cHRhMjAwMCIsImEiOiJjazdpdmd5aG8wMDYwM2ZvN2U5eWs0Mm55In0.svdKVHGfRl4873N_UZBoaA"}
          />
          <Marker position={[28.6469351,77.1130001]} icon={userIcon} />
          {/* ROUTING LAYER CALL KARO YAHA PE DONO KE */}
        </LeafletMap>
        </div>

      {/* </CardActionArea> */}
    </Card>
  );
}
