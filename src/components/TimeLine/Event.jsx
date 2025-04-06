import "./timeline.css";
import { Tooltip } from "../sharable/ToolTip";

export const Event = ({ event, totalDuration }) => {
  const { name, duration, isEvent } = event;
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
      content={name}
    />
  );
};
