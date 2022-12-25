import React from "react";
import { getDistanceFromLatLonInKm } from "../../utils/functions";
import { Card } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {useLeaflet } from 'react-leaflet'
const Menu2 = (props) => {
  const {map}=useLeaflet()
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin: "24px 10px",
    },
    media: {
      height: 140,
    },
  });

  const classes = useStyles();

  const menu = props.dishes.map((dish, i) => {
    //probably a filter to check that user does not get self request if cancelled
    // console.log(dish.data().data())
    console.log(dish.data().requester.detail)
    const namesplit = dish.data().requester.detail.name.split(" ");
    const fname = namesplit[0];
    const lname = namesplit[1];
    return (
      <>
        <Card className={classes.root}>
          <CardActionArea>
            {/* <CardMedia
              className={classes.media}
              title="Contemplative Reptile"
            /> */}
             <svg
            preserveAspectRatio="none"
            viewBox="-0.75 -0.75 113.5 113.5"
            className="screenshot20"
          >
            <defs>
              <pattern
                id={i}
                patternContentUnits="userSpaceOnUse"
                width="100%"
                height="100%"
              >
                <image
                  xlinkHref ={dish.data().requester.detail.photoURL||require("./assets/screenshot20.png")}
                  x="0"
                  y="0"
                  width="112.00px"
                  height="112.00px"
                />
              </pattern>
            </defs>
            <path
              d="M 56 0 C 86.92794036865234 0 112 25.07205772399902 112 56 C 112 86.92794036865234 86.92794036865234 112 56 112 C 25.07205772399902 112 0 86.92794036865234 0 56 C 0 25.07205772399902 25.07205772399902 0 56 0 Z"
              fill={`url(#${i})`}
            />
          </svg> 
            <CardContent>
              <Typography gutterBottom variant="h2" component="h1">
                {fname}<br/>{lname}
              </Typography>
              <Typography variant="h4" color="textSecondary" component="h2">
                {getDistanceFromLatLonInKm(
                  dish.data().requester.location[0],
                  dish.data().requester.location[1],
                  props.location[0],
                  props.location[1]
                )}
                km Away
              </Typography>
              <Typography variant="body1" color="text " component="h2">
                {"In urgent need of a sanitary napkin"}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {/* <Button variant="contained" size="large" color="secondary">
              Help Now
            </Button> */}
            <Button onClick={()=>{
              const {current={}}=props.mapRef
              const{leafletElement:map}=current;
              setTimeout(()=>{
                 map.flyTo(dish.data().requester.location,16,{
                   duration:3
                 },1000)
              })
            }} variant="contained" size="large" color="secondary">
              View Location
            </Button>
          </CardActions>
        </Card>
        {/* <Card>
          <div >Give Help</div>
          <div >{fname}<br/>{lname}</div>
          <div >
            {"In urgent need of a sanitary napkin"}
            <br />
          </div>
          <div >{getDistanceFromLatLonInKm(dish.data().data().requester.location[0],dish.data().data().requester.location[1],props.location[0],props.location[1])}km Away</div>               
         
          </Card> */}
      </>
    );
  });

  return <>{menu}</>;
};
export default Menu2;

