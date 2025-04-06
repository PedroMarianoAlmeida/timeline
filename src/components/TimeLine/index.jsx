import { Event } from "./Event";
import { EventLine } from "./EventLine";
import { ChartContainer } from "./ChartContainer";

export const TimeLine = ({ timeline }) => {
  return (
    <ChartContainer timeTicks={timeline.time}>
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
    </ChartContainer>
  );
};
