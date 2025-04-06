import { Event } from "./Event";

export const TimeLine = ({ timeline }) => {
  console.log({ timeline });

  return (
    <div>
      {timeline.lines.map((line, index) => {
        return (
          <div
            key={`line-${index}`}
            style={{ display: "flex", gap: "4px", width: "100%" }}
          >
            {line.map((event) => (
              <Event event={event} key={`${index}-${event.name}`} totalDuration={timeline.totalDuration}/>
            ))}
          </div>
        );
      })}
    </div>
  );
};
