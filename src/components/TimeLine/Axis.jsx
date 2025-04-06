import React from "react";
import { Tooltip } from "../sharable/ToolTip";
import "./timeline.css";

export const Axis = ({ timeline }) => {
  // Compute overall timeline boundaries from the first and last ticks
  const timelineStart = new Date(timeline.time[0].start).getTime();
  const timelineEnd = new Date(
    timeline.time[timeline.time.length - 1].end
  ).getTime();
  const totalMs = timelineEnd - timelineStart;

  // Flatten all events from all lines for tooltip details
  const allEvents = timeline.lines.flat();

  return (
    <div className="axis">
      <div className="axis-line" />
      {timeline.time.map((tick, index) => {
        const tickTimeMs = new Date(tick.start).getTime();
        // Calculate the left offset based on the timeline boundaries
        const offset = ((tickTimeMs - timelineStart) / totalMs) * 100;

        // Find events that are active at this tick time
        const eventsAtMarker = allEvents.filter((event) => {
          if (!event.isEvent) return false;
          const eventStartMs = new Date(event.start).getTime();
          const eventEndMs = new Date(event.end).getTime();
          return eventStartMs <= tickTimeMs && eventEndMs >= tickTimeMs;
        });

        return (
          <Tooltip
            key={index}
            trigger={
              <div className="axis-marker" style={{ left: `${offset}%` }} />
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
      {/* Final marker at 100% for the timeline end */}
      <Tooltip
        key="final"
        trigger={<div className="axis-marker" style={{ left: "100%" }} />}
        content={timeline.time[timeline.time.length - 1].end}
      />
    </div>
  );
};
