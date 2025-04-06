import React from "react";
import { Tooltip } from "../sharable/ToolTip";
import "./timeline.css";

export const Axis = ({ timeline }) => {
  const ticks = timeline.time;
  const totalDuration = timeline.totalDuration;

  // Pre-compute marker positions using the cumulative durations.
  // For each tick, we calculate the left offset as the sum of the durations of all previous ticks.
  let cumulative = 0;
  const markerPositions = ticks.map((tick) => {
    const position = (cumulative / totalDuration) * 100;
    cumulative += tick.duration;
    return position;
  });

  const allEvents = timeline.lines.flat();

  return (
    <div className="axis">
      <div className="axis-line" />
      {ticks.map((tick, index) => {
        const tickTime = new Date(tick.start);
        const eventsAtMarker = allEvents.filter((event) => {
          if (!event.isEvent) return false;
          const eventStart = new Date(event.start);
          const eventEnd = new Date(event.end);
          return eventStart <= tickTime && eventEnd >= tickTime;
        });

        return (
          <Tooltip
            key={index}
            trigger={
              <div
                className="axis-marker"
                style={{ left: `${markerPositions[index]}%` }}
              />
            }
            content={
              <div className="event-tooltip-content">
                <div>
                  <strong>{tick.start}</strong>
                </div>
                {eventsAtMarker.length > 0 ? (
                  <ul>
                    {eventsAtMarker.map((event, idx) => (
                      <li key={idx}>{event.name}</li>
                    ))}
                  </ul>
                ) : (
                  <div>No events</div>
                )}
              </div>
            }
          />
        );
      })}
      {/* Optionally, add a final marker at 100% for the timeline end */}
      <Tooltip
        key="final"
        trigger={<div className="axis-marker" style={{ left: `100%` }} />}
        content={ticks[ticks.length - 1].end}
      />
    </div>
  );
};
