export function createTimeline(timelineItems) {
    // First, sort the events by their start date.
    const sortedItems = timelineItems.sort((a, b) => new Date(a.start) - new Date(b.start));
  
    // Reduce to create lines and compute overall timeline boundaries.
    const timeline = sortedItems.reduce((acc, curr) => {
      // Compute the duration for the current event (in days)
      const startDate = new Date(curr.start);
      const endDate = new Date(curr.end);
      const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);
  
      // Create the event object with the required properties.
      const eventObj = { name: curr.name, start: curr.start, end: curr.end, duration };
  
      // Try to place this event in an existing line where there's no overlap.
      let placed = false;
      for (let line of acc.lines) {
        const lastEvent = line[line.length - 1];
        // If the current event starts after the last event in the line ends, it can be placed here.
        if (new Date(eventObj.start) > new Date(lastEvent.end)) {
          line.push(eventObj);
          placed = true;
          break;
        }
      }
      // If no suitable line is found, create a new line.
      if (!placed) {
        acc.lines.push([eventObj]);
      }
  
      // Update overall timeline start and end boundaries.
      if (!acc.time.start || new Date(curr.start) < new Date(acc.time.start)) {
        acc.time.start = curr.start;
      }
      if (!acc.time.end || new Date(curr.end) > new Date(acc.time.end)) {
        acc.time.end = curr.end;
      }
  
      return acc;
    }, { lines: [], time: {} });
  
    // Calculate overall timeline duration in days.
    timeline.time.duration = (new Date(timeline.time.end) - new Date(timeline.time.start)) / (1000 * 60 * 60 * 24);
  
    return timeline;
  }
