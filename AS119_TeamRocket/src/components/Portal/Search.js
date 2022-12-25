import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    alignItems: 'center',
    // width:200,
    display: 'inline-block',
    backgroundColor: 'white'
  },
  input: {
    // marginLeft: theme.spacing(1),
    flex: 1,
    padding: '6px 10px',
    backgroundColor: 'white',
    fontSize:'1.5rem',
    maxWidth: 100
  },
  iconButton: {
      paddingLeft: '5px'
  },
}));

export default function Search() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      {/* <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <InputBase
        className={classes.input}
        placeholder="Location"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      {/* <Divider className={classes.divider} orientation="vertical" /> */}
      {/* <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
    </Paper>
  );
}
