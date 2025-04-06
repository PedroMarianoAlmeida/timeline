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
            {line.map((event) => {
              const { name, duration } = event;
              const percentWidth = (duration / timeline.totalDuration) * 100;

              console.log({
                event,
                percentWidth,
                totalDuration: timeline.totalDuration,
              });
              return (
                <p
                  key={`${index}-${name}`}
                  style={{ width: `${percentWidth}%` }}
                >
                  {event.name}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
