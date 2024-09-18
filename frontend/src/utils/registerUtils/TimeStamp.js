import React, { useEffect, useState } from "react";

const TimeStamp = () => {
  const [time, setTime] = useState();
  let count;
  useEffect(() => {
    count = 60;
    setInterval(() => {
      if (count > 0) {
        count = count - 1;
        setTime(count);
      }
    }, 1000);
  }, []);
  return <div>{time}</div>;
};

export default TimeStamp;
