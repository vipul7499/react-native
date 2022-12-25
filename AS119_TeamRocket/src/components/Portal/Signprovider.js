import React,{useState,useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createUserProfileDocument, auth,updateCurrentUseDocument } from "../../utils/firebase";
import {UserContext} from '../../providers/UserProvider'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './styles.css'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: '1.5rem'
  },
  menu :{
    fontSize: '1.2rem',
  },
 
}));

export default function SignProvider({setIsEmployerRegistered}) {
  const classes = useStyles();
  const [user,setUser]=useContext(UserContext);
  const [fields, setFields] = useState({
    orgName: "",
    orgDescr: "",
    orgContact:"",
    orgWebsite:"",
    orgLocation:"",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name,value)
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {orgName,orgDescr,orgContact,orgWebsite,orgLocation} = fields;


    console.log(fields)
    const orgDetails={
      orgName,
      orgDescr,
      orgContact,
      orgWebsite,
      orgLocation,
    }
    const isEmployerRegistered=true
    await  updateCurrentUseDocument(user,{orgDetails,isEmployerRegistered});
    setIsEmployerRegistered(true)

    

    setFields({
      orgName: "",
      orgDescr: "",
      orgContact:"",
      orgWebsite:"",
      orgLocation:"",
    });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Tell us something about yourself
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="orgName"
                value={fields.orgName}
                onChange={handleChange}

                variant="outlined"
                required
                fullWidth
                id="orgName"
                label="Organisation Name"
                
              />
            </Grid>
          
            <Grid item xs={12}>
              <TextField
               name="orgDescr"
               value={fields.orgDescr}
               onChange={handleChange}

               variant="outlined"
               required
               fullWidth
               id="orgDescr"
               label="A brief descritption of your organisation"
                 
      
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
               name="orgLocation"
               value={fields.orgLocation}
               onChange={handleChange}

               variant="outlined"
               required
               fullWidth
               id="loc"
               label="Your Location"
                 
      
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
               name="orgContact"
               value={fields.orgContact}
               onChange={handleChange}

               variant="outlined"
               required
               fullWidth
               id="orgContact"
               label="Contact Info."
      
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
               name="orgWebsite"
               value={fields.orgWebsite}
               onChange={handleChange}

               variant="outlined"
               fullWidth
               id="orgWebsite"
               label="Link to your website" 
      
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
               name="nWomen"
               value={fields.firstName}
               onChange={handleChange}

               variant="outlined"
               fullWidth
               id="nWomen"
               label="No. of Women currently employed" 
      
              />
            </Grid>
            

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Start creating opportunities!
          </Button>
        </form>
      </div>
    </Container>
 
 
 );
}





      