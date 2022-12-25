import React, { useEffect, useState, useContext } from "react";
import clsx from "clsx";
import { auth, updateCurrentUseDocument } from "../../utils/firebase";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import work from "./work.svg";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../providers/UserProvider";
import Search from "./Search";
import TextField from "@material-ui/core/TextField";
import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import SimpleTable from "./table";
import SignProvider from './Signprovider'

import EmployerDashboard from './Employer/EmployerDashboard'


import "./styles.css";

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
  new: {
    [theme.breakpoints.up("md")]: {
      marginLeft: "10%",
      marginRight: "10%",
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
  heading: {
    maxWidth: "500px",
    fontSize: "3rem",
    /* margin-left: 15%; */
    textAlign: "center",
    marginBottom: "7%",
  },

  question: {
    fontSize: "2.5rem",
    /* margin-left: 15%; */
    textAlign: "center",
    marginBottom: "3%",
  },
  button2: {
    marginBottom: "5%",
    color: "white",
    fontSize: "1.4rem",
    marginLeft: "2%",
    width: "100%",
    backgroundColor: "#f9cbd3",
  },
  formQues :{
    // marginTop: '3%',
    marginLeft: '5%',
      marginBottom: 10,
    maxWidth: 380,
    fontSize: '2.5rem',
    [theme.breakpoints.up("sm")]: {
      marginLeft: '10%',
      marginRight: '2%'
    }
    // width: 320,
    // marginBottom: '5%',
  },
  formInput: {
    marginRight: '5px', 
    marginLeft: '5px',
    padding: '7%',
    marginTop: '3%',
    fontSize: '1.5rem', 
    borderWidth: '0 0 3px',
    borderColor: '#f50057'
  },
  formButton:{
    marginLeft: '10px',
    border: 'none',
    padding: '0 4%',
    borderRadius: 10, 
    backgroundColor: '#f50057',
    color: 'white',
    fontSize: '1.5rem'
  }
}));

const RegForm = ({ setIsEmployerRegistered }) => {
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const shadowStyles = useOverShadowStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
          style={{ backgroundColor: "#f9cbd3", width: "100%" }}
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
            <Button onClick={logout}>LogOut</Button>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <div className={classes.heading}>
                  <h2>
                    Welcome to
                    <br /> Her Hygiene Opportunity Portal{" "}
                  </h2>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "2rem",
                      marginTop: "3%",
                    }}
                  >
                    A place to expand your network and horizons.
                  </p>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
              <SignProvider setIsEmployerRegistered={setIsEmployerRegistered}/>
              </Grid>

              <Grid item xs={12} md={6}>
                <img height={300} src={work} style={{ marginBottom: "15%" }} />
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </>
  );
};

export default function PortalH() {
  const [user, setUser] = useContext(UserContext);
  const [isEmployerRegistered, setIsEmployerRegistered] = useState(false);
  console.log(user.data);

  if (user.data.isEmployerRegistered === true || isEmployerRegistered === true) {
  return  <EmployerDashboard/>//here we will have employer dashboard
  } else {
    return (
      <>
        <RegForm user={user} setIsEmployerRegistered={setIsEmployerRegistered} />
      </>
    );
  }
}
