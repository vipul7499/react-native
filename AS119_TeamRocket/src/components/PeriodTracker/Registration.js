import firebase from "firebase/app";
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {
  addPeriodRegister,
  updateCurrentUseDocument,
} from "../../utils/firebase";
import axios from "axios";
import {
  addDays,
} from "date-fns";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 50,
    fontSize: 3
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    backgroundImage: "linear-gradient(147deg, #ff9897 0%, #f650a0 74%)",
    margin: theme.spacing(3, 0, 2),
    color: "#ffffff",
  },
  inputRoot: {
    fontSize: 20
  },
  labelRoot: {
    fontSize: 20,
    color: "black",
    "&$labelFocused": {
      color: "purple"
    }
  },
  labelFocused: {}
}));

const Registration = ({ user, handleRegister }) => {
    const classes = useStyles();
    const [fields, setFields] = useState({
      cycleTotal: 0,
      dob: Date.now(),
      weight: 0,
      cycleLength: 0,
      height: 0,
      lastDate: Date.now(),
      // lastStart:new Date(),
      // lastEnd:new Date()
    });
    const handleChange = (event) => {
      const { name, value } = event.target;
      const date = new Date(value);
      console.log(fields);
      if (name === "lastDate") {
        setFields({ ...fields, [name]: date });
      } else {
        setFields({ ...fields, [name]: value });
      }
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(fields);
  
      const { cycleTotal, dob, weight, cycleLength, height, lastDate } = fields;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const age=dob
      const send = {
        id: user.data.uid,
      };
      await addPeriodRegister(user, {
        cycleTotal,
        age,
        weight,
        cycleLength,
        height,
      });
  
      const res = await axios.post("http://localhost:5000/predict", send, config);
      console.log(res);
      const predictedStartDate = addDays(lastDate, res.data.t_len);
      const predictedEndDate = addDays(predictedStartDate, res.data.p_len);
      console.log(predictedStartDate, predictedEndDate);
      await updateCurrentUseDocument(user, {
        predictedStartDate,
        predictedEndDate,
      });
      // CREATE FIRST LOG ELSE APP BREAKS
  
      handleRegister(predictedStartDate, predictedEndDate);
    };
    // const changePlaceHolder = (currstep) => {
    //   if (currstep === 1) setPlaceHolderText("What is your height? (in cms)");
    //   if (currstep === 2) setPlaceHolderText("What is your Weight? (in kg) ");
    //   if (currstep === 3)
    //     setPlaceHolderText("What is your average period cycle length? (in days)");
    //   if (currstep === 4) setPlaceHolderText("What is your age?");
    //   if (currstep === 5)
    //     setPlaceHolderText("What is your average total cycle ?(in days)");
    //   if (currstep === 6)
    //     setPlaceHolderText("Please log your first day of last period");
    //   if (currstep === 7)
    //     setPlaceHolderText("Please Submit with the following details");
    // };
   
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    return (
      <>
       <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register for our Period Tracker with this basic information!
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            // variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            id="cycleTotal"
            label="cycleTotal"
            name="cycleTotal"
            InputProps={{ classes: { root: classes.inputRoot } }}
        InputLabelProps={{
          classes: {
            root: classes.labelRoot,
            focused: classes.labelFocused
          }
        }}
            value={fields.cycleTotal}
            onChange={handleChange}
            autoComplete="cycleTotal"
            autoFocus
          />
          <TextField
            // variant="outlined"
            margin="normal"
            required
            fullWidth
            name="cycleLength"
            onChange={handleChange}
            InputProps={{ classes: { root: classes.inputRoot } }}
        InputLabelProps={{
          classes: {
            root: classes.labelRoot,
            focused: classes.labelFocused
          }
        }}
            value={fields.cycleLength}
            label="cycleLength"
            type="number"
            id="cycleLength"
          />       
          <TextField
            // variant="outlined"
            margin="normal"
            required
            fullWidth
            name="height"
            onChange={handleChange}
            InputProps={{ classes: { root: classes.inputRoot } }}
        InputLabelProps={{
          classes: {
            root: classes.labelRoot,
            focused: classes.labelFocused
          }
        }}
            value={fields.height}
            label="height"
            type="number"
            id="height"
          />      
          <TextField
            // variant="outlined"
            margin="normal"
            required
            fullWidth
            name="weight"
            InputProps={{ classes: { root: classes.inputRoot } }}
        InputLabelProps={{
          classes: {
            root: classes.labelRoot,
            focused: classes.labelFocused
          }
        }}
            onChange={handleChange}
            value={fields.weight}
            label="weight"
            type="number"
            id="weight"
          />  


           <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
      <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="date of birth"
          format="MM/dd/yyyy"
          InputProps={{ classes: { root: classes.inputRoot } }}
          InputLabelProps={{
            classes: {
              root: classes.labelRoot,
              focused: classes.labelFocused
            }
          }}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{'aria-label': 'change date',}}
        />
      
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="last Date of period?"
          format="MM/dd/yyyy"
          InputProps={{ classes: { root: classes.inputRoot } }}
          InputLabelProps={{
            classes: {
              root: classes.labelRoot,
              focused: classes.labelFocused
            }
          }}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{'aria-label': 'change date',}}
        />
       
       
      </Grid>
    </MuiPickersUtilsProvider>     

          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Register Now!
          </Button>
       
        </form>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
        
      </>
    );
  };

  export default Registration;


    //  {/* <div> */}
    //  <section className={classes.form}>
    //  <form
    //    className="login-box"
    //    style={{width: '400px', height: '400px', backgroundColor: "#ffffff"}}
    //    onKeyPress={(event) => {
    //      if (event.which === 13 /* Enter */) {
    //        event.preventDefault();
    //      }
    //    }}
    //    onSubmit={handleSubmit}
    //  >

    //          {/* <img className= {classes.image} height={100} src={img}/> */}
    //          <h1 className= {classes.heading}>Her Hygiene</h1>
         
         
    //    <h2 className={classes.question}>{placeHolderText}</h2>

    //      <input
    //        type="number"
    //        name="height"
    //        placeholder="Height"
    //        value={fields.height}
    //        onChange={handleChange}
    //        className= {classes.input}
    //      />
     

     
    //      <input
    //        type="number"
    //        name="weight"
    //        placeholder="weight"
    //        value={fields.weight}
    //        onChange={handleChange}
    //        className= {classes.input}
    //      />
     
       
    //      <input
    //        type="number"
    //        name="cycleLength"
    //        placeholder="cycle Length"
    //        value={fields.cycleLength}
    //        onChange={handleChange}
    //        className= {classes.input}
    //      />
   
      
    //      <input
    //        name="age"
    //        placeholder="age"
    //        value={fields.age}
    //        onChange={handleChange}
    //        className= {classes.input}
    //   />

    //      <input
    //        name="cycleTotal"
    //        placeholder="cycle Total"
    //        value={fields.cycleTotal}
    //        onChange={handleChange}
    //        className={classes.input}
    //      />
    
    //      <input className={classes.input} name="lastDate" type="date" onChange={handleChange} />
     
    //   <input type="submit" value="Signup" /> 
      
    //  {/* <text style={{marginTop: '7%'}}>{step}</text>  */}
    //  </form>
    //  </section>
    //  {/* </div> */}