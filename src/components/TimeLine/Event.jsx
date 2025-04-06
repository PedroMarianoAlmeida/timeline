import React from "react";
import { Tooltip } from "../sharable/ToolTip";
import "./timeline.css";

export const Event = ({ event, timeline }) => {
  // Calculate timeline boundaries using the first and last ticks
  const timelineStart = new Date(timeline.time[0].start).getTime();
  const timelineEnd = new Date(
    timeline.time[timeline.time.length - 1].end
  ).getTime();
  const totalMs = timelineEnd - timelineStart;

  // Calculate event duration using actual dates
  const eventStartMs = new Date(event.start).getTime();
  const eventEndMs = new Date(event.end).getTime();
  const widthPercent = ((eventEndMs - eventStartMs) / totalMs) * 100;

  if (!event.isEvent) {
    return <div style={{ width: `${widthPercent}%` }} className="gap-event" />;
  }

  return (
    <Tooltip
      trigger={
        <div style={{ width: `${widthPercent}%` }} className="event">
          {event.name}
        </div>
      }
      content={
        <div className="event-tooltip-content">
          <div>
            <strong>{event.name}</strong>
          </div>
          <ul>
            <li>Start: {event.start}</li>
            <li>End: {event.end}</li>
          </ul>
        </div>
      }
    />
  );
};
