import "./timeline.css";
import { Tooltip } from "../sharable/ToolTip";

export const Event = ({ event, totalDuration }) => {
  const { name, duration, isEvent, start, end } = event;
  const percentWidth = (duration / totalDuration) * 100;

  if (!isEvent)
    return <div style={{ width: `${percentWidth}%` }} className="gap-event" />;

  return (
    <Tooltip
      trigger={
        <div style={{ width: `${percentWidth}%` }} className="event">
          {name}
        </div>
      }
      content={
        <div className="event-tooltip-content">
          {name}
          <ul>
            <li>Start: {start}</li>
            <li>End: {end}</li>
          </ul>
        </div>
      }
    />
  );
};
