import React, { useContext, useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { UserContext } from "../providers/UserProvider";
import { db } from "../utils/firebase";
import { getMonth, startOfMonth, toDate } from "date-fns";
import { format } from "date-fns/esm";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them

const Bar = () => {
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
          periodLength: Math.abs(doc.data().periodLength || 5),
          cycleLength: doc.data().cycleLength ,
          month: format(startOfMonth(doc.data().endDate.toDate()), "MMM yy"),
          weight: 10,
          height: 20,
        };
        data.push(t);
      });
      // console.log(data);
      setData(data);
      setLoading(false);
    }
    run();
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div style={{ height: "400px" }}>
        <ResponsiveBar
          data={data}
          keys={["cycleLength", "periodLength"]}
          indexBy="month"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: "set3" }}
          // defs={[
          //     {
          //         id: 'cycleLength',
          //         type: 'pattern ',
          //         background: 'inherit',
          //         color:'#325ca8',
          //         size: 4,
          //         padding: 1,
          //         stagger: true
          //     },
          //     {
          //         id: 'periodLength',
          //         type: 'patternLines',
          //         background: 'inherit',
          //         color:'#ed4aea',
          //         rotation: -45,
          //         lineWidth: 6,
          //         spacing: 10
          //     }
          // ]}
          fill={
            [
              // {
              //     match: {
              //         id: 'cycleLength'
              //     },
              //     id: 'cycleLength'
              // },
              // {
              //     match: {
              //         id: 'periodLength'
              //     },
              //     id: 'periodLength'
              // }
            ]
          }
          borderRadius={4}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: -90,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: "days",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          enableGridY={false}
          labelSkipWidth={11}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          tooltip={function (x) {
            console.log(x.data);
            return (
              <>
                <div>cycle Length :{x.data.cycleLength}</div>
                <div>Period Length:{x.data.periodLength}</div>

                <h1>Weight:{x.data.weight}</h1>
              </>
            );
          }}
          animate={true}
          motionStiffness={290}
          motionDamping={15}
        />
      </div>
    );
  }
};
export default Bar;
