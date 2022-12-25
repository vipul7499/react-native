import React, { useState, useEffect } from "react";
import SignInNew from "./SignInNew";
import SignUp1 from "./SignUp1";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "../homepage-style.css";
import "../hero-slider.css";
import Dash from "./landing/Dash";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";

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

const useStyles = makeStyles((theme) => ({
  button: {
    justifyContent: "center",
    alignItems: "center",
    margin: "auto auto",
    fontSize: 16,
    bottom: 0,
    backgroundImage: "linear-gradient(147deg, #ff9897 0%, #f650a0 74%)",
  },
}));
const LoginAndSignup = () => {
  const classes = useStyles();
  const [loginForm, setLoginForm] = useState(false);
  const [homePage, setHomePage] = useState(true);

  const [buttonText, setButtonText] = useState("Signup for new Email Account");
  useEffect(() => {
    loginForm
      ? setButtonText("Signup for new Email Account")
      : setButtonText("Click here to Login instead");
  }, [loginForm]);

  const toggleHandler = () => {
    if (homePage == true) setHomePage(false);
    else setHomePage(true);
  };

  return (
    <>
      {homePage ? (
        <Dash toggleHandler={toggleHandler} />
      ) : (
        <div
          style={{
            maxWidth: "400px",
            margin: "auto",
          }}
        >
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={toggleHandler}
          >
            Back To Home Page
          </Button>
          {loginForm ? <SignInNew /> : <SignUp1 />}
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => setLoginForm(!loginForm)}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </>
  );
};

export default LoginAndSignup;
