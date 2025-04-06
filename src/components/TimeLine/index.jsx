import { Event } from "./Event";
import { EventLine } from "./EventLine";
import { ChartContainer } from "./ChartContainer";

export const TimeLine = ({ timeline }) => {
  return (
    <ChartContainer timeline={timeline}>
      {timeline.lines.map((line, lineIndex) => (
        <EventLine key={lineIndex}>
          {line.map((event, eventIndex) => (
            <Event
              event={event}
              key={`${lineIndex}-${eventIndex}-${event.name}`}
              totalDuration={timeline.totalDuration}
            />
          ))}
        </EventLine>
      ))}
    </ChartContainer>
  );
};
