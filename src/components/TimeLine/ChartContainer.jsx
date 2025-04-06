import { Axis } from "./Axis";

export const ChartContainer = ({ children, timeline }) => {
  return (
    <div className="chart-container">
      <Axis timeline={timeline} />
      <div className="chart-container">{children}</div>
    </div>
  );
};
