import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ dispatchTime }) => {
  const [timer, setTimer] = useState("Waiting for dispatch");

  useEffect(() => {
    console.log("CountdownTimer useEffect triggered");
    console.log("Dispatch time in CountdownTimer:", dispatchTime);
    console.log("Dispatch time type:", typeof dispatchTime);

    if (!dispatchTime) {
      setTimer("Waiting for dispatch");
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const dispatchDate = new Date(dispatchTime).getTime();
      
      if (isNaN(dispatchDate)) {
        console.error("Invalid dispatch time:", dispatchTime);
        setTimer("Invalid dispatch time");
        clearInterval(interval);
        return;
      }

      const endTime = dispatchDate + 24 * 60 * 60 * 1000; 
      const timeLeft = endTime - now;

      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimer("Delivery time has passed");
      } else {
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setTimer(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatchTime]);

  return (
    <div>
      <span>{timer}</span>
    </div>
  );
};

export default CountdownTimer;