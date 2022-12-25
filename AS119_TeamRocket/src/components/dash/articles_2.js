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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import flo from './flo.svg';
import './styles.css'

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
    width: '100%',
    backgroundSize: 'contain'
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

export const BlogCardDemo2 = React.memo(function BlogCard() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);




  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia
        className={styles.media}
        image={
          // 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2000px-Git_icon.svg.png'
        flo  
        }
      />
      <CardContent>
        <TextInfoContent
          /*classes={contentStyles}*/
          overline={'28 MAR 2019'}
        />
        <Typography gutterBottom variant="h5" component="h2" className= {styles.heading}>
          Did You Know ?
           </Typography>
           <Typography variant="body2" color="textSecondary" component="p" style={{fontSize: '1.5rem'}}>
           Roughly 120 million menstruating adolescents in India experience menstrual dysfunctions, affecting their normal daily chores.
            Nearly 60,000 cases of cervical cancer deaths are reported every year from India, 
           two-third of which are due to poor menstrual hygiene
          </Typography>

        <div>
      <Button className={buttonStyles} onClick={handleClickOpen('paper')} style={{marginTop: '5%', padding : '10px 25px',fontSize: '1rem',backgroundColor: 'linear-gradient(147deg, #ff9897 0%, #f650a0 74%'}}>Read More</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Did You Know</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            style={{fontSize: '1.5rem'}}
          >
          A 2014 report by the NGO Dasra informed that almost 23 million girls in India drop out of school annually, because of lack of menstrual hygiene management facilities, including the availability of sanitary napkins and awareness about menstruation. 
                The report further suggests that the girls, who don’t drop out, usually miss up to 5 days of school every month
                Menstruation is such a taboo subject that many women are ashamed even to seek medical advice if they face any health problems due to menstruation. Unhygienic menstrual conditions often result in women developing health problems which are further aggravated due to their inability to seek medical help on time
                Conditions for menstruating women in India can only improve when awareness of menstrual hygiene is spread. IEC on menstrual hygiene, under Swachh Bharat Abhiyan or any other state scheme, must educate women across all ages on what menstruation is and why the taboos surrounding it do tremendous harm. Simultaneously, sanitary napkins must be provided to menstruating women to ensure that they do not fall prey to age old unhygienic traditions of using cloth, soil or sand. It must be remembered that 88% of India’s menstruating women do not use sanitary napkins. Making sanitary napkins available to over 300 million women and ensuring that they do use these will be a herculean task, and can only be achieved with due cooperation 
                all stakeholders and proper coordination between them to improve the status menstrual hygiene in India.
              
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
      </CardContent>
    </Card>
  );
});

export default BlogCardDemo2




