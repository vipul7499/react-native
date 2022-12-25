import React,{ useContext, useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { BarChart,CartesianGrid,Tooltip,Legend,Bar, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { UserContext } from "../../providers/UserProvider";
import { db } from "../../utils/firebase";
import { getMonth, startOfMonth, toDate } from "date-fns";
import { format } from "date-fns/esm";

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


// const data = [
//   {
//     "name": "Page A",
//     "uv": 4000,
//     "pv": 2400
//   },
//   {
//     "name": "Page B",
//     "uv": 3000,
//     "pv": 1398
//   },
//   {
//     "name": "Page C",
//     "uv": 2000,
//     "pv": 9800
//   },
//   {
//     "name": "Page D",
//     "uv": 2780,
//     "pv": 3908
//   },
//   {
//     "name": "Page E",
//     "uv": 1890,
//     "pv": 4800
//   },
//   {
//     "name": "Page F",
//     "uv": 2390,
//     "pv": 3800
//   },
//   {
//     "name": "Page G",
//     "uv": 3490,
//     "pv": 4300
//   }
// ]
  
export default function Periods() {
  const theme = useTheme();
  const [user] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    async function run() {
      setLoading(true);
      const logRef = await db
        .collection("users")
        .doc(`${user.data.uid}`)
        .collection("log").orderBy('endDate')
        .get();
      let data = [];
      logRef.forEach((doc) => { // need to write a sort by 
        const t = {
          "period Length": Math.abs(doc.data().cycleLength || 5),
          "cycle Length": doc.data().cycleTotal ,
          "name": `${format(startOfMonth(doc.data().endDate.toDate()), "MMM yy")}`,
          // weight: 10,
          // height: 20,
        };
        data.push(t);
      });
      // console.log(data);
      setData(data);
      setLoading(false);
    }
    run();
  }, []);
  if(loading){
    return<h1>loading</h1>
  }
  else{

    return (
      <React.Fragment>
        <Title>Your periods so far</Title>
        <ResponsiveContainer>
          {/* <BarChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
              >
                Sales ($)
              </Label>
            </YAxis>
            <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
          </BarChart>
        */}
       <BarChart width={730} height={250} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    
          

    <Bar dataKey="cycle Length" fill="#8884d8" />
    <Bar dataKey="period Length" fill="#ff70e5" />
  </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }

  
}
