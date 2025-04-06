export function createTimeline(timelineItems) {
  // First, sort the events by their start date.
  const sortedItems = timelineItems.sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

  // Build the lines using reduce.
  const result = sortedItems.reduce(
    (acc, curr) => {
      // Compute the event duration (in days)
      const startDate = new Date(curr.start);
      const endDate = new Date(curr.end);
      const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);

      // Create an event object with the required properties.
      const eventObj = {
        name: curr.name,
        start: curr.start,
        end: curr.end,
        duration,
      };

      // Try to place the event in an existing line without overlapping.
      let placed = false;
      for (let line of acc.lines) {
        // Compare the start of the current event with the end of the last event in the line.
        const lastEvent = line[line.length - 1];
        if (new Date(eventObj.start) > new Date(lastEvent.end)) {
          line.push(eventObj);
          placed = true;
          break;
        }
      }
      // If the event overlaps on all existing lines, create a new line.
      if (!placed) {
        acc.lines.push([eventObj]);
      }
      return acc;
    },
    { lines: [] }
  );

  // Create a set of all unique time marks (start and end dates)
  const timeMarksSet = new Set();
  timelineItems.forEach((item) => {
    timeMarksSet.add(item.start);
    timeMarksSet.add(item.end);
  });

  // Convert the set to an array and sort the time marks
  const timeMarks = Array.from(timeMarksSet).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  // Build the time segments array:
  // Each segment is defined by a start time mark, the next time mark as end, and the duration (in days) between them.
  const time = [];
  for (let i = 0; i < timeMarks.length - 1; i++) {
    const start = timeMarks[i];
    const end = timeMarks[i + 1];
    const duration = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
    time.push({ start, end, duration });
  }

  return { lines: result.lines, time };
}
