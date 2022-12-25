// import React from 'react';
// import cx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import TextInfoContent from '@mui-treasury/components/content/textInfo';
// import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
// import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
// import location from './location.svg'

// const useStyles = makeStyles(({ breakpoints, spacing }) => ({
//   root: {
//     width: '100%',
//     height: '100%',
//     // marginTop: '5%',
//     borderRadius: spacing(2), // 16px
//     transition: '0.3s',
//     boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
//     position: 'relative',
//     maxWidth: '100%',
//     // marginLeft: '5%',
//     // marginRight: 'auto',
//     overflow: 'initial',
//     background: '#ef5779',
//     display: 'flex',
//     flexDirection: 'column',
//     // alignItems: 'center',
//     paddingBottom: spacing(2),
//     [breakpoints.up('md')]: {
//       flexDirection: 'row',
//       paddingTop: spacing(2),
//     },
//   },
 
//   content: {
//     padding: 24,
//   },
//   cta: {
//     marginTop: 24,
//     textTransform: 'initial',
//   },
// }));

// export const Map1 = React.memo(function BlogCard() {
//   const styles = useStyles();
//   const {
//     button: buttonStyles,
//     ...contentStyles
//   } = useBlogTextInfoContentStyles();
//   const shadowStyles = useOverShadowStyles();
//   return (
//     <Card className={cx(styles.root, shadowStyles.root)}>
//       <CardContent >
//         <a href="/map"><h1 style={{color:'#ffffff', margin: 0}}>Go To <br/> Pad SOS</h1></a>
//         <img  height={100} src={location}/>
//       </CardContent>
//     </Card>
//   );
// });

// export default Map1

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

export default function Map1() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="Govt. Menstrual Hygiene Scheme" subheader="Date" />
      <CardMedia
        className={classes.media}
        image="https://www.bbc.com/capital/bespoke/woman-who-lifted-a-village/media/8-final-slide_mg__bw_3330_2560x1440-mr.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" style={{fontSize: '1.25rem'}}>
          Source : <a href= "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=1021&lid=391">nhm.gov.in</a>
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
          <Typography paragraph style={{fontSize: '2rem'}}>Menstrual Hygiene Scheme by Govt.</Typography>
          <Typography paragraph style={{fontSize: '1.5rem'}}>
          According to the plan, in 107 districts, sanitary napkins were to be supplied by the government and 
          in the remaining 45 districts, self-help groups were to make and sell them. Procurement of sanitary napkins, 
          by either of the above methods, must be at a fixed price of Rs7.50 per pack of six sanitary napkins.
          These sanitary pads are procured by the govt by setting up a bid for various manufacturers to compete and sell pads at 
          the cost of 6-7 rupees a pack containing 6 pads. Govt has established ASHA workers in rural areas who will be responsible for 
          distribution , they will make a 1 rupee profit on it.
          A range of IEC material has been developed around MHS, using a 360 degree approach to create awareness among 
          adolescent girls about safe and hygienic menstrual health practices which includes audio, video and reading materials for 
          adolescent girls and job-aids for ASHAs and other field level functionaries for communicating with adolescent girls.

          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
  );
}