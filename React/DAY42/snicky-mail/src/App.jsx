import React from 'react';

// Function to return the current date and time
const getCurrentTime = () => {
  const currentTime = new Date();
  return `${currentTime.getHours()}:${currentTime.getMinutes()}`;
};

const SickDayEmail = ({ name }) => {
  const recipientName = "Salma";
  const recoveryTime = () => {
    return 24; 
  };

  return (
    <div>
      <p className="p1" id="recipient">Hi <strong>{recipientName}</strong>,</p>
      <p className="p2" id="sickness">I wanted to let you know as soon as possible that I will be staying home from work today.</p>
      <p className="p3" id="issue">Unfortunately, I developed a stomach bug that has made it very difficult to get work done.</p>
      <p className="p4" id="recovery">I went to urgent care last night and was told it should subside within {recoveryTime()} hours. I do not expect to be online throughout the day.</p>
      <p className="p5" id="plans">While I do plan to be back in the office tomorrow, I’ve asked Kelly to take over for me today in case any emergencies arise. I had an important call scheduled with a supplier, but Daniel has agreed to manage the meeting.</p>
      <p className="p6" id="additional-steps">Please let me know of any additional steps you’d like me to take to ensure the day runs as smoothly as possible in my absence.</p>
      <p className="p7" id="thanks">Thank you, <strong>{recipientName}</strong></p>
      <p className="p8" id="timestamp">Sent at: {getCurrentTime()}</p>
    </div>
  );
};

export default SickDayEmail;
