// import React from 'react';
// import cx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
// import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
// import cal from './cal.svg';

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

// export const Deposits = React.memo(function BlogCard() {
//   const styles = useStyles();
//   const {
//     button: buttonStyles,
//     ...contentStyles
//   } = useBlogTextInfoContentStyles();
//   const shadowStyles = useOverShadowStyles();
//   return (
//     <Card className={cx(styles.root, shadowStyles.root)}>
//       <CardContent>
//         <h1 style={{color:'#ffffff', margin: 0}}>Go To <br/> Period Tracker</h1>
//       </CardContent>
//       <img  height={100} src={cal} style={{marginTop:'5%'}}/>
//     </Card>
//   );
// });

// export default Deposits
import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';


const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    fontSize:'1.2rem',
    marginTop: '5%',
    marginBottom: '15%',
  },
 descr:{
   fontSize: '1.2rem',
   marginBottom: '2%',
 },
 button:{
  marginBottom: '5%',
  color: 'white',
  fontSize: '1.4rem',
  marginLeft: '2%', 
  width: '100%', 
  backgroundColor: '#f9cbd3'
 }
 
}));

export const Deposits = React.memo(function BlogCard() {
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      {/* <CardContent >
        <h1 className={styles.heading}>SaathiPad</h1>
        <p style={{marginBottom: '2%'}}>An initiative by women for organic pads</p>
        <h3>Job Des</h3>

      </CardContent> */}
      <CardContent variant="outlined">
        <Typography variant="h3" component="h2">
          SaathiPad
        </Typography>
        <Typography className={styles.pos} color="textSecondary">
        An initiative by women for organic pads
        </Typography>
        <Typography variant="body2" component="p" className= {styles.descr}>
        The account development manager develops the potential of accounts and works closely with sales
        </Typography>
      </CardContent>
      <CardActions>
      <Button variant="contained" size="large" className={styles.button} >
       Connect with Us 
      </Button>
      </CardActions>
    </Card>
  );
});

export default Deposits