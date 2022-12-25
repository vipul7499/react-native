import React, { useContext } from "react";
import clsx from "clsx";
import { auth } from "../../utils/firebase";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import Link from "@material-ui/core/Link";
import {Link} from '@reach/router'
import Deposits from "./Deposits";
import BlogCardDemo from "./articles_1";
import BlogCardDemo2 from "./articles_2";
import MediaCard1 from "./Card_1";
import MediaCard2 from "./Card_2";
import MediaCard3 from "./Card_3";
import Map1 from "./GotoMap";
import { Player } from "video-react";
import Regular from "./Regular";
import Exercise from "./Exercise";
import Opp from "./Opp";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../providers/UserProvider";
import work from "./images/work.svg";
import img1 from "./images/edu6.jpg";
import img2 from "./images/edu7.jpg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  root: {
    display: "flex",
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
    height: 240,
  },
  heading: {
    maxWidth: "700px",
    fontSize: "2.5rem",
    /* margin-left: 15%; */
    textAlign: "center",
    display: "inline-block",
    // marginBottom: '7%',
  },
}));

export default function Edu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [user, setUser] = useContext(UserContext);

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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
        style={{ backgroundColor: "#f8c9d4", width: "100%" }}
      >
        <Toolbar className={classes.toolbar}>
          <Button
            // component="h1"
            // variant="h6"
            // color="inherit"
            // noWrap
            component={Link}
            to='/'
            style={{ fontSize: "1.25rem", color: "white" }}

            // className={classes.title}
          >
            Dashboard
          </Button>
          <Button
            onClick={logout}
            style={{ fontSize: "1.25rem", color: "white" }}
          >
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "4rem", fontWeight: 100 }}>
                Let us De-stigmatize
                <br />
                <b style={{ color: "#f8c9d4" }}>Menstruation</b>
              </h2>
            </Grid>

            <Grid item xs={12} lg={8}>
              <iframe
                width="1200"
                height="700"
                src="https://www.youtube.com/embed/NCMIxoODLNU"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </Grid>
            <Grid item lg={2}></Grid>

            {/* Recent Deposits */}
            <Grid item xs={12}>
              <Deposits />
            </Grid>
            <Grid item xs={12}>
              <h1
                style={{
                  backgroundColor: "#f8c9d4",
                  padding: "1%",
                  color: "#ffffff",
                  marginBottom: "3%",
                  fontSize: '3.5rem'
                }}
              >
                Govt. Schemes and Initiatives
              </h1>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Map1 />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <Paper className={fixedHeightPaper} style= {{backgroundColor: '#ef5579'}}> */}
              <Exercise />
              {/* </Paper> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={img1} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={img2} />
            </Grid>
            {/* <Grid item xs= {12} sm={6}>
            <Card className={classes.root}>
            <CardMedia
        className={classes.media}
        image= {img1}
        title="Paella dish"
      />
              </Card>
            </Grid> */}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
