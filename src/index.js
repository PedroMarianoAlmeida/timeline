import React from "react";
import ReactDOM from "react-dom/client";

import timelineItems from "./timelineItems.js";
import { TimeLine } from "./components/TimeLine";

import { createTimeline } from "./utils/timeline.js";

function App() {
  return (
    <div>
      <TimeLine timeline={createTimeline(timelineItems)} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
