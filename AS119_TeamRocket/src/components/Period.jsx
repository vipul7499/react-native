import firebase from "firebase/app";
import React, { useState, useContext } from "react";
import { useSwipeable } from "react-swipeable";
import { UserContext } from "../providers/UserProvider";
import {
  addPeriodRegister,
  getUserLogDocument,
  updateCurrentUseDocument,
} from "../utils/firebase";
import formatDistance from "date-fns/formatDistance";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "@reach/router";
import Bar from "./Bar";
import axios from "axios";

import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

import {
  addDays,
  eachDayOfInterval,
  startOfWeek,
  getDay,
  subWeeks,
  addWeeks,
  compareAsc,
  subDays,
  format,
  endOfWeek,
  differenceInDays,
  isSameDay,
  toDate,
  differenceInCalendarMonths,
} from "date-fns";
import { Box, TextField } from "@material-ui/core";

const RegForm = ({ user, handleRegister }) => {
  const [fields, setFields] = useState({
    cycleTotal: 0,
    age: 0,
    weight: 0,
    cycleLength: 0,
    height: 0,
    lastDate: Date.now(),
    // lastStart:new Date(),
    // lastEnd:new Date()
  });
  const [placeHolderText, setPlaceHolderText] = useState(
    "What is your height? (in cms)"
  );
  const [step, setStep] = useState(1);
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

    const { cycleTotal, age, weight, cycleLength, height, lastDate } = fields;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
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
  const changePlaceHolder = (currstep) => {
    if (currstep === 1) setPlaceHolderText("What is your height? (in cms)");
    if (currstep === 2) setPlaceHolderText("What is your Weight? (in kg) ");
    if (currstep === 3)
      setPlaceHolderText("What is your average period cycle length? (in days)");
    if (currstep === 4) setPlaceHolderText("What is your age?");
    if (currstep === 5)
      setPlaceHolderText("What is your average total cycle ?(in days)");
    if (currstep === 6)
      setPlaceHolderText("Please log your first day of last period");
    if (currstep === 7)
      setPlaceHolderText("Please Submit with the following details");
  };
  const goPrev = () => {
    changePlaceHolder(step - 1);

    setStep(step - 1);
  };
  const goNext = () => {
    changePlaceHolder(step + 1);
    setStep(step + 1);
  };
  return (
    <>
      <form
        className="login-box"
        onKeyPress={(event) => {
          if (event.which === 13 /* Enter */) {
            event.preventDefault();
          }
        }}
        onSubmit={handleSubmit}
      >
        <h2 className="login-heading">{placeHolderText}</h2>

        {step === 1 ? (
          <input
            type="number"
            name="height"
            placeholder="Height"
            value={fields.height}
            onChange={handleChange}
          />
        ) : (
          <></>
        )}

        {step === 2 ? (
          <input
            type="number"
            name="weight"
            placeholder="weight"
            value={fields.weight}
            onChange={handleChange}
          />
        ) : (
          <></>
        )}
        {step === 3 ? (
          <input
            type="number"
            name="cycleLength"
            placeholder="cycle Length"
            value={fields.cycleLength}
            onChange={handleChange}
          />
        ) : (
          <></>
        )}
        {step === 4 ? (
          <input
            name="age"
            placeholder="age"
            value={fields.age}
            onChange={handleChange}
          />
        ) : (
          <></>
        )}

        {step === 5 ? (
          <input
            name="cycleTotal"
            placeholder="cycle Total"
            value={fields.cycleTotal}
            onChange={handleChange}
          />
        ) : (
          <></>
        )}
        {step === 6 ? (
          <input name="lastDate" type="date" onChange={handleChange} />
        ) : (
          <></>
        )}
        {step === 7 ? <input type="submit" value="Signup" /> : <></>}
      </form>
      {step > 1 ? <button onClick={goPrev}>Prev</button> : <></>}
      {step < 7 ? <button onClick={goNext}>Next</button> : <></>}
      {step}
    </>
  );
};



const DashBoard = (props) => {
  const { user, start, end } = props;
  const [cal, setCalDate] = useState({
    calDate: Date.now(),
    futureDay: 0,
  });

  const [fields,setFields]=useState({
          weight:0,
          height:0,
          pcos:0,
          pulseRate:0,
          rr:0,
          regularity:0,
          hip:0,
          waist:0,
          weightGain:0,
          skinDarkening:0,
          pimples:0,
          fastFood:0,
          regExercise:0,
          bpSystolic:0,
          bpDiastolic:0,       
  })

  let { predictedStartDate, predictedEndDate } = user.data;
  const predictedStart = predictedStartDate ? predictedStartDate : start;
  const predictedEnd = predictedEndDate ? predictedEndDate : end;
  const { calDate, futureDay } = cal;
  const today = Date.now();
  const goToNextDate = () => {
    setCalDate({
      calDate: addDays(calDate, 1),
      futureDay:
        differenceInDays(predictedStart.toDate(), addDays(calDate, 1)) % 31,
    });
    // setFutureDay(differenceInDays(user.data.predictedStartDate.toDate(),calDate)%31);
    // console.log(futureDay)
  };
  const goToPrevDate = () => {
    setCalDate({
      calDate: subDays(calDate, 1),
      futureDay:
        differenceInDays(predictedStart.toDate(), subDays(calDate, 1)) % 31,
    });
    // setFutureDay(differenceInDays(user.data.predictedStartDate.toDate(),calDate)%31);
    // console.log(futureDay)
  };
  const goToNextWeek = () => {
    setCalDate({
      calDate: addWeeks(calDate, 1),
      futureDay:
        differenceInDays(predictedStart.toDate(), addWeeks(calDate, 1)) % 31,
    });
    // setFutureDay(differenceInDays(user.data.predictedStartDate.toDate(),calDate)%31);
    // console.log(futureDay)
  };
  const goToPrevWeek = () => {
    setCalDate({
      calDate: subWeeks(calDate, 1),
      futureDay:
        differenceInDays(predictedStart.toDate(), subWeeks(calDate, 1)) % 31,
    });
    // setFutureDay(differenceInDays(user.data.predictedStartDate.toDate(),calDate)%31);
    // console.log(futureDay)
  };
  const dayhandlers = useSwipeable({
    onSwipedLeft: (eventData) => goToNextDate(),
    onSwipedRight: (eventData) => goToPrevDate(),
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });
  const weekhandlers = useSwipeable({
    onSwipedLeft: (eventData) => goToNextWeek(),
    onSwipedRight: (eventData) => goToPrevWeek(),
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });

  const weekday = ["S", "M", "T", "W", "T", "F", "S"];
  const checkwithStart = compareAsc(calDate, predictedStart.toDate());
  const checkwithEnd = compareAsc(calDate, predictedEnd.toDate());
  const userLog = getUserLogDocument(user.data.uid);
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      minHeight: "0",
    },
    image: {
      // backgroundImage: `url(${pad})`,
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100%",
      flexGrow: "100",
      width: "100%",
    },
    paper: {
      // margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      '& > *': {
        margin: theme.spacing(1,2),
        width: '25ch',
      },
    },
  }));

  const classes = useStyles();
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(({ down, movement: [mx, my] }) => {set({ x: down ? mx : 0, y: down ? my : 0 });});
  const bind2 = useDrag(({ down, movement: [mx, my] }) => {set({ x: down ? mx : 0, y: down ? my : 0 });});


  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name,value)
    setFields({ ...fields, [name]: value });
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const { email, password, firstName,lastName, phone } = fields;
  //   const name=firstName+lastName;
  //   console.log(fields)
  //   try {
  //     const { user } = await auth.createUserWithEmailAndPassword(
  //       email,
  //       password
  //     );
  //     createUserProfileDocument(user, {name , phone });
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   setFields({
  //     email: "",
  //     password: "",
  //     firstName:"",
  //     lastName:"",
  //     phone: "",
  //   });
  // };


  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          lg={7}
          id={"flex-col-scroll1"}
          className={classes.image}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          lg={5}
          component={Paper}
          elevation={6}
          className={"flex-col-scroll2"}
          square
        >
          <div className={classes.paper}>
            <Paper
              {...dayhandlers}
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "pink",
                color: "white",
                margin: "auto",
              }}
              elevation={3}
            >
              <div style={{ textAlign: "center" }}>
                {/* This will only handle rendering calDate */}
                <animated.div {...bind()} style={{ x }}>
                  <Box
                    {...dayhandlers}
                    style={{
                      fontSize: "60px",
                      paddingTop: "30px",
                      textAlign: "center",
                    }}
                  >
                    {isSameDay(calDate, today) ? <div>Today</div> : <></>}
                    {format(calDate, "dd MMMM yyyy")}
                  </Box>
                </animated.div>
                {/* {compareAsc(today, addDays( predictedEndDate.toDate(),16)) === 1 ? (
            <>
              <h1>We will not entertain you unless you log period!</h1>
            </>
          ) : (
            <></>
          )} */}


                {compareAsc(today, predictedStart.toDate()) >= 0 ? (
                  <>
                    {compareAsc(calDate, today) >= 1 ? (
                      <>
                        <h1>
                          Log the first day of your last period for better
                          predictions
                        </h1>
                      </>
                    ) : (
                      <></>
                    )}
                    {compareAsc(calDate, predictedStart.toDate()) >= 1 &&
                    compareAsc(calDate, today) < 1 ? (
                      <>
                        <h1>Late for </h1>
                        <h1>
                          {formatDistance(
                            predictedStart.toDate(), //this will be the date of next period, which will come from the user variable
                            calDate,
                            { addSuffix: false }
                          )}
                        </h1>
                      </>
                    ) : (
                      <></>
                    )}
                    {compareAsc(calDate, predictedStart.toDate()) < 1 ? (
                      <>
                        <h1>before late periods</h1>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {compareAsc(today, predictedStart.toDate()) == -1 ? (
                  <>
                    <h1>In right place</h1>
                    {checkwithStart == -1 ? (
                      <div style={{ fontSize: "30px",color:"red"}}>
                        {" "}
                        period{" "}
                        {formatDistance(
                          predictedStart.toDate(), //this will be the date of next period, which will come from the user variable
                          calDate,
                          { addSuffix: true }
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                    {checkwithStart >= 0 && checkwithEnd <= 0 ? (
                      <div style={{ fontSize: "30px",color:"green",backgroundColor:"white" }}>
                        Prediction: period
                        <br /> Day{" "}
                        {differenceInDays(
                          calDate,
                          predictedStart.toDate() //this will be the date of next period, which will come from the user variable
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                    {checkwithEnd == 1 ? (
                      <>
                        <h1>Future Cycle</h1>
                        {/* This is the condition to write period prediction , +5 */}
                        {compareAsc(
                          calDate,
                          addDays(
                            predictedStart.toDate(),
                            31 *
                              Math.abs(
                                differenceInCalendarMonths(
                                  calDate,
                                  predictedStart.toDate()
                                )
                              )
                          )
                        ) >= 0 &&
                        compareAsc(
                          calDate,
                          addDays(
                            predictedStart.toDate(),
                            31 *
                              Math.abs(
                                differenceInCalendarMonths(
                                  calDate,
                                  predictedStart.toDate()
                                )
                              ) +
                              5
                          )
                        ) < 1 ? (
                          <>
                            <h1>Prediction : period</h1>
                          </>
                        ) : (
                          <></>
                        )}

                        <div style={{ fontSize: "30px" }}>
                          <br /> Day {Math.abs(futureDay)}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}

                <Button
                  component={Link}
                  to={"/logperiod"}
                  variant="contained"
                  size="large"
                  color="secondary"
                >
                  Log Period
                </Button>

                {!isSameDay(today, calDate) ? (
                  <Button
                    onClick={() => {
                      setCalDate({ calDate: today });
                    }}
                    variant="outlined"
                    size="large"
                    color="secondary"
                  >
                    Today
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </Paper>

            <Paper style={{ textAlign: "center", width: "100%" }} elevation={3}>
              <animated.div {...bind2()} style={{ x }}>
                <div {...weekhandlers}>
                  {eachDayOfInterval({
                    start: startOfWeek(calDate),
                    end: endOfWeek(calDate),
                  }).map((day) => {
                    return (
                      <Button
                        color="secondary"
                        value={day}
                        onClick={(e) => {
                          setCalDate({
                            calDate: new Date(e.currentTarget.value),
                            futureDay:
                              differenceInDays(
                                predictedStart.toDate(),
                                new Date(e.currentTarget.value)
                              ) % 31,
                          });
                        }}
                      >
                        <h1>
                          {" "}
                          {weekday[getDay(day)]} {format(day, "dd ")}
                        </h1>
                      </Button>
                    );
                  })}
                </div>
              </animated.div>
            </Paper>

            <Paper style={{ height: "400px", width: "100%" }}>
              <Bar />
            </Paper>
          
          </div>
          <Paper>
              {/* button  */}
          {/* weight,-->numerical
          height,-->numerical
          pulseRate:null, -->numerical
          rr:null,-->numerical
          hip:null,-->numerical
          waist:null,-->numerical

          cycleLength,-->numerical
          cycleTotal,-->numerical
          pcos:null,--> Binary
          regularity:null,-->binary
          weightGain:null,-->binary
          skinDarkening:null,-->binary
          pimples:null,-->binary
          fastFood:null,-->binary
          regExercise:null,-->binary
          bpSystolic:null,-->slider 
          bpDiastolic:null, -->slider        
           */}
           <form className={classes.form} noValidate autoComplete="off">
  <TextField id="standard-basic" label="Height" />
  <TextField id="standard-basic" label="Weight" />
  <TextField id="standard-basic" label="Pulse rate" />
  <TextField id="standard-basic" label="rr" />
  <TextField id="standard-basic" label="Hip" />
  <TextField id="standard-basic" label="Waist" />
</form>
           
            </Paper>
        </Grid>
      </Grid>
    </>
  );
};



const Period = () => {
  const [user, setUser] = useContext(UserContext);
  const [isRegister, setIsRegistered] = useState({
    isRegistered: false,
    start: firebase.firestore.Timestamp.fromDate(new Date()),
    end: firebase.firestore.Timestamp.fromDate(new Date()),
  });
  const { start, end } = isRegister;
  console.log(start, end);
  const handleRegister = (predictedStartDate, predictedEndDate) => {
    setIsRegistered({
      isRegistered: true,
      start: firebase.firestore.Timestamp.fromDate(predictedStartDate),
      end: firebase.firestore.Timestamp.fromDate(predictedEndDate),
    });
  };
  
  if (user.data.isPeriodRegistered || isRegister.isRegistered) {
    return <DashBoard start={start} end={end} user={user} />;
  } else {
    return (
      <>
        <RegForm user={user} handleRegister={handleRegister} />
      </>
    );
  }
};
export default Period;
{
  /* Here we write code for conditional rendering based on documentation flo */
}





















{
  /* 
   if(today>predictedEndDate)
   {
     //yaha pe absolutely break app for future dates --prompt user to log period of only this month--once done->this will lead us to (else if today<predictedStartDate and app will work)
     //remains same for past dates 
   }
   if(today>= predictedStartDate&&today<=predictedEndDate)
   {
     //late perod conditional rendering --prompt user to log period of only this month--once done->this will lead us to (else if today<predictedStartDate and app will work)
     //remains same for past dates
   }
   else if(today<predictedStartDate)
   {
     //build less than greater than easy comparing wrapper functions
       if(currentmonthperiodEndDate<calDate&&calDate<PredictedStartDate)
       {
         day 5-x etc
         number of days to period , 
         ovulation period cycle ,
         chances of getting pregnant,
       }
       else if(calDate within this months logged period dates){
         show day 0 day1 etc 
       }
       else if(calDate<this months logged startDate)
       {
         show past cycle day 0-28 
          which will show
          ovulation period cycle ,
          chances of getting pregnant, etc 
          //yaha pe firebase fetch karna padega mp to get all dates from past and then access if month is available or not

       }
   }
   */
}
