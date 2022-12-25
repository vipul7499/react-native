
import { UserContext } from "../../providers/UserProvider";
import {
  addPeriodRegister,
  getUserLogDocument,
  updateLogPeriod2,
  updateCurrentUseDocument,
  updateLogData,
} from "../../utils/firebase";
import Dashboard from "./Dashboard2";
import Registration from "./Registration";
import ViewCalendar from "./ViewCalendar.jsx";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import clsx from "clsx";
import firebase from "firebase/app";
import React, { useState, useContext } from "react";
import { useSwipeable } from "react-swipeable";
import { Calendar } from "react-date-range";
import formatDistance from "date-fns/formatDistance";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "@reach/router";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

import cx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";

//Vishesh

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import IconButton from "@material-ui/core/IconButton";
import AlarmIcon from "@material-ui/icons/Alarm";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import { AwesomeButton } from "react-awesome-button";
// import "react-awesome-button/dist/themes/theme-blue.css";
import "./awesomestyle.css";
//End of Vishesh :)
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
import {
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

//Vishesh
function valuetext(value) {
  return `${value}°C`;
}

const VisheshSlider = withStyles({
  root: {
    color: "#EF5779",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#f8c9d4",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#f8c9d4",
      main: "#ffa8bd",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffffff",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

const PrettoSlider = withStyles({
  root: {
    color: "#EF5779",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

//
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
    const selection = {
      startDate: subDays(lastDate, cycleLength),
      endDate: lastDate,
      key: "selection",
    };
    await updateLogPeriod2(user, { selection });

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
  const [sliderval, setSliderVal] = useState(-1);
  const [cal, setCalDate] = useState({
    calDate: Date.now(),
    futureDay: 0,
  });
  const [scroll, setScroll] = React.useState("paper");

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
      padding: "20px",
    },

    paper: {
      // margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      "& > *": {
        margin: theme.spacing(1, 2),
        width: "25ch",
      },
    },
    Button: {
      boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
      backgroundImage: "linear-gradient(147deg, #ff93ac 0%, #ff93ac 74%)",
      color: "#ffffff",
      margin: 15,
    },
    fixedHeight: {
      height: 1000,
    },
  }));

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    set({ x: down ? mx : 0, y: down ? my : 0 });
  });
  const bind2 = useDrag(({ down, movement: [mx, my] }) => {
    set({ x: down ? mx : 0, y: down ? my : 0 });
  });

  const useStylesCard = makeStyles(({ breakpoints, spacing }) => ({
    root: {
      marginLeft: "10%",
      marginRight: "10%",
      // borderRadius: spacing(2), // 16px
      transition: "0.3s",
      boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
      position: "relative",
      maxWidth: "80%",
      overflow: "initial",
      background: "#ffffff",
      display: "flex",
      flexDirection: "column",
      // paddingBottom: spacing(2),
    },
    media: {
      width: "100%",
      backgroundSize: "contain",
    },
    content: {
      padding: 24,
    },
    cta: {
      marginTop: 24,
      textTransform: "initial",
    },
  }));

  const styles = useStylesCard();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();

  const whichBackgroundColor = () => {
    if (compareAsc(today, predictedStart.toDate()) >= 0) {
      if (compareAsc(calDate, today) >= 1) {
        //log period
        return "linear-gradient(147deg, #C81F70 0%, #D19592 74%)";
      } else if (
        compareAsc(calDate, predictedStart.toDate()) >= 1 &&
        compareAsc(calDate, today) < 1
      ) {
        //late
        return "linear-gradient(147deg, #D99EC9 0%, #F6F0C4 74%)";
      } else if (compareAsc(calDate, predictedStart.toDate()) < 1) {
        //before
        return "linear-gradient(147deg, #ff9897 0%, #f650a0 74%)";
      }
    } else if (compareAsc(today, predictedStart.toDate()) == -1) {
      if (checkwithStart == -1) {
        return "linear-gradient(147deg, #ff9897 0%, #f650a0 74%)";
      } else if (checkwithStart >= 0 && checkwithEnd <= 0) {
        return "linear-gradient(147deg, #f869d5 0%, #5650de 74%)";
      } else if (checkwithEnd == 1) {
        return "linear-gradient(147deg, #C81F70 0%, #D19592 74%)";
      }
    } else {
      return "linear-gradient(147deg, #ff9897 0%, #f650a0 74%)";
    }
  };
  // const varToString = varObj => Object.keys(varObj)[0]
  const [open, setOpen] = React.useState({
    isOpen: false,
    height: false,
    pulseRate: false,
    rr: false,
    bpDiastolic: false,
    bpSystolic: false,
    hip: false,
    waist: false,
    weight: false,
    // binary begins
    fastFood: false,
    pcos: false,
    pimples: false,
    regExercise: false,
    regularity: false,
    skinDarkening: false,
    weightGain: false,
    More: false,
  });
  const {
    isOpen,
    height,
    pulseRate,
    rr,
    bpDiastolic,
    bpSystolic,
    hip,
    waist,
    weight,
    fastFood,
    pcos,
    pimples,
    regExercise,
    regularity,
    skinDarkening,
    weightGain,
    More,
  } = open;

  const handleClickOpen = (scrollType, toOpen) => () => {
    console.log(toOpen);
    if (toOpen === "height") {
      setOpen({ isOpen: true, height: true });
    } else if (toOpen === "pulseRate") {
      setOpen({ isOpen: true, pulseRate: true });
    } else if (toOpen === "rr") {
      console.log(toOpen);
      setOpen({ isOpen: true, rr: true });
    } else if (toOpen === "waist") {
      setOpen({ isOpen: true, waist: true });
    } else if (toOpen === "bpDiastolic") {
      setOpen({ isOpen: true, bpDiastolic: true });
    } else if (toOpen === "bpSystolic") {
      setOpen({ isOpen: true, bpSystolic: true });
    } else if (toOpen === "hip") {
      console.log(toOpen);
      setOpen({ isOpen: true, hip: true });
    } else if (toOpen === "weight") {
      setOpen({ isOpen: true, weight: true });
    } else if (toOpen === "fastFood") {
      setOpen({ isOpen: true, fastFood: true });
    } else if (toOpen === "pcos") {
      setOpen({ isOpen: true, pcos: true });
    } else if (toOpen === "pimples") {
      setOpen({ isOpen: true, pimples: true });
    } else if (toOpen === "regExercise") {
      setOpen({ isOpen: true, regExercise: true });
    } else if (toOpen === "regularity") {
      console.log(toOpen);
      setOpen({ isOpen: true, regularity: true });
    } else if (toOpen === "skinDarkening") {
      setOpen({ isOpen: true, skinDarkening: true });
    } else if (toOpen === "weightGain") {
      setOpen({ isOpen: true, weightGain: true });
    } else if (toOpen === "More") {
      setOpen({ isOpen: true, More: true });
    }
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen({
      isOpen: false,
      height: false,
      pulseRate: false,
      rr: false,
      bpDiastolic: false,
      bpSystolic: false,
      hip: false,
      waist: false,
      weight: false,
      fastFood: false,
      pcos: false,
      pimples: false,
      regExercise: false,
      regularity: false,
      skinDarkening: false,
      weightGain: false,
    });
  };
  const handleSliderSubmit = async (bit) => {
    if (sliderval < 0) return;

    if (height) {
      const data = {
        height: sliderval,
      };
      const height = sliderval;
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, height);
    } else if (pulseRate) {
      const pulseRate = sliderval;
      const data = {
        pulseRate: sliderval,
      };
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, pulseRate);
    } else if (rr) {
      const rr = sliderval;
      const data = {
        rr: sliderval,
      };
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, rr);
    } else if (bpDiastolic) {
      const bpDiastolic = sliderval;
      const data = {
        bpDiastolic: sliderval,
      };
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, bpDiastolic);
    } else if (bpSystolic) {
      const bpSystolic = sliderval;
      const data = {
        bpSystolic: sliderval,
      };
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, bpSystolic);
    } else if (hip) {
      const hip = sliderval;
      const data = {
        hip: sliderval,
      };
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, hip);
    } else if (waist) {
      const waist = sliderval;
      const data = {
        waist: sliderval,
      };
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, waist);
    } else if (weight) {
      const weight = sliderval;
      const data = {
        weight: sliderval,
      };
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, weight);
    } else if (fastFood) {
      const fastFood = bit;
      const data = {
        fastFood: bit,
      };
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, fastFood);
    } else if (pcos) {
      const pcos = bit;
      const data = {
        pcos: bit,
      };
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, pcos);
    } else if (pimples) {
      const pimples = bit;
      const data = {
        pimples: bit,
      };
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, pimples);
    } else if (regExercise) {
      const regExercise = bit;
      const data = {
        regExercise: bit,
      };
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, regExercise);
    } else if (regularity) {
      const regularity = bit;
      const data = {
        regularity: bit,
      };
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, regularity);
    } else if (skinDarkening) {
      const skinDarkening = bit;
      const data = {
        skinDarkening: bit,
      };
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, skinDarkening);
    } else if (weightGain) {
      const weightGain = bit;
      const data = {
        weightGain: bit,
      };
      await updateLogData(user, { data });
      await updateCurrentUseDocument(user, weightGain);
    }

    handleClose();
  };
  const renderRequiredQuestion = () => {
    if (height) {
      return "Please enter your height (in cms)";
    } else if (pulseRate) {
      return "Please enter your Pulse Rate";
    } else if (rr) {
      return "Please enter your respiratory rate";
    } else if (bpDiastolic) {
      return "Plese enter your Diastolic Blood pressure (in mmHg)";
    } else if (bpSystolic) {
      return "Plese enter your Systolic Blood pressure (in mmHg)";
    } else if (hip) {
      return "Please give your hip measure (in cms)";
    } else if (waist) {
      return "Please enter your waist measure (in cms)";
    } else if (weight) {
      return "How much do you weigh as of last measurement (in Kgs)";
    } else if (fastFood) {
      return "Do you consume fastfood regularly?";
    } else if (pcos) {
      return "Do you have PCOS?";
    } else if (pimples) {
      return "Have you observed increased pimples?";
    } else if (regExercise) {
      return "Do you exercise Regularly";
    } else if (regularity) {
      return "Are your menstrual cycles regular?";
    } else if (skinDarkening) {
      return "Have you observed any skin darkening recently?";
    } else if (weightGain) {
      return "Have you experienced weight gain recently?";
    }
  };
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={4} component="main">
          {/* <CssBaseline /> */}

          <Grid item xs={12} sm={12}>
            {/* <div className={classes.paper}> */}
            <Paper
              {...dayhandlers}
              style={{
                height: "100%",
                width: "100%",
                backgroundImage: whichBackgroundColor(),
                color: "white",
                paddingBottom: 35
              }}
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

                <Card className={cx(styles.root, shadowStyles.root)}>
                  <CardContent>
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
                        {/* when app is disabled */}
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
                        {/* when period are late */}
                        {compareAsc(calDate, predictedStart.toDate()) < 1 ? (
                          <>
                            <h1>Period</h1>
                            <h2>
                              {" "}
                              {formatDistance(
                                predictedStart.toDate(), //this will be the date of next period, which will come from the user variable
                                calDate,
                                { addSuffix: true }
                              )}
                            </h2>
                          </>
                        ) : (
                          <></>
                        )}
                        {/* render logic for before period */}
                      </>
                    ) : (
                      <></>
                    )}

                    {compareAsc(today, predictedStart.toDate()) == -1 ? (
                      <>
                        {checkwithStart == -1 ? (
                          <div style={{ fontSize: "30px" }}>
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
                          <div
                            style={{
                              fontSize: "30px",
                              backgroundColor: "white",
                            }}
                          >
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
                      size="medium"
                      className={classes.Button}
                    >
                      Log Period
                    </Button>
                    {!isSameDay(today, calDate) ? (
                      <ThemeProvider theme={theme}>
                        <Button
                          onClick={() => {
                            setCalDate({ calDate: today });
                          }}
                          variant="outlined"
                          size="medium"
                          color="secondary"
                        >
                          Today
                        </Button>
                      </ThemeProvider>
                    ) : (
                      <></>
                    )}
                    <div
                      style={{
                        textAlign: "center",
                        width: "100%",
                        backgroundColor: "white",
                      }}
                    >
                      <animated.div {...bind2()} style={{ x }}>
                        <div {...weekhandlers}>
                          {eachDayOfInterval({
                            start: startOfWeek(calDate),
                            end: endOfWeek(calDate),
                          }).map((day) => {
                            return (
                              <ThemeProvider theme={theme}>
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
                              </ThemeProvider>
                            );
                          })}
                        </div>
                      </animated.div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Paper>

            {/* <Paper style={{ textAlign: "center", width: "100%" }} >
              
           
            </Paper> */}
            {/* </div> */}
          </Grid>

          <Grid item xs={12}>
            <Paper className={"fixedHeightPaper"}>
              {/* <form  className={classes.form} noValidate autoComplete="off"> */}
              {/* <Button
        variant="contained"
        color="secondary"
        }
        startIcon={<AlarmIcon />}
      >
        
      </Button> */}
              <Grid container direction="row" justify="center" spacing={3}>
              <Grid item xs={12} style={{paddingTop:0}}>
          <h1
            style={{
              backgroundColor: "#ff4081",
              padding: "1%",
              color: "#ffffff",
              textAlign: 'center',
              fontSize: '2rem',
            }}
          >
            Additional Parameters
          </h1>
        </Grid>
                <Dialog
                  open={isOpen}
                  onClose={handleClose}
                  scroll={scroll}
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
                >
                  <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText
                      id="scroll-dialog-description"
                      tabIndex={-1}
                    >
                      {height ||
                      pulseRate ||
                      rr ||
                      bpDiastolic ||
                      bpSystolic ||
                      hip ||
                      waist ||
                      weight ? (
                        <>
                          <Typography
                            id="discrete-slider-small-steps"
                            gutterBottom
                          >
                            <h3>{renderRequiredQuestion()}</h3>
                          </Typography>
                          <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={20}
                            max={300}
                            onChange={(e) => {
                              setSliderVal(parseInt(e.target.textContent));
                            }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                      {fastFood ||
                      pcos ||
                      pimples ||
                      pimples ||
                      regExercise ||
                      regularity ||
                      skinDarkening ||
                      weightGain ? (
                        <>
                          <Typography
                            id="discrete-slider-small-steps"
                            gutterBottom
                          >
                            <h3>{renderRequiredQuestion()}</h3>
                          </Typography>
                        </>
                      ) : (
                        <></>
                      )}{" "}
                      {More ? (
                        <>
                          <Grid container spacing={4} justify={"center"}>
                            <Grid item>
                              <AwesomeButton
                                onPress={handleClickOpen("paper", "waist")}
                                size="large"
                                aria-label="add an alarm"
                              >
                                {" "}
                                Waist Measurement{" "}
                              </AwesomeButton>
                            </Grid>
                            <Grid item>
                              <AwesomeButton
                                onPress={handleClickOpen("paper", "waist")}
                                size="large"
                                aria-label="add an alarm"
                              >
                                {" "}
                                Waist Measurement{" "}
                              </AwesomeButton>
                            </Grid>
                            <Grid item>
                              <AwesomeButton
                                size="large"
                                onPress={handleClickOpen("paper", "weight")}
                                aria-label="add an alarm"
                              >
                                {" "}
                                Weight{" "}
                              </AwesomeButton>
                            </Grid>
                            <Grid item>
                              <AwesomeButton
                                onPress={handleClickOpen("paper", "fastFood")}
                                size="large"
                                aria-label="add an alarm"
                              >
                                {" "}
                                Fast Food{" "}
                              </AwesomeButton>
                            </Grid>
                            <Grid item>
                              <AwesomeButton
                                onPress={handleClickOpen("paper", "PCOS")}
                                size="large"
                                aria-label="add an alarm"
                              >
                                {" "}
                                PCOS{" "}
                              </AwesomeButton>
                            </Grid>
                            <Grid item>
                              <AwesomeButton
                                onPress={handleClickOpen("paper", "pimples")}
                                size="large"
                                aria-label="add an alarm"
                              >
                                {" "}
                                Pimples{" "}
                              </AwesomeButton>
                            </Grid>
                            <Grid item>
                              <AwesomeButton
                                size="large"
                                onPress={handleClickOpen(
                                  "paper",
                                  "regExercise"
                                )}
                                aria-label="add an alarm"
                              >
                                {" "}
                                Exercising Habits{" "}
                              </AwesomeButton>
                            </Grid>
                            <Grid item>
                              <AwesomeButton
                                onPress={handleClickOpen("paper", "regularity")}
                                size="large"
                                aria-label="add an alarm"
                              >
                                {" "}
                                Regularity{" "}
                              </AwesomeButton>
                            </Grid>
                            <Grid item>
                              <AwesomeButton
                                onPress={handleClickOpen(
                                  "paper",
                                  "skinDarkening"
                                )}
                                size="large"
                                aria-label="add an alarm"
                              >
                                Skin Darkening{" "}
                              </AwesomeButton>
                            </Grid>
                            <Grid item>
                              <AwesomeButton
                                size="large"
                                onPress={handleClickOpen("paper", "weightGain")}
                                aria-label="add an alarm"
                              >
                                {" "}
                                Weight Gain{" "}
                              </AwesomeButton>
                            </Grid>
                          </Grid>
                        </>
                      ) : (
                        <></>
                      )}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    {height ||
                    pulseRate ||
                    rr ||
                    bpDiastolic ||
                    bpSystolic ||
                    hip ||
                    waist ||
                    weight ? (
                      <>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            handleSliderSubmit();
                          }}
                          color="primary"
                        >
                          Submit
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => {
                            handleSliderSubmit(0);
                            handleClose();
                          }}
                          color="primary"
                        >
                          No
                        </Button>
                        <Button
                          onClick={() => {
                            handleSliderSubmit(1);
                            handleClose();
                          }}
                          color="primary"
                        >
                          Yes
                        </Button>
                      </>
                    )}
                  </DialogActions>
                </Dialog>

                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={4}
                  style={{paddingBottom :'50px'}}
                >
                  <Grid item>
                    <AwesomeButton
                      onPress={handleClickOpen("paper", "height")}
                      size="large"
                      aria-label="add an alarm"
                    >
                      {" "}
                      Height{" "}
                    </AwesomeButton>
                  </Grid>
                  <Grid item>
                    <AwesomeButton
                      onPress={handleClickOpen("paper", "pulseRate")}
                      size="large"
                      aria-label="add an alarm"
                    >
                      {" "}
                      Pulse rate{" "}
                    </AwesomeButton>
                  </Grid>
                  <Grid item>
                    <AwesomeButton
                      onPress={handleClickOpen("paper", "rr")}
                      size="large"
                      aria-label="add an alarm"
                    >
                      {" "}
                      Weight{" "}                       {/*Changed from rr temporarily*/}
                    </AwesomeButton>
                  </Grid>
                  <Grid item>
                    <AwesomeButton
                      onPress={handleClickOpen("paper", "bpDiastolic")}
                      size="large"
                      aria-label="add an alarm"
                    >
                      {" "}
                      Physical Activity{" "}           {/*Changed from bp Diastolic temporarily*/}
                    </AwesomeButton>
                  </Grid>
                  <Grid item>
                    <AwesomeButton
                      size="large"
                      onPress={handleClickOpen("paper", "bp Systolic")}
                      aria-label="add an alarm"
                    >
                      {" "}
                      Waist{" "}                  {/*Changed temporarily from BP Systolic */}
                    </AwesomeButton>
                  </Grid>
                  <Grid item>
                    <AwesomeButton
                      onPress={handleClickOpen("paper", "hip")}
                      size="large"
                      aria-label="add an alarm"
                    >
                      {" "}
                      Hip{" "}
                    </AwesomeButton>
                  </Grid>
                  <Grid item>
                    <AwesomeButton
                      onPress={handleClickOpen("paper", "More")}
                      size="Xlarge"
                      aria-label="add an alarm"
                      style={{width: '300px'}}
                    >
                      {" "}
                      Input More Information{" "}
                    </AwesomeButton>
                  </Grid>
                </Grid>
              </Grid>
              {/* </form> */}
            </Paper>
          </Grid>

          {
            // bruh
            //    <Grid item>
            //    <AwesomeButton
            //      onPress={handleClickOpen("paper", "waist")}
            //      size="large"
            //      aria-label="add an alarm"
            //    >
            //      {" "}
            //      Waist Measurement{" "}
            //    </AwesomeButton>
            //  </Grid>
            //  <Grid item>
            //    <AwesomeButton
            //      size="large"
            //      onPress={handleClickOpen("paper", "weight")}
            //      aria-label="add an alarm"
            //    >
            //      {" "}
            //      Weight{" "}
            //    </AwesomeButton>
            //  </Grid>
            //  <Grid item>
            //    <AwesomeButton
            //      onPress={handleClickOpen("paper", "fastFood")}
            //      size="large"
            //      aria-label="add an alarm"
            //    >
            //      {" "}
            //      Fast Food{" "}
            //    </AwesomeButton>
            //  </Grid>
            //  <Grid item>
            //    <AwesomeButton
            //      onPress={handleClickOpen("paper", "PCOS")}
            //      size="large"
            //      aria-label="add an alarm"
            //    >
            //      {" "}
            //      PCOS{" "}
            //    </AwesomeButton>
            //  </Grid>
            //  <Grid item>
            //    <AwesomeButton
            //      onPress={handleClickOpen("paper", "pimples")}
            //      size="large"
            //      aria-label="add an alarm"
            //    >
            //      {" "}
            //      Pimples{" "}
            //    </AwesomeButton>
            //  </Grid>
            //  <Grid item>
            //    <AwesomeButton
            //      size="large"
            //      onPress={handleClickOpen("paper", "regExercise")}
            //      aria-label="add an alarm"
            //    >
            //      {" "}
            //      Exercising Habits{" "}
            //    </AwesomeButton>
            //  </Grid>
            //  <Grid item>
            //    <AwesomeButton
            //      onPress={handleClickOpen("paper", "regularity")}
            //      size="large"
            //      aria-label="add an alarm"
            //    >
            //      {" "}
            //      Regularity{" "}
            //    </AwesomeButton>
            //  </Grid>
            //  <Grid item>
            //    <AwesomeButton
            //      onPress={handleClickOpen("paper", "skinDarkening")}
            //      size="large"
            //      aria-label="add an alarm"
            //    >
            //      Skin Darkening{" "}
            //    </AwesomeButton>
            //  </Grid>
            //  <Grid item>
            //    <AwesomeButton
            //      size="large"
            //      onPress={handleClickOpen("paper", "weightGain")}
            //      aria-label="add an alarm"
            //    >
            //      {" "}
            //      Weight Gain{" "}
            //    </AwesomeButton>
            //  </Grid>
            //  }
            /* <Grid container spacing={3}>
                    <Grid item>
                      <AwesomeButton
                        onClick={handleClickOpen("paper", "height")}
                        size="medium"
                        aria-label="add an alarm"
                      >
                        {" "}
                        1{" "}
                      </AwesomeButton>
                    </Grid>
                    <Grid item>
                      <AwesomeButton
                        onClick={handleClickOpen("paper", "height")}
                        size="medium"
                        aria-label="add an alarm"
                      >
                        {" "}
                        1{" "}
                      </AwesomeButton>
                    </Grid>
                    <Grid item>
                      <AwesomeButton
                        onClick={handleClickOpen("paper", "height")}
                        size="medium"
                        aria-label="add an alarm"
                      >
                        {" "}
                        1{" "}
                      </AwesomeButton>
                    </Grid>
                    <Grid item>
                      <AwesomeButton
                        onClick={handleClickOpen("paper", "height")}
                        size="medium"
                        aria-label="add an alarm"
                      >
                        {" "}
                        1{" "}
                      </AwesomeButton>
                    </Grid>
                    <Grid item>
                      <AwesomeButton
                        onClick={handleClickOpen("paper", "height")}
                        size="medium"
                        aria-label="add an alarm"
                      >
                        {" "}
                        1{" "}
                      </AwesomeButton>
                    </Grid>
                    <Grid item>
                      <AwesomeButton
                        onClick={handleClickOpen("paper", "height")}
                        size="medium"
                        aria-label="add an alarm"
                      >
                        {" "}
                        1{" "}
                      </AwesomeButton>
                    </Grid>
                    <Grid item>
                      <AwesomeButton
                        onClick={handleClickOpen("paper", "height")}
                        size="medium"
                        aria-label="add an alarm"
                      >
                        {" "}
                        1{" "}
                      </AwesomeButton>
                    </Grid>
                    <Grid item>
                      <AwesomeButton
                        onClick={handleClickOpen("paper", "height")}
                        size="medium"
                        aria-label="add an alarm"
                      >
                        {" "}
                        1{" "}
                      </AwesomeButton>
                    </Grid>
                    <Grid item>
                      <AwesomeButton
                        onClick={handleClickOpen("paper", "height")}
                        size="medium"
                        aria-label="add an alarm"
                      >
                        {" "}
                        1{" "}
                      </AwesomeButton>
                    </Grid>
                    <Grid item>
                      <AwesomeButton
                        onClick={handleClickOpen("paper", "height")}
                        size="medium"
                        aria-label="add an alarm"
                      >
                        {" "}
                        1{" "}
                      </AwesomeButton>
                    </Grid>
                  </Grid> */
          }
          {/* <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          square
        >
        <Paper style={{marginTop:"40px", height: "400px", width: "100%" }}>
              <Bar />
            </Paper>
            </Grid>
        */}
          <Dashboard />
        </Grid>
      </div>
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
        <Registration user={user} handleRegister={handleRegister} />
        {/* <RegForm  /> */}
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
