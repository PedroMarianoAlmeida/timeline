import "./timeline.css";
import { Tooltip } from "../sharable/ToolTip";

export const Event = ({ event, totalDuration }) => {
  const { name, duration } = event;
  const percentWidth = (duration / totalDuration) * 100;

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
