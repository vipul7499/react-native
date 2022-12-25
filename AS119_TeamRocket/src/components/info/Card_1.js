import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import img from './images/Arunachalam.jpg';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
});

export default function MediaCard1() {
  const classes = useStyles();

  //"../images/Arunachalam.jpg"
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Arunachalam Muruganatham
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{fontSize: '1.25rem'}}>
          Padma Shri Arunachalam Muruganantham is a social entrepreneur credited for developing and distributing low cost sanitary napkins 
          manufacturing machines and creating 
          awareness in rural India. 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}
