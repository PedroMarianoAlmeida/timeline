import { Axis } from "./Axis";

export const ChartContainer = ({ children, timeTicks }) => {

  return (
    <div>
      <Axis timeTicks={timeTicks} />
      <div className="chart-container">{children}</div>
    </div>
  );
};
