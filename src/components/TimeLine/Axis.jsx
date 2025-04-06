import React from "react";
import "./timeline.css";

export const Axis = ({ timeTicks }) => {
  // Use the first tick's start as the timeline start date
  const timelineStartDate = new Date(timeTicks[0].start);
  // Use the last tick's end as the timeline end date
  const timelineEndDate = new Date(timeTicks[timeTicks.length - 1].end);
  const totalDuration = timelineEndDate - timelineStartDate;

  // Computes left percentage for a given tick based on its start date
  const calculateLeftPercentage = (tick) => {
    const tickDate = new Date(tick.start);
    const diff = tickDate - timelineStartDate;
    return (diff / totalDuration) * 100;
  };

  return (
    <div className="axis">
      <div className="axis-line" />
      {timeTicks.map((tick, index) => (
        <div
          key={index}
          className="axis-marker"
          style={{ left: `${calculateLeftPercentage(tick)}%` }}
          title={`Start: ${tick.start} - End: ${tick.end}`}
        />
      ))}
    </div>
  );
};
