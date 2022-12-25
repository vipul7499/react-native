import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";
import cal from "./cal.svg";
//Vishesh
import {Link} from '@reach/router'
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

//End of Vishesh :)
const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    width: "100%",
    height: "100%",
    // marginTop: '5%',
    borderRadius: spacing(2), // 16px
    transition: "0.3s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    position: "relative",
    maxWidth: "100%",
    // marginLeft: '5%',
    // marginRight: 'auto',
    overflow: "initial",
    // backgroundImage: 'linear-gradient(147deg, #ff9897 0%, #f650a0 74%)',
    backgroundColor: "#ffa8bd",
    display: "flex",
    flexDirection: "column",
    // alignItems: 'center',
    paddingBottom: spacing(2),
    [breakpoints.up("md")]: {
      flexDirection: "row",
      paddingTop: spacing(2),
    },
  },

  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: "initial",
  },
}));

export const Deposits = React.memo(function BlogCard() {
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  return (
    <Card component={Link} to='/' className={cx(styles.root, shadowStyles.root)}>
      <CardContent>
        <h1 style={{ color: "#ffffff", margin: 0 }}>
          Go To <br /> Dashboard
        </h1>
        <img height={100} src={cal} />
      </CardContent>
    </Card>
  );
});

export default Deposits;
