import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Typography, CardActions, Button, Card, CardActionArea } from '@material-ui/core';

const CancelRequest = ({handleCancelRequest,handleHelpReceived}) => {

  const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    heading :{
      textAlign: 'center',
      color: 'black',
      marginBottom: '5%',
      fontSize: '2rem',
    },
    name:{
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
      marginBottom: '5%',
      fontSize: '2.5rem',

    },
    button:{
      marginLeft: '5%',
      fontSize: '1.25rem',
      padding: '8px 15px',

    }
  }));

  const classes = useStyles();
  
  return (
    
    <Card>
    <CardActionArea>      
      <CardContent >
        <Typography variant="h4" component="h2" className= {classes.heading}>
          Your request has been accepted by
          </Typography>
          <Typography variant="h4" component="h2" className= {classes.name}>
          Jon Doe
          </Typography>
        
        <Typography variant="body1" color="text " component="h2"style= {{fontSize:'1.25rem', textAlign: 'center'}}>
          {"In urgent need of a sanitary napkin"}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button onClick={handleHelpReceived} variant="contained" size="large" color="secondary" className={classes.button}>
        Help Received
      </Button>
      <Button  onClick={handleCancelRequest} variant="contained" size="large" color="secondary"className= {classes.button}>
      Cancel Request       
      </Button>
    </CardActions>
  </Card>
  );
}
export default CancelRequest