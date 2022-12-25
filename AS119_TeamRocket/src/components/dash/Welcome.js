import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import creativeWoman from "./creative-woman.svg";
import natureOnScreen from "./nature_on_screen.svg";
import Grid from "@material-ui/core/Grid";
import "./styles.css";
import { format } from "date-fns";
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  depositContext: {
    flex: 1,
    textTransform: "capitalize",
    fontSize: "1.5rem",
  },
  image: {
    height: "55px",
    marginTop: "15%",
    [breakpoints.up("sm")]: {
      height: "130px",
      marginTop: "12%",
    },
  },
}));

export default function Welcome({ user }) {
  const classes = useStyles();
  return (
    <React.Fragment style={{ marginTop: "3%" }}>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <Typography
            component="h2"
            variant="h4"
            style={{ fontSize: "3rem", color: "black", marginBottom: "2%" }}
          >
            Welcome
          </Typography>
          <Typography
            component="p"
            variant="h4"
            style={{ textTransform: "capitalize", marginBottom: "2%" }}
          >
            {user.data.name}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Account created on{" "}
            {format(user.data.createdAt.toDate(), "dd MMMM yyyy")}
          </Typography>
        </Grid>
        <Grid item xs={false} lg={3}></Grid>
        <Grid item xs={false} lg={3}>
          <img className={classes.image} src={natureOnScreen} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
