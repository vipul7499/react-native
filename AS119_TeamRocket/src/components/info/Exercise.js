

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import img from './images/edu5.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 700
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function Exercise() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="Mahila Shakti Kendra" subheader="Date" />
      <CardMedia
        className={classes.media}
        image= {img}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" style={{fontSize: '1.25rem'}}>
          Source : <a href= "http://www.nari.nic.in/mahila-shakti-kendra">nari.nic.in</a>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph style={{fontSize: '2rem'}}>Ministry of Women and Child Development, Mahila Shakti Kendra</Typography>
          <Typography paragraph style={{fontSize: '1.5rem'}}>
          Government of India has approved a new scheme namely, Mahila Shakti Kendra for implementation during 2017-18 upto 2019-20 to empower rural women through community participation and to create an environment in which they realize their full potential. 
          It will provide an interface for rural women to approach the government for availing their entitlements also empowering them through training and capacity building.
          Community engagement through College Student Volunteers is envisioned in 115 most backward districts as part of the MSK Block 
          level initiatives. Student volunteers will play an instrumental role in awareness generation regarding various important government schemes/ programmes as well as social issue and association with NSS/NCC cadre students will also be an option.

          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
  );
}