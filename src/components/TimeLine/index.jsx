import { Event } from "./Event";
import { EventLine } from "./EventLine";

export const TimeLine = ({ timeline }) => {
  return (
    <div>
      {timeline.lines.map((line, index) => (
        <EventLine key={index}>
          {line.map((event) => (
            <Event
              event={event}
              key={`${index}-${event.name}`}
              totalDuration={timeline.totalDuration}
            />
          ))}
        </EventLine>
      ))}
    </div>
  );
};
