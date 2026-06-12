/* ─── Shared lane placement ─────────────────────────────────────────── */

function placeLanes(items, getStart, getEnd) {
  const sorted = [...items].sort((a, b) => getStart(a) - getStart(b));
  const clusters = [];
  sorted.forEach((item) => {
    const last = clusters[clusters.length - 1];
    if (last && getStart(item) < last.endMax) {
      last.items.push(item);
      last.endMax = Math.max(last.endMax, getEnd(item));
    } else {
      clusters.push({ items: [item], endMax: getEnd(item) });
    }
  });
  const placed = [];
  clusters.forEach((cluster) => {
    const lanes = [];
    const assignments = [];
    cluster.items.forEach((item) => {
      let lane = -1;
      for (let i = 0; i < lanes.length; i++) {
        if (lanes[i] <= getStart(item)) {
          lane = i;
          break;
        }
      }
      if (lane === -1) {
        lane = lanes.length;
        lanes.push(0);
      }
      lanes[lane] = getEnd(item);
      assignments.push({ item, lane });
    });
    const tl = Math.max(1, lanes.length);
    assignments.forEach((a) =>
      placed.push({ item: a.item, lane: a.lane, totalLanes: tl }),
    );
  });
  return placed;
}

window.placeLanes = placeLanes;
