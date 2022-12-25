import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { BarChart,CartesianGrid,Tooltip,Legend,Bar, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
// function createData(time, amount) {
//   return { time, amount };
// }

// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00', undefined),
// ];


const data = [
  {
    "name": "No",
    "count": 80,
  },
  {
    "name": "Sometimes",
    "count" : 47
  },
  {
    "name": "yes",
     "count": 23
  },
  
]
  
export default function Mens1() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
       
     <BarChart width={730} height={250} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="count" fill="#8884d8" />
  {/* <Bar dataKey="uv" fill="#ff70e5" /> */}
</BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
