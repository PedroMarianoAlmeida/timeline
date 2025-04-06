import React from "react";
import ReactDOM from "react-dom/client";
import timelineItems from "./timelineItems.js";

import { createTimeline } from "./utils/timeline.js";

function App() {
  console.log({ timelineItems, timeline: createTimeline(timelineItems) });
  return (
    <div>
      <h2>Good luck with your assignment! {"\u2728"}</h2>
      <h3>{timelineItems.length} timeline items to render</h3>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
