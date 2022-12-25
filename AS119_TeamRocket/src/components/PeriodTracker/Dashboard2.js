import Welcome from "../dash/Welcome";
import Periods from "../dash/Periods";
import Chart from "./LineChart";
import Deposits from "./DepositsZ";
import { UserContext } from "../../providers/UserProvider";
import React, { useContext } from "react";
import clsx from "clsx";
import { auth } from "../../utils/firebase";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Cardy from "./cards";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useWideCardMediaStyles } from "@mui-treasury/styles/cardMedia/wide";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
import { useBouncyShadowStyles } from "@mui-treasury/styles/shadow/bouncy";
import edu8 from "./edu8.jpg";
import edu9 from "./edu9.jpg";
import edu10 from "./edu10.jpg";
import edu11 from "./edu11.jpg";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 260,
  },
  fixedHeight2: {
    height: 220,
  },

  Cardy: {
    width: "100%",
    // marginTop: '5%',
    transition: "0.3s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    position: "relative",
    maxWidth: "100%",
    // marginLeft: '5%',
    // marginRight: 'auto',
    overflow: "initial",
    backgroundImage: "linear-gradient(147deg, #ff9897 0%, #f650a0 74%)",
    display: "flex",
    flexDirection: "column",
    // alignItems: 'center',
    color: "#ffffff",
  },
  ugh: {
    maxWidth: 500,
    height: 170,
  },
  Button: {
    height: 100,
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    backgroundImage: "linear-gradient(147deg, #ff9897 0%, #f650a0 74%)",
    color: "#ffffff",
    margin: 10,
    fontSize: 30,
  },
  button2: {
    marginBottom: "5%",
    color: "white",
    fontSize: "2rem",
    marginLeft: "2%",
    width: "100%",
    backgroundColor: "#ffa8bd",
    padding: "15px 25px",
  },
  contain: {
    marginLeft: "5%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "25%",
    },
    pos: {
      marginBottom: 12,
      fontSize: "1.5rem",
      marginTop: "5%",
      marginBottom: "15%",
    },
    cardroot: {
      maxWidth: 304,
      margin: "auto",
      boxShadow: "none",
      borderRadius: 0,
    },
    cta: {
      marginTop: 24,
      textTransform: "initial",
    },
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [user, setUser] = useContext(UserContext);
  // const shadowStyles = useOverShadowStyles();

  const logout = async () => {
    await auth.signOut();
    setUser({ data: null, loading: false });
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRetrain = async () => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const send = {
      id: user.data.uid,
    };
    const res = await axios.post(
      "https://herhygiene.herokuapp.com/retrain",
      send,
      config
    );
    console.log(res);
    window.location.reload();
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
  const cardyboi = clsx(classes.paper, classes.Cardy);
  const mediaStyles = useWideCardMediaStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const shadowStyles = useBouncyShadowStyles();
  return (
    <>
      <CssBaseline />

      {/* <main className={classes.content}> */}

      {/* <Container maxWidth="lg" className={classes.container}> */}
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} style={{ marginTop: "3%" }}>
          <Paper className={fixedHeightPaper} elevation={3}>
            <Welcome user={user} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Deposits />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper} elevation={3}>
            <Periods />
          </Paper>
        </Grid>
        <Grid item lg={9}>
          <Paper className={fixedHeightPaper} elevation={3}>
            <Chart />
          </Paper>
        </Grid>
        <Grid item lg={3}>
          <Button
            onClick={handleRetrain}
            variant="contained"
            size="large"
            className={classes.button2}
          >
            Retrain
          </Button>
        </Grid>
        {/* Recent Deposits */}

        {/* Do you knowww */}

        <Grid item xs={12}>
          <h1
            style={{
              backgroundColor: "#ffa8bd",
              padding: "1%",
              color: "#ffffff",
              marginBottom: "3%",
            }}
          >
            Your Menstruation Guide
          </h1>
        </Grid>
        <Grid
          container
          spacing={3}
          justify={"space-around"}
          alignItems="flex-start"
        >
          <Grid item>
            <Card className={shadowStyles.root} style={{ maxWidth: 300 }}>
              <CardMedia classes={mediaStyles} image={edu8} />
              <CardContent>
                <TextInfoContent
                  classes={textCardContentStyles}
                  overline={"March 20, 2019"}
                  heading={"Common Period Symptom"}
                  body=
                  {
                    <ul>
                    <li>Backache</li>
                    <li>Cramps</li>
                    <li>Mood Swings</li>
                    <li>Headche</li>
                    <li>Bloating</li>
                    </ul>
                  }
                />
                  
              </CardContent>
            </Card>
          </Grid>

          <Grid item>
            <Card className={shadowStyles.root} style={{ maxWidth: 280 }}>
              <CardMedia classes={mediaStyles} image={edu9} />
              <CardContent>
                <TextInfoContent
                  classes={textCardContentStyles}
                  overline={"March 20, 2019"}
                  heading={"How to combat cramps"}
                  body={
                    <ul>
                      <li>Exercise</li>
                      <li>Well Balanced Diet</li>
                      <li>Reduce Stress</li>
                      <li>Dark Chocolate</li>
                      <li>Vitamins</li>
                      <li>Check for menstrual disorders</li>
                    </ul>
                  }
                />
              </CardContent>
            </Card>
          </Grid>


          <Grid item>
            <Card className={shadowStyles.root} style={{ maxWidth: 280 }}>
              <CardMedia classes={mediaStyles} image={edu10} />
              <CardContent>
                <TextInfoContent
                  classes={textCardContentStyles}
                  overline={"March 20, 2019"}
                  heading={"Common Sanitary Products"}
                  body={
                    <ul>
                      <li>Sanitary Napkins</li>
                      <li>Tampons</li>
                      <li>Menstrual Cups</li>
                      <li>Period Panties</li>
                    </ul>
                  }
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item>
            <Card className={shadowStyles.root} style={{ maxWidth: 280 }}>
              <CardMedia classes={mediaStyles} image={edu11} />
              <CardContent>
                <TextInfoContent
                  classes={textCardContentStyles}
                  overline={"March 20, 2019"}
                  heading={"Period Disorders"}
                  body={
                    <ul>
                      <li>Premenstrual syndrome (PMS)</li>
                      <li>Premenstrual dysphonic disorder</li>
                      <li>Amenorrhea</li>
                      <li>Oligomenorrhea</li>
                      <li>Period Panties</li>
                    </ul>
                  }
                />
                </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Grid>


      <Grid item xs={12}>
        {/* <h1 style= {{backgroundColor:"#ef5779", padding : '2%' ,color: '#ffffff'}}>Your retraining status</h1> */}
      </Grid>
      <Grid item xs={12} md={6}>
        {/* <Regular/> */}
      </Grid>
      <Grid item xs={12} md={6}>
        {/* <Exercise/> */}
      </Grid>
      {/* <Grid item xs={12} md={6}>
          <Mens1/>
          </Grid> */}
      {/* <Grid item xs={12} md={6}>
          <Mens2/>
          </Grid> */}

      {/* </Container> */}
      {/* </main> */}
    </>
  );
}
