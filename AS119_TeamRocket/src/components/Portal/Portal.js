import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { Link } from "@reach/router";
import CircleLoader from 'react-spinners/CircleLoader'

import { auth } from "../../utils/firebase";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import work from "./work.svg";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./styles.css";
import { db } from "../../utils/firebase";
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
    maxWidth: "400px",
    fontSize: "3.5rem",
    /* margin-left: 15%; */
    textAlign: "center",
    marginBottom: "7%",
  },
  keywords: {
    display: "inline-block",
    marginLeft: "7%",
    marginRight: "4%",
    backgroundColor: "white",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    fontSize: "1.2rem",
    marginTop: "5%",
    marginBottom: "15%",
  },
  descr: {
    fontSize: "1.2rem",
    marginBottom: "2%",
  },
  button2: {
    marginBottom: "5%",
    color: "white",
    fontSize: "1.4rem",
    marginLeft: "2%",
    width: "100%",
    backgroundColor: "#f9cbd3",
  },
  recent: {
    fontSize: "3rem",
    lineHeight: 1.5,
    letterSpacing: ".025em",
    fontWeight: 500,
    marginBottom: "5%",
    fontWeight: 500,
    paddingTop: "2%",
  },
  field: {
    marginBottom: "3%",
    color: "black",
    fontSize: "1.25rem",
  },
  criteria: {
    display: "inline-block",
    color: "black",
    fontWeight: 700,
  },
}));

export default function Portal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    mData: [],
    eData: [],
    aData: [],
  });
  useEffect(() => {
    const run = async () => {
      const mData = await db
        .collection("opportunities")
        .where("Manufacturing", "==", true)
        .get();

      const eData = await db
        .collection("opportunities")
        .where("Distribution", "==", true)
        .get();
      const aData = await db
        .collection("opportunities")
        .where("Awareness", "==", true)
        .get();
      console.log(mData);
      console.log(aData);
      console.log(eData);
      setData({
        mData,
        eData,
        aData,
      });
      setLoading(false);
    };
    run();
  }, []);
  const [scroll, setScroll] = React.useState("paper");

  const logout = async () => {
    await auth.signOut();
    setUser({ data: null, loading: false });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

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

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const shadowStyles = useOverShadowStyles();

  const mdataArr = [];
  const edataArr = [];
  const adataArr = [];
  const genMDataArr = () => {
    data.mData.forEach((elem, i) => {
      const url = `/info/${elem.id}`;
      const x = (
        <>
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card className={shadowStyles.root} style={{ minWidth: 275 }}>
              <CardContent variant="outlined">
                <Typography variant="h3" component="h2">
                  {elem.data().oppDetails.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  <p>Requirements: </p>
                  {elem.data().oppDetails.maintainance}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  className={classes.field}
                >
                  <p className={classes.criteria}>Date Posted: </p>{" "}
                  {elem.data().createdAt.toDate().toLocaleDateString()}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  className={classes.field}
                >
                  <p className={classes.criteria}>Employment type: </p>{" "}
                  {elem.data().oppDetails.opportunityType}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  className={classes.field}
                >
                  <p className={classes.criteria}>Description: </p>{" "}
                  {elem.data().oppDetails.descr}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  className={classes.field}
                >
                  <p className={classes.criteria}>Vacancies: </p>{" "}
                  {elem.data().oppDetails.noOfWomenNeeded}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  className={classes.field}
                >
                  <p className={classes.criteria}>Employment Period: </p>{" "}
                  {elem.data().oppDetails.trainingDuration}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={url}
                  variant="contained"
                  size="large"
                  className={classes.button2}
                >
                  View More Info.
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </>
      );
      mdataArr.push(x);
    });
    return mdataArr;
  };
  const genEDataArr = () => {
    data.eData.forEach((elem, i) => {
      const url = `/info/${elem.id}`;
      const x = (
        <>
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card className={shadowStyles.root} style={{ minWidth: 275 }}>
              <CardContent variant="outlined">
                <Typography variant="h3" component="h2">
                  {elem.data().oppDetails.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  <p>Benefits: </p>
                  {elem.data().oppDetails.benefits}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  className={classes.field}
                >
                  <p className={classes.criteria}>Date Posted:</p>{" "}
                  {elem.data().createdAt.toDate().toLocaleDateString()}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  className={classes.field}
                >
                  <p className={classes.criteria}>Employment Duration : </p>{" "}
                  {elem.data().oppDetails.trainingDuration}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  className={classes.field}
                >
                  <p className={classes.criteria}>Employment Type : </p>{" "}
                  {elem.data().oppDetails.opportunityType}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  className={classes.field}
                >
                  <p className={classes.criteria}>Description: </p>{" "}
                  {elem.data().oppDetails.descr}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={url}
                  variant="contained"
                  size="large"
                  className={classes.button2}
                >
                  View More Info.
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </>
      );
      edataArr.push(x);
    });
    return edataArr;
  };
  const genADataArray = () => {
    data.aData.forEach((elem, i) => {
      const url = `/info/${elem.id}`;
      const x = (
        <>
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card className={shadowStyles.root} style={{ minWidth: 275 }}>
              <CardContent variant="outlined">
                <Typography variant="h3" component="h2">
                  {elem.data().oppDetails.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  <p>Benefits: </p> {elem.data().oppDetails.benefits}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  className={classes.field}
                >
                  <p className={classes.criteria}>Date Posted: </p>{" "}
                  {elem.data().createdAt.toDate().toLocaleDateString()}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  className={classes.field}
                >
                  <p className={classes.criteria}>Description: </p>{" "}
                  {elem.data().oppDetails.descr}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  className={classes.field}
                >
                  <p className={classes.criteria}>Duration: </p>{" "}
                  {elem.data().oppDetails.duration}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  className={classes.field}
                >
                  <p className={classes.criteria}>Type of Employment: </p>{" "}
                  {elem.data().oppDetails.opportunityType}
                </Typography>
                <Typography
                  className={classes.pos}
                  color="textSecondary"
                  className={classes.field}
                >
                  <p className={classes.criteria}>Expected Reach: </p>{" "}
                  {elem.data().oppDetails.sizeOfReach}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={url}
                  variant="contained"
                  size="large"
                  className={classes.button2}
                >
                  View More Info.
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </>
      );
      adataArr.push(x);
    });
    return adataArr;
  };

  if (loading) {
    return <CircleLoader css={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}} size="400px"color="pink"/>;
  } else {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
          style={{ backgroundColor: "#f9cbd3", width: "100%" }}
        >
          <Toolbar className={classes.toolbar}>
            <Button
            component={Link}
            to='/'
            style={{color: '#ffffff', fontSize: '1.5rem'}}
              // component="h1"
              // variant="h6"
              // color="inherit"
              // noWrap
              // className={classes.title}
            >
              Dashboard
            </Button>
            <Button component={Link} to={"/eportal"} style={{color: '#ffffff', fontSize: '1.5rem'}}>
              {" "}
              Opportunity creator{" "}
            </Button>
            <Button onClick={logout} style={{color: '#ffffff', fontSize: '1.5rem'}}>LogOut</Button>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
              {/* <Grid item xs= {12}>
            <Paper style={{height: 300}} className= {classes.new}> */}
              <Grid item xs={12} md={6} style={{ marginBottom: "5%" }}>
                <div className={classes.heading}>
                  <h2>Start Building Your Own Career Now</h2>
                </div>
                <div className={classes.keywords}>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    className={shadowStyles.root}
                    style={{
                      fontSize: "1.5rem",
                      color: "grey",
                      padding: "10px 15px",
                    }}
                  >
                    Categories
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={handleClose}
                      style={{ fontSize: "1.5rem" }}
                    >
                      Employment
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      style={{ fontSize: "1.5rem" }}
                    >
                      Distribution
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      style={{ fontSize: "1.5rem" }}
                    >
                      Awareness
                    </MenuItem>
                  </Menu>
                </div>
                <Search />
              </Grid>
              <Grid item xs={12} md={6}>
                <img height={300} src={work} />
              </Grid>

              <Grid item xs={12}>
                <h1
                  style={{
                    fontSize: "3.5rem",
                    paddingBottom: "1%",
                    color: "#000000",
                    textAlign: "center",
                  }}
                >
                  Manufacturing Opportunites
                </h1>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "1.5rem",
                    marginBottom: "3%",
                  }}
                >
                  A place where leading employers are already looking for your
                  talent and experience.
                </p>
                {/* <Carousel/> */}
              </Grid>

              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                {genMDataArr()}
                {/* {mdata.map(elem => (
                    <Grid item xs={12} sm={6} md={3} key={mdata.indexOf(elem)}>
                        <Card className={shadowStyles.root} style={{minWidth: 275}}>
                        <CardContent variant= "outlined">
                            <Typography variant="h3" component="h2">
                                {elem.OrganName}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {elem.reqs}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                                <p className={classes.criteria}>Date Posted:</p> {elem.date}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                              <p className={classes.criteria}>Employment type : </p> {elem.type}
                            </Typography>

                            </CardContent>
                            <CardActions>
           <Button variant="contained" size="large" className={classes.button2}>
            View More Info.
           </Button>
           </CardActions>
                        </Card>
                     </Grid>
            
            
            
            
            ))} */}
              </Grid>

              <Grid item xs={12}>
                <h1
                  style={{
                    fontSize: "3.5rem",
                    paddingBottom: "1%",
                    color: "#000000",
                    textAlign: "center",
                    marginTop: "2%",
                  }}
                >
                  Distribution Opportunites
                </h1>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "1.5rem",
                    marginBottom: "3%",
                  }}
                >
                  A place where leading employers are already looking for your
                  talent and experience.
                </p>
                {/* <Carousel/> */}
              </Grid>

              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                {genEDataArr()}
                {/* {edata.map(elem => (
                    <Grid item xs={12} sm={6} md={3} key={edata.indexOf(elem)}>
                        <Card className={shadowStyles.root} style={{minWidth: 275}}>
                        <CardContent variant= "outlined">
                            <Typography variant="h3" component="h2">
                                {elem.OrganName}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {elem.benefits}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                                <p className={classes.criteria}>Date Posted:</p> {elem.date}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                              <p className={classes.criteria}>Training Duration : </p> {elem.tdur}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                              <p className={classes.criteria}>Type of Employment : </p> {elem.type}
                            </Typography>

                            </CardContent>
                            <CardActions>
           <Button variant="contained" size="large" className={classes.button2}>
            View More Info.
           </Button>
           </CardActions>
                        </Card>
                     </Grid>
                
                
                ))} */}
              </Grid>

              <Grid item xs={12}>
                <h1
                  style={{
                    fontSize: "3.5rem",
                    paddingBottom: "1%",
                    color: "#000000",
                    textAlign: "center",
                    marginTop: "2%",
                  }}
                >
                  Awareness Opportunites
                </h1>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "1.5rem",
                    marginBottom: "3%",
                  }}
                >
                  A place where leading employers are already looking for your
                  talent and experience.
                </p>
                {/* <Carousel/> */}
              </Grid>

              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                {genADataArray()}

                {/* {adata.map(elem => (
                    <Grid item xs={12} sm={6} md={3} key={adata.indexOf(elem)}>
                        <Card className={shadowStyles.root} style={{minWidth: 275}}>
                        <CardContent variant= "outlined">
                            <Typography variant="h3" component="h2">
                                {elem.OrganName}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {elem.benefits}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                                {elem.method}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                              <p className={classes.criteria}>Training Duration : </p> {elem.tdur}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                              <p className={classes.criteria}>Type of Employment : </p> {elem.type}
                            </Typography>

                            </CardContent>
                            <CardActions>
           <Button variant="contained" size="large" className={classes.button2}>
            View More Info.
           </Button>
           </CardActions>
                        </Card>
                     </Grid>

))} */}
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}
