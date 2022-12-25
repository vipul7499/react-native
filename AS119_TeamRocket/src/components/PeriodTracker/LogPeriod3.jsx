import React, { useState, useContext, useEffect } from "react";
import {
  updateLogPeriod2,
  getUserLogDocument,
  updateCurrentUseDocument,
} from "../../utils/firebase";
import { addDays, startOfMonth, compareAsc, toDate } from "date-fns";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import CircleLoader from "react-spinners/CircleLoader";
import { Link } from "@reach/router";
import { UserContext } from "../../providers/UserProvider";
import "react-date-range/dist/styles.css"; // main style file
// import 'react-date-range/dist/theme/default.css'; // default theme css
import "../../calender.scss";
import axios from "axios";

import { DateRange } from "react-date-range";
import { subMonths } from "date-fns/esm";

const LogPeriod3 = () => {
  const [user] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  // const currDate = Date.now();
  const currDate = subMonths(Date.now(), 1);
  const [state, setState] = useState([]);
  const fetchLogMonth = async (date) => {
    setLoading(true);
    const ax = await getUserLogDocument(user.data.uid);
    const s = await ax.get();
    let id = 0;
    var __FOUND = state.find(function (items, index) {
      console.log(items);
      if (items.key === "selection") {
        id = index;
        return true;
      }
    });
    __FOUND.startDate = startOfMonth(date);
    __FOUND.endDate = startOfMonth(date);

    let arr = [...state];
    arr[id] = __FOUND;
    setState(arr);

    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      const ax = await getUserLogDocument(user.data.uid);
      const s = await ax.get();
      const arr = [];
      let id = 0;
      const currDate = Date.now();
      s.forEach((doc) => {
        console.log(doc.data());
        if (doc.data().endDate) {
          let selection = {
            key: `selection${startOfMonth(doc.data().endDate.toDate())}`,
            num: id,
            startDate: doc.data().startDate.toDate(),
            endDate: doc.data().endDate.toDate(),
            showDateDisplay: false,
            disabled: true,
          };
          arr.push(selection);
          id++;
        }
      });
      if (user.data.predictedStartDate) {
        const selectionPredicted = {
          key: "selectionPredicted",
          startDate: user.data.predictedStartDate.toDate(),
          endDate: user.data.predictedEndDate.toDate(),
          color: "red",
          disabled: true,
        };
        arr.push(selectionPredicted);
      }
      const selection = {
        key: "selection",
        startDate: startOfMonth(currDate),
        endDate: startOfMonth(currDate),
        color: "pink",
      };

      arr.push(selection);
      console.log(arr);
      setState(arr);

      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const selection = state.find((item, index) => {
      if (item.key === "selection") {
        return true;
      }
    });
    console.log(state);
    await updateLogPeriod2(user, { selection });
    // const config={
    //     headers:{
    //     'Content-Type':'application/json'
    //     }
    // }
    // const send={
    //     id:user.data.uid
    // }
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const send = {
      id: user.data.uid,
    };

    if (
      compareAsc(startOfMonth(selection.endDate), startOfMonth(currDate)) === 0
    ) {
      console.log("prediction api called ");

      const res = await axios.post(
        "https://herhygiene.herokuapp.com/predict",
        send,
        config
      );
      console.log(res);

      // const res=await axios.post('http://localhost:5000/predict',send,config)
      // console.log(res)
      const predictedStartDate = addDays(selection.startDate, res.data.t_len);
      const predictedEndDate = addDays(predictedStartDate, res.data.p_len);
      console.log(predictedStartDate, predictedEndDate);
      await updateCurrentUseDocument(user, {
        predictedStartDate,
        predictedEndDate,
      });
    }
    window.location.reload();
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
      display: "flex",
      minHeight: "0",
    },
    image: {
      backgroundImage: `url(${require("./herHyg.png")})`,
      backgroundColor: "#F6D7D5",
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
    fixedHeight: {
      height: 100,
      backgroundColor: "#F6D7D5",
    },

    paper: {
      // margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));
  const classes = useStyles();

  if (loading) {
    return (
      <CircleLoader
        css={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        size="400px"
        color="pink"
      />
    );
  } else {
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
              <DateRange
                months={2}
                // rangeColors={["pink"]}
                moveRangeOnFirstSelection={false}
                showDateDisplay={true}
                onShownDateChange={(item) => {
                  //yaha pe call for firebase doc
                  fetchLogMonth(item);
                }}
                onChange={(item) => {
                  console.log(item);
                  let id = 0;
                  var __FOUND = state.find(function (items, index) {
                    console.log(items);
                    if (items.key === item.selection.key) {
                      id = index;
                      return true;
                    }
                  });
                  let arr = [...state];
                  arr[id] = item.selection;
                  setState(arr);
                }}
                ranges={state}
              />
              <Button
                onClick={handleSubmit}
                // component={Link}
                // to={"/period"}
                variant="contained"
                size="large"
                color="secondary"
              >
                Log Period
              </Button>
              <Button component={Link} to={"/period"}>
                Back to Calender
              </Button>
            </div>
          </Grid>
        </Grid>
      </>
    );
  }
};
export default LogPeriod3;
