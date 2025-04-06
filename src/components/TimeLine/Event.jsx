export const Event = ({ event, totalDuration }) => {
  const { name, duration } = event;
  const percentWidth = (duration / totalDuration) * 100;

  return <p style={{ width: `${percentWidth}%` }}>{name}</p>;
};
