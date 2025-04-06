import { Axis } from "./Axis";

export const ChartContainer = ({ children, timeTicks }) => {

  return (
    <div className="chart-container">
      <Axis timeTicks={timeTicks} />
      <div className="chart-container">{children}</div>
    </div>
  );
};
