import React, { useEffect, useState, useContext } from "react";
import { DateRange } from "react-date-range";
import { UserContext } from "../../providers/UserProvider";
import {
  updateLogPeriod2,
  getUserLogDocument,
  updateCurrentUseDocument,
} from "../../utils/firebase";
import { addDays, startOfMonth, compareAsc, toDate } from "date-fns";

const ViewCalendar = () => {
  const [user] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const ax = await getUserLogDocument(user.data.uid);
      const s = await ax.get();
      const arr = [];
      let id = 0;
      const currDate = Date.now();
      s.forEach((doc) => {
        console.log(doc.data())
        if(doc.data().startDate)
        {
        let selection = {
          key: `selection${startOfMonth(doc.data().endDate.toDate())}`,
          num: id,
          startDate: doc.data().startDate.toDate(),
          endDate: doc.data().endDate.toDate(),
          showDateDisplay: false,
          disabled: true,
        };
        arr.push(selection);
      }
        id++;
      });
      // const selectionPredicted = {
      //   key: "selectionPredicted",
      //   startDate: user.data.predictedStartDate.toDate(),
      //   endDate: user.data.predictedEndDate.toDate(),
      //   color: "#ffcfcc",
      //   disabled: true,
      // };
      // arr.push(selectionPredicted);
      console.log(arr);
      setState(arr);

      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <>
      <DateRange
        rangeColors={["pink"]}
        moveRangeOnFirstSelection={false}
        showDateDisplay={true}
        ranges={state}
      />
    </>
  );
};

export default ViewCalendar;
