import React from "react";
import PropTypes from "prop-types";
import { CardContent, Typography, CardActions, Button, Card, CardActionArea } from '@material-ui/core';

class CancelHelp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
      <CardActionArea>      
        <CardContent >
          <Typography variant="h4" color="textSecondary" component="h2">
          You have accepted a <br />
            request from: Jane Doe
          </Typography>
          <Typography variant="body1" color="text " component="h2">
          lorem ipsum si dolot et amet

          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" size="large" color="secondary">
        Request Completed        
        </Button>
        <Button variant="contained" size="large" color="secondary">
        Cancel Help        
        </Button>
        
      </CardActions>
    </Card>
     
    );
  }
}

CancelHelp.propTypes = {};

CancelHelp.defaultProps = {};

export default CancelHelp;
