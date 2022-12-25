import React, { useContext } from "react";
import clsx from "clsx";
import { auth } from "../../utils/firebase";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Deposits from "./Deposits";
import BlogCardDemo from "./articles_1";
import BlogCardDemo2 from "./articles_2";
import MediaCard1 from "./Card_1";
import MediaCard2 from "./Card_2";
import MediaCard3 from "./Card_3";
import Map1 from "./GotoMap";
import Map from "./Map";
import Welcome from "./Welcome";
import Regular from "./Regular";
import Exercise from "./Exercise";
import Periods from "./Periods";
import Opp from "./Opp";
import Edu from "./Edu";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../providers/UserProvider";
import work from "./images/work.svg";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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

export default function Dashboard() {
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
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
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
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Welcome user={user} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Periods />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              {/* <Paper className={fixedHeightPaper} style= {{backgroundColor: '#ef5579'}}> */}
              <Deposits />
              {/* </Paper> */}
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              {/* <Paper className={fixedHeightPaper} style= {{backgroundColor: '#ef5579'}}> */}
              <Map1 />
              {/* </Paper> */}
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
              <Paper style={{ height: "30%" }}>
                <Map />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Opp />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Edu />
            </Grid>

            

            <Grid item xs={12} md={6}>
              <BlogCardDemo />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlogCardDemo2 />
            </Grid>

            <Grid item xs={12}>
              <h1
                style={{
                  backgroundColor: "#f8c9d4",
                  padding: "2%",
                  color: "#ffffff",
                }}
              >
                Contemporaray Women Hygiene Pioneers
              </h1>
            </Grid>

            <Grid item xs={12} md={4}>
              <MediaCard1 />
            </Grid>
            <Grid item xs={12} md={4}>
              <MediaCard2 />
            </Grid>
            <Grid item xs={12} md={4}>
              <MediaCard3 />
            </Grid>
            <Grid item xs={12}>
              <h1
                style={{
                  backgroundColor: "#f8c9d4",
                  padding: "2%",
                  color: "#ffffff",
                }}
              >
                Menstruation Survey by Her-Hygiene
              </h1>
            </Grid>
            <Grid item xs={12} md={6}>
              <Regular />
            </Grid>
            <Grid item xs={12} md={6}>
              <Exercise />
            </Grid>
            {/* <Grid item xs={12} md={6}>
          <Mens1/>
          </Grid> */}
            {/* <Grid item xs={12} md={6}>
          <Mens2/>
          </Grid> */}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
