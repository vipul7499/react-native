import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    marginTop: '5%',
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    maxWidth: '100%',
    // marginLeft: '5%',
    // marginRight: 'auto',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    paddingBottom: spacing(2),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  media: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [breakpoints.up('md')]: {
      width: '100%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
      borderRadius: spacing(2), // 16
      opacity: 0.5,
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '2%'
  }
}));

export const BlogCardDemo = React.memo(function BlogCard() {
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardContent>
        <TextInfoContent
          overline={'28 MAR 2019'}
          />
          <Typography gutterBottom variant="h5" component="h2" className= {styles.heading}>
           Periods Still A Taboo
           </Typography>
           <Typography variant="body2" color="textSecondary" component="p" style={{fontSize: '1.5rem'}}>
           Nearly 70 female students at an institute in Gujarat’s Bhuj were pressured to remove their undergarments by their principal to 
           prove that they were not menstruating. This incident happened in the year 2020, in an era of strong dialogues on the empowerment of women and smashing patriarchy. And yet, this is where some parts of our society are stuck at. Move over equality, women still have to fight for being treated with dignity. In India, even mere mention of the topic has been a taboo in the past 
           and even to this date the cultural and social influences appear to be a hurdle for the advancement of knowledge on the subject
          </Typography>
 
        
      </CardContent>
    </Card>
  );
});

export default BlogCardDemo