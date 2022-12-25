import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import img from '../images/Mens2.png';
import Title from './Title';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    marginTop: '5%',
  },
  media: {
    height: '220px',
    width: '100%',
    backgroundSize: 'contain',
  },
});

export default function Mens2() {
  const classes = useStyles();

  //"../images/Arunachalam.jpg"
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
        {/* <Typography gutterBottom variant="h5" component="h2" style={{fontWeight:'bold', color:"#ef5779" }}>
            Regularity of Menstrual Cycle 
          </Typography> */}
          <Typography gutterBottom variant="h5" component="h2" style={{fontWeight:'bold' }}>
            Men when asked if they have shopped for Sanitary Napkins
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={img}
          title="Contemplative Reptile"
        />
      </CardActionArea>
    </Card>
  );
}
