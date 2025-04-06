export function createTimeline(timelineItems) {
    // Helper function to add a number of days to a date.
    function addDays(date, days) {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    }
  
    // Helper function to format a Date as 'YYYY-MM-DD'
    function formatDate(date) {
      return date.toISOString().split("T")[0];
    }
  
    // First, sort the events by their start date.
    const sortedItems = timelineItems.sort(
      (a, b) => new Date(a.start) - new Date(b.start)
    );
  
    // Build the lines using reduce.
    const result = sortedItems.reduce(
      (acc, curr) => {
        // Compute the event duration (in days) and add 1 for the end-of-day.
        const startDate = new Date(curr.start);
        const endDate = new Date(curr.end);
        const duration = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
  
        // Create an event object with the required properties.
        const eventObj = {
          name: curr.name,
          start: curr.start,
          end: curr.end,
          duration,
          isEvent: true
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
  
    // Convert the set to an array and sort the time marks.
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
  
    // Calculate total duration: from the overall earliest start to overall latest end, plus one day.
    const overallStartStr = timeMarks[0];
    const overallEndStr = timeMarks[timeMarks.length - 1];
    const overallStart = new Date(overallStartStr);
    const overallEnd = new Date(overallEndStr);
    const totalDuration =
      (overallEnd - overallStart) / (1000 * 60 * 60 * 24) + 1;
  
    // Now, for each line, insert gap events so that gaps are rendered.
    // A gap event is inserted whenever there is a gap between the previous item's end and the next event's start.
    const filledLines = result.lines.map((line) => {
      const filledLine = [];
      // Pointer is the current date pointer, starting at the overall start.
      let pointer = overallStart;
      for (let event of line) {
        const eventStart = new Date(event.start);
        // If there's a gap before the event...
        if (eventStart > pointer) {
          // For gap events, the gap should start at the current pointer and end one day before the event starts.
          const gapStart = pointer;
          const gapEnd = addDays(eventStart, -1);
          // Only add a gap if the gapEnd is not before the gapStart.
          if (gapEnd >= gapStart) {
            const gapDuration =
              (gapEnd - gapStart) / (1000 * 60 * 60 * 24) + 1;
            filledLine.push({
              isEvent: false,
              name: "gap",
              start: formatDate(gapStart),
              end: formatDate(gapEnd),
              duration: gapDuration
            });
          }
        }
        // Add the actual event.
        filledLine.push(event);
        // Update pointer: set it to the day after the event's end.
        pointer = addDays(new Date(event.end), 1);
      }
      // After processing all events, if there's a gap until overallEnd, add a final gap event.
      if (pointer <= overallEnd) {
        const gapStart = pointer;
        const gapEnd = overallEnd;
        const gapDuration =
          (gapEnd - gapStart) / (1000 * 60 * 60 * 24) + 1;
        filledLine.push({
          isEvent: false,
          name: "gap",
          start: formatDate(gapStart),
          end: formatDate(gapEnd),
          duration: gapDuration
        });
      }
      return filledLine;
    });
  
    return { lines: filledLines, time, totalDuration };
  }
  