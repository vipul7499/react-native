import React,{useEffect,useState,useContext} from "react";
import { useTheme } from "@material-ui/core/styles";
import {db} from '../../utils/firebase'
import {
  LineChart,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import {UserContext} from '../../providers/UserProvider'
import Title from "../dash/Title";

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
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

export default function Chart() {
  const [data,setData]=useState([])
  const[user,setUser]=useContext(UserContext)
  const theme = useTheme();
  useEffect(() => {  
    const fetchData=async ()=>{
      const doc=await db.collection("test").doc(`${user.data.uid}`).get()
      const arr=[];
      if(doc.exists){
      if(doc.data().dateUpdated){

        console.log(doc.data().dateUpdated)
        // const arr=[];
        doc.data().dateUpdated.forEach((elem,i)=>{
          const x={
            name:`${elem}`,
            loss:doc.data().loss[i]
          }
          arr.push(x);
        })
      }
    }
        setData(arr);
     
    }
    fetchData()
  }, [])

  return (
    <React.Fragment>
      <Title>Your Loss function</Title>
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
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="loss" stroke="#8884d8" />
          {/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
