import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import CircleLoader from "react-spinners/CircleLoader";
import { db, auth } from "../../utils/firebase";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../providers/UserProvider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ResponsiveBar } from "@nivo/bar";
import { Link } from "@reach/router";

import "./styles.css";
import CreateOpportunity from "./Employer/CreateOpportunity";
import { format } from "date-fns";

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
    maxWidth: "400px",
    fontSize: "3.5rem",
    /* margin-left: 15%; */
    textAlign: "center",
    marginBottom: "7%",
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
    marginBottom: "1%",
    fontWeight: 500,
    paddingTop: "2%",
  },
  table: {
    minWidth: 650,
    background: "none",
    boxShadow: "none",
  },
  cellheading: {
    fontSize: "1.5rem",
  },
  cellContent: {
    fontSize: "1.2rem",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "1.5rem",
    backgroundColor: "#f9cbd3",
  },
}));

/**********************************************************************GRAPH*****************************************************************/
const MyResponsiveBar = () => {
  const data = [
    {
      country: "AD",
      "hot dog": 108,
      "hot dogColor": "hsl(62, 70%, 50%)",
      burger: 122,
      burgerColor: "hsl(166, 70%, 50%)",
      sandwich: 34,
      sandwichColor: "hsl(26, 70%, 50%)",
      kebab: 22,
      kebabColor: "hsl(120, 70%, 50%)",
      fries: 195,
      friesColor: "hsl(248, 70%, 50%)",
      donut: 193,
      donutColor: "hsl(36, 70%, 50%)",
    },
    {
      country: "AE",
      "hot dog": 76,
      "hot dogColor": "hsl(294, 70%, 50%)",
      burger: 106,
      burgerColor: "hsl(174, 70%, 50%)",
      sandwich: 163,
      sandwichColor: "hsl(6, 70%, 50%)",
      kebab: 103,
      kebabColor: "hsl(258, 70%, 50%)",
      fries: 29,
      friesColor: "hsl(77, 70%, 50%)",
      donut: 27,
      donutColor: "hsl(307, 70%, 50%)",
    },
    {
      country: "AF",
      "hot dog": 42,
      "hot dogColor": "hsl(86, 70%, 50%)",
      burger: 188,
      burgerColor: "hsl(129, 70%, 50%)",
      sandwich: 32,
      sandwichColor: "hsl(354, 70%, 50%)",
      kebab: 196,
      kebabColor: "hsl(266, 70%, 50%)",
      fries: 153,
      friesColor: "hsl(128, 70%, 50%)",
      donut: 62,
      donutColor: "hsl(213, 70%, 50%)",
    },
    {
      country: "AG",
      "hot dog": 194,
      "hot dogColor": "hsl(201, 70%, 50%)",
      burger: 92,
      burgerColor: "hsl(269, 70%, 50%)",
      sandwich: 178,
      sandwichColor: "hsl(161, 70%, 50%)",
      kebab: 92,
      kebabColor: "hsl(302, 70%, 50%)",
      fries: 143,
      friesColor: "hsl(338, 70%, 50%)",
      donut: 142,
      donutColor: "hsl(169, 70%, 50%)",
    },
    {
      country: "AI",
      "hot dog": 122,
      "hot dogColor": "hsl(301, 70%, 50%)",
      burger: 193,
      burgerColor: "hsl(105, 70%, 50%)",
      sandwich: 125,
      sandwichColor: "hsl(194, 70%, 50%)",
      kebab: 49,
      kebabColor: "hsl(335, 70%, 50%)",
      fries: 115,
      friesColor: "hsl(181, 70%, 50%)",
      donut: 37,
      donutColor: "hsl(115, 70%, 50%)",
    },
    {
      country: "AL",
      "hot dog": 33,
      "hot dogColor": "hsl(210, 70%, 50%)",
      burger: 73,
      burgerColor: "hsl(22, 70%, 50%)",
      sandwich: 159,
      sandwichColor: "hsl(64, 70%, 50%)",
      kebab: 35,
      kebabColor: "hsl(168, 70%, 50%)",
      fries: 71,
      friesColor: "hsl(39, 70%, 50%)",
      donut: 98,
      donutColor: "hsl(252, 70%, 50%)",
    },
    {
      country: "AM",
      "hot dog": 18,
      "hot dogColor": "hsl(131, 70%, 50%)",
      burger: 66,
      burgerColor: "hsl(80, 70%, 50%)",
      sandwich: 141,
      sandwichColor: "hsl(290, 70%, 50%)",
      kebab: 191,
      kebabColor: "hsl(42, 70%, 50%)",
      fries: 85,
      friesColor: "hsl(16, 70%, 50%)",
      donut: 50,
      donutColor: "hsl(146, 70%, 50%)",
    },
  ];
  return (
    <ResponsiveBar
      data={data}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      groupMode="grouped"
      colors={{ scheme: "blue_purple" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          background: "inherit",
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

/*******************************************************************************************************************************************/

/************************************************************Card Requests*******************************************************************/

let dummyRequests = [
  {
    id: 1,
    requester: {
      id: 1,
      location: "Mayur Vihar,East Delhi",
      detail: {
        name: "Jane Doe",
        type: "Individual",
        edu: "Bachelors in Home Science",
      },
    },
    status: "active",
  },
  {
    id: 2,
    requester: {
      id: 2,
      location: "B-228, GK-I, New Delhi",
      detail: {
        name: "Satya Devi",
        type: "Individual",
        edu: "Open to Training",
      },
    },
    status: "active",
  },
  {
    id: 3,
    requester: {
      id: 3,
      location: "B-228, GK-I, New Delhi",
      detail: {
        name: "Swacch Pari",
        type: "SHG",
        edu: "Open to Training",
      },
    },
    status: "active",
  },
  {
    id: 4,
    requester: {
      id: 4,
      location: "D-48,Sainik Farms, New Delhi",
      detail: {
        name: "Panchali Sharma",
        type: "Individual",
        edu: "BSc Home Science",
      },
    },
    status: "active",
  },
];

export default function Eportal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useContext(UserContext);
  const [scroll, setScroll] = React.useState("paper");
  const [oppArr, setOppArr] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const run = async () => {
      const data = await db
        .collection("opportunities")
        .where("creator", "==", `${user.data.uid}`)
        .get();
      // data.forEach((doc)=>{
      //   arr.push(doc.data())
      // })
      // console.log(arr)
      setOppArr(data);
      setLoading(false);
    };
    run();
  }, []);

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

  const data = [
    {
      OpporNum: 8249,
      descr: "Opening for Teaching Assistant",
      date: "02/07/2020",
      dur: "2 Months",
    },
    {
      OpporNum: 8556,
      descr: "Opening for Manager",
      date: "02/07/2020",
      dur: "2 Months",
    },
    {
      OpporNum: 8789,
      descr: "Opening for Pad Distributor",
      date: "02/07/2020",
      dur: "2 Months",
    },
    {
      OpporNum: 9058,
      descr: "Opening for Volunteer",
      date: "02/07/2020",
      dur: "2 Months",
    },
    {
      OpporNum: 9058,
      descr: "Opening for Volunteer",
      date: "02/07/2020",
      dur: "2 Months",
    },
  ];

  const ans = [];
  oppArr.forEach((doc, i) => {
    const url = `/eportal2/${doc.id}`;
    const x = (
      <>
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Card className={shadowStyles.root} style={{ minWidth: 275 }}>
            <CardContent variant="outlined">
              <Typography variant="h3" component="h2">
                {doc.data().oppDetails.title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <p>
                  <strong>Description:</strong> {doc.data().oppDetails.descr}
                </p>
              </Typography>
              <Typography
                className={classes.pos}
                color="textSecondary"
                style={{ marginBottom: "5%" }}
              >
                <p>
                  <strong>Created At: </strong>
                  {doc.data().createdAt.toDate().toLocaleString()}
                </p>
              </Typography>
              <Typography
                className={classes.pos}
                color="textSecondary"
                style={{ marginBottom: "5%" }}
              >
                <p>
                  <strong>Duration:</strong>{" "}
                  {doc.data().oppDetails.trainingDuration}
                </p>
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
                View Opportunity Insights
              </Button>
            </CardActions>
            <CardActions>
              <Button
                onClick={() => console.log("delete post")}
                to={url}
                variant="contained"
                size="large"
                className={classes.button2}
              >
                Remove
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </>
    );

    ans.push(x);
  });

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
              <Grid item xs={12}>
                <h1
                  style={{
                    fontSize: "3.5rem",
                    paddingBottom: "1%",
                    color: "#000000",
                    textAlign: "center",
                  }}
                >
                  Your Posted Opportunities
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
                {ans}
              </Grid>

              {/***********************************************************************************************************************************/}

              <Grid item xs={12} sm={6}>
                <section>
                  <h3 className={classes.recent}>Post a New Opportunity</h3>
                  <Divider />
                </section>

                <CreateOpportunity />
              </Grid>

              {/**********************************************************************Form***********************************************************/}
              <Grid item xs={12} sm={6}>
                <div style={{ height: 500 }}>
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="h2"
                    style={{
                      fontWeight: "bold",
                      marginTop: "3%",
                      textAlign: "center",
                    }}
                  >
                    Week-wise employment requests
                  </Typography>
                  <Divider />
                  <MyResponsiveBar />
                </div>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}
