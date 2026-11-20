import { SHAPES } from "../../data/shapes.js";
import { twoChoice } from "../core.js";

function drawShape(name) {
  const pts = SHAPES[name];
  const midLat = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  const k = Math.cos(midLat * Math.PI / 180);
  const xs = pts.map(p => p[0] * k), ys = pts.map(p => -p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const w = maxX - minX, h = maxY - minY, pad = Math.max(w, h) * 0.06;
  const d = pts.map((p, i) => (i ? "L" : "M") + xs[i].toFixed(2) + " " + ys[i].toFixed(2)).join("") + "Z";
  return '<svg viewBox="' + (minX - pad) + " " + (minY - pad) + " " + (w + 2 * pad) + " " + (h + 2 * pad) +
    '" role="img" aria-label="Country shape"><path d="' + d + '" vector-effect="non-scaling-stroke"/></svg>';
}

export default {
  id: "shapes",
  label: "🗺️ Shapes",
  newRound() {
    const [a, w] = twoChoice(Object.keys(SHAPES));
    return {
      prompt: "Which country has this shape?",
      stage: drawShape(a),
      options: [a, w],
      answer: a
    };
  }
};
