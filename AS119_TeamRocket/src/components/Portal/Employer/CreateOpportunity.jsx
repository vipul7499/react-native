import React, { useState, useContext } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Typography,
  Grid,
  Menu,
  MenuItem,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { createOpp, db } from "../../../utils/firebase";
import { UserContext } from "../../../providers/UserProvider";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "1.5rem",
  },
  menu: {
    fontSize: "1.2rem",
  },
}));

const Manufacturing = () => {
  const [user, setUser] = useContext(UserContext);
  const [fields, setFields] = useState({
    title: "",
    descr: "",
    detailedDescription: "",
    maintainance: "",
    benefits: "",
    noOfWomenNeeded: "",
    trainingDuration: "",
    opportunityType: "",
    location: "",
    contactInfo: "",
    website: "",
  });
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      detailedDescription,
      maintainance,
      benefits,
      noOfWomenNeeded,
      trainingDuration,
      opportunityType,
      title,
      descr,
      location,
      contactInfo,
      website,
    } = fields;
    const creator = `${user.data.uid}`;
    const creatorRef = await db.collection("users").doc(`${user.data.uid}`);

    console.log(fields);
    const oppDetails = {
      detailedDescription,
      maintainance,
      benefits,
      noOfWomenNeeded,
      trainingDuration,
      opportunityType,
      title,
      descr,
      location,
      contactInfo,
      website,
    };
    const Manufacturing = true;
    await createOpp(user, { oppDetails, Manufacturing, creator, creatorRef });
    setFields({
      detailedDescription: "",
      maintainance: "",
      benefits: "",
      noOfWomenNeeded: "",
      trainingDuration: "",
      opportunityType: "",
      title: "",
      descr: "",
      location: "",
      contactInfo: "",
      website: "",
    });
    window.location.reload();
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Lets help manufacturing pads!
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  value={fields.title}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="title"
                  label="Title of Opportunity"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="descr"
                  value={fields.descr}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="descr"
                  label="One line Description of Task"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="detailedDescription"
                  value={fields.detailedDescription}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="detailedDescription"
                  label="Detailed Description of Opportunity"
                  multiline
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="maintainance"
                  value={fields.maintainance}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="maintainance"
                  label="Brief requirements to apply"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="benefits"
                  value={fields.benefits}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="benefits"
                  label="Benefits Offered"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="opportunityType"
                  value={fields.opportunityType}
                  onChange={handleChange}
                  fullWidth
                  id="opportunityType"
                  label="Is Part Time/Full Time/Other"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="trainingDuration"
                  value={fields.trainingDuration}
                  onChange={handleChange}
                  fullWidth
                  id="trainingDuration"
                  label="Duration"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="noOfWomenNeeded"
                  value={fields.noOfWomenNeeded}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="orgContact"
                  label="Number of people needed for this initiative"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="location"
                  value={fields.location}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="location"
                  label="Location of Work"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="website"
                  value={fields.website}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="website"
                  label="Website (if you have any)"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="contactInfo"
                  value={fields.contactInfo}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="contactInfo"
                  label="Contact Info (email/password)"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              style={{ backgroundColor: "#f9cbd3" }}
            >
              Start creating opportunities!
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};
const Distribution = () => {
  const [user, setUser] = useContext(UserContext);
  const [fields, setFields] = useState({
    title: "",
    descr: "",
    benefits: "",
    noOfPadsDistributed: "",
    trainingDuration: "",
    opportunityType: "",
    location: "",
    contactInfo: "",
    website: "",
  });
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      benefits,
      noOfPadsDistributed,
      trainingDuration,
      opportunityType,
      title,
      descr,
      detailedDescription,
      location,
      contactInfo,
      website,
    } = fields;
    const creator = `${user.data.uid}`;
    const creatorRef = await db.collection("users").doc(`${user.data.uid}`);

    console.log(fields);
    const oppDetails = {
      benefits,
      noOfPadsDistributed,
      trainingDuration,
      opportunityType,
      title,
      descr,
      detailedDescription,
      location,
      contactInfo,
      website,
    };
    const Distribution = true;
    await createOpp(user, { oppDetails, Distribution, creator, creatorRef });
    setFields({
      title: "",
      descr: "",
      detailedDescription: "",
      benefits: "",
      noOfPadsDistributed: "",
      trainingDuration: "",
      opportunityType: "",
      location: "",
      contactInfo: "",
      website: "",
    });
    window.location.reload();
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Lets help distributing pads!
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  value={fields.title}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="title"
                  label="Title of Opportunity"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="descr"
                  value={fields.descr}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="descr"
                  label="One line Description of Task"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="location"
                  value={fields.location}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="location"
                  label="Location"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="website"
                  value={fields.website}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="website"
                  label="Website (if you have any)"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="detailedDescription"
                  value={fields.detailedDescription}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="detailedDescription"
                  label="Detailed Description of Task"
                  multiline
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="benefits"
                  value={fields.benefits}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="benefits"
                  label="Salary/benefits offered"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="noOfPadsDistributed"
                  value={fields.noOfPadsDistributed}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="noOfPadsDistributed"
                  label="goal of distribution per day"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="trainingDuration"
                  value={fields.trainingDuration}
                  onChange={handleChange}
                  fullWidth
                  id="trainingDuration"
                  label="Duration"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="opportunityType"
                  value={fields.opportunityType}
                  onChange={handleChange}
                  fullWidth
                  id="opportunityType"
                  label="Is Part Time/Full Time/Other"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="contactInfo"
                  value={fields.contactInfo}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="contactInfo"
                  label="Contact Email/Phone No."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              style={{ backgroundColor: "#f9cbd3" }}
            >
              Start creating opportunities!
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};
const Awareness = () => {
  const [user, setUser] = useContext(UserContext);
  const [fields, setFields] = useState({
    title: "",
    descr: "",
    detailedDescription: "",
    contactInfo: "",
    benefits: "",
    sizeOfReach: "",
    duration: "",
    method: "",
    opportunityType: "",
    website: "",
  });
  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      benefits,
      sizeOfReach,
      duration,
      method,
      opportunityType,
      title,
      descr,
      detailedDescription,
      contactInfo,
      location,
      website,
    } = fields;
    const creator = `${user.data.uid}`;
    const creatorRef = await db.collection("users").doc(`${user.data.uid}`);

    console.log(fields);
    const oppDetails = {
      benefits,
      sizeOfReach,
      duration,
      method,
      opportunityType,
      title,
      descr,
      detailedDescription,
      contactInfo,
      location,
      website,
    };
    const Awareness = true;
    await createOpp(user, { oppDetails, Awareness, creator, creatorRef });
    setFields({
      title: "",
      descr: "",
      benefits: "",
      sizeOfReach: "",
      duration: "",
      method: "",
      opportunityType: "",
      detailedDescription: "",
      contactInfo: "",
      location: "",
      website: "",
    });
    window.location.reload();
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Lets help creating awareness!
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  value={fields.title}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="title"
                  label="Title of Opportunity"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="descr"
                  value={fields.descr}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="descr"
                  label="One line Description of Task"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="detailedDescription"
                  value={fields.detailedDescription}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="detailedDescription"
                  label="Detailed Description of Task"
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="benefits"
                  value={fields.benefits}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="benefits"
                  label="benefits offered"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="sizeOfReach"
                  value={fields.sizeOfReach}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="sizeOfReach"
                  label="Expected audience reach"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="method"
                  value={fields.method}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="method"
                  label="Method of Campaign"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="opportunityType"
                  value={fields.opportunityType}
                  onChange={handleChange}
                  fullWidth
                  id="opportunityType"
                  label="Is Part Time/Full Time/Other"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="trainingDuration"
                  value={fields.trainingDuration}
                  onChange={handleChange}
                  fullWidth
                  id="trainingDuration"
                  label="Duration"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="location"
                  value={fields.location}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="location"
                  label="Location of Event"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="website"
                  value={fields.website}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="website"
                  label="Website (if you have one)"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="contactInfo"
                  value={fields.contactInfo}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="contactInfo"
                  label="contact info (mail/phone)"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              style={{ backgroundColor: "#f9cbd3" }}
            >
              Start creating opportunities!
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

const CreateOpportunity = () => {
  const [entity, setEntity] = useState(0);
  if (entity === 0) {
    return (
      <>
        <Button
          onClick={() => {
            setEntity(1);
          }}
          style={{ fontSize: "1.25rem" }}
        >
          Create A Manufacturing Opportunity
        </Button>
        <Button
          onClick={() => {
            setEntity(2);
          }}
          style={{ fontSize: "1.25rem" }}
        >
          Create A Distribution Opportunity
        </Button>
        <Button
          onClick={() => {
            setEntity(3);
          }}
          style={{ fontSize: "1.25rem" }}
        >
          Create an Awareness Opportunity
        </Button>
      </>
    );
  } else if (entity === 1) {
    return (
      <>
        <Button
          onClick={() => {
            setEntity(1);
          }}
          style={{ fontSize: "1.25rem" }}
        >
          Create A Manufacturing Opportunity
        </Button>
        <Button
          onClick={() => {
            setEntity(2);
          }}
          style={{ fontSize: "1.25rem" }}
        >
          Create A Distribution Opportunity
        </Button>
        <Button
          onClick={() => {
            setEntity(3);
          }}
          style={{ fontSize: "1.25rem" }}
        >
          Create an Awareness Opportunity
        </Button>
        <Manufacturing />
      </>
    );
  } else if (entity === 2) {
    return (
      <>
        <Button
          onClick={() => {
            setEntity(1);
          }}
          style={{ fontSize: "1.25rem" }}
        >
          Create A Manufacturing Opportunity
        </Button>
        <Button
          onClick={() => {
            setEntity(2);
          }}
          style={{ fontSize: "1.25rem" }}
        >
          Create A Distribution Opportunity
        </Button>
        <Button
          onClick={() => {
            setEntity(3);
          }}
          style={{ fontSize: "1.25rem" }}
        >
          Create an Awareness Opportunity
        </Button>
        <Distribution />
      </>
    );
  } else if (entity === 3) {
    return (
      <>
        <Button
          onClick={() => {
            setEntity(1);
          }}
          style={{ fontSize: "1.25rem" }}
        >
          Create A Manufacturing Opportunity
        </Button>
        <Button
          onClick={() => {
            setEntity(2);
          }}
          style={{ fontSize: "1.25rem" }}
        >
          Create A Distribution Opportunity
        </Button>
        <Button
          onClick={() => {
            setEntity(3);
          }}
          style={{ fontSize: "1.25rem" }}
        >
          Create an Awareness Opportunity
        </Button>
        <Awareness />
      </>
    );
  }
};

export default CreateOpportunity;
