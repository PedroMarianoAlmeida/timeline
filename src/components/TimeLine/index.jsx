export const TimeLine = ({ timeline }) => {
  console.log({ timeline });

  return (
    <div>
      {timeline.lines.map((line, index) => {
        return (
          <div key={`line-${index}`}>
            {line.map((event) => {
              const { name } = event;
              return <p key={`${index}-${name}`}>{event.name}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
};
