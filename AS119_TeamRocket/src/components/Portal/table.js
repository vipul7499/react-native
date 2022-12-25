import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    background: 'none',
    boxShadow: 'none'
  },
  cellheading: {
    fontSize: '1.5rem'
  },
  cellContent: {
      fontSize: '1.2rem'
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('1 hour ago', 'Senior UX Designer', 'Part Time', 'New York, NY, USA', '$25–$35 \ hour'),
  createData('1 day ago', 'Marketing Director', 'Full Time', 'Saint-Etienne, France', '$15–$43 \ hour'),
  createData('1 day ago','Front End Developer', 'Part Time', 'Derry, United Kingdom', '$25–$35 \ hour'),
  createData('2 days ago', 'Social Media Executive', 'Full Time', 'Saint-Etienne, France', '$15–$43 \ hour'),
  createData('2 dayas ago', 'Restaurant Dishwasher','Part Time', 'Derry, United Kingdom','$25–$35 \ hour'),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.cellheading}>Time Posted</TableCell>
            <TableCell className={classes.cellheading} align="right">Company/Profile</TableCell>
            <TableCell className={classes.cellheading} align="right">Employment Type</TableCell>
            <TableCell className={classes.cellheading} align="right">Location</TableCell>
            <TableCell className={classes.cellheading} align="right">Expected Pay</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} >
              <TableCell component="th" scope="row"  className={classes.cellContent}>
                {row.name}
              </TableCell>
              <TableCell align="right" className={classes.cellContent}>{row.calories}</TableCell>
              <TableCell align="right" className={classes.cellContent}>{row.fat}</TableCell>
              <TableCell align="right" className={classes.cellContent}>{row.carbs}</TableCell>
              <TableCell align="right" className={classes.cellContent}>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
